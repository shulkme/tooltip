/**
 * tooltip
 * shulkme
 * v1.0.1
 * 2019-10-25
 * https://github.com/shulkme/tooltip
 */

;(function() {
    'use strict';
    var Tooltips = window.Tooltips || {};
    Tooltips = function (options){
        this.defaults = {
            contentKey :'data-tooltip',
            posKey : 'data-tooltip-pos',
            themeKey: 'data-tooltip-theme',
            gutter: 2
        };
        this.posMap = [
            'tl','tc','tr',
            'rt','rc','rb',
            'bl','bc','br',
            'lt','lc','lb'
        ];
        this.opts = $.extend({}, this.defaults, options);
        this.triggerNode = $('['+this.opts.contentKey+']');
        this.init();
    };
    Tooltips.prototype = {
        constructor : Tooltips,
        init : function () {
            var _this = this;
            _this.bindEvents();
        },
        bindEvents : function(){
            var _this = this;
            _this.triggerNode.on({
                'mouseenter' : function () {
                    _this.render(this);
                },
                'mouseleave' : function () {
                    _this.destroy();
                }
            });
        },
        setPosition : function(tid,obj,pos){
            var _this = this;
            var _ele = $(obj);
            var _tooltip = $('#'+tid);
            var _gutter = _this.opts.gutter;
            var _eleSize = {
                w : $(_ele).outerWidth(true),
                h : $(_ele).outerHeight(true)
            };
            var _elePos = {
                x : $(_ele).offset().left,
                y : $(_ele).offset().top
            };
            var _tooltipSize = {
                w : _tooltip.outerWidth(true),
                h : _tooltip.outerHeight(true)
            };
            var _tooltipPos = {
                top    : 'auto',
                right  : 'auto',
                bottom : 'auto',
                left   : 'auto'
            };
            var _posMap = pos.split("");
            switch (_posMap[0]) {
                case "t":
                    _tooltipPos.top = _elePos.y - _tooltipSize.h - _gutter + 'px';
                    break;
                case "r":
                    _tooltipPos.left = _elePos.x + _eleSize.w + _gutter + 'px';
                    break;
                case "b":
                    _tooltipPos.top = _elePos.y + _eleSize.h + _gutter + 'px';
                    break;
                case "l":
                    _tooltipPos.left = _elePos.x - _tooltipSize.w - _gutter + 'px';
                    break;
            }
            switch (_posMap[1]) {
                case "t":
                    _tooltipPos.top = _elePos.y + 'px';
                    break;
                case "r":
                    _tooltipPos.left = _elePos.x + _eleSize.w - _tooltipSize.w + 'px';
                    break;
                case "b":
                    _tooltipPos.top = _elePos.y + _eleSize.h - _tooltipSize.h + 'px';
                    break;
                case "l":
                    _tooltipPos.left =  _elePos.x + 'px';
                    break;
                case "c":
                    if (_posMap[0]==="t" || _posMap[0]==="b") {
                        _tooltipPos.left = _elePos.x + ( _eleSize.w - _tooltipSize.w ) / 2 + 'px';
                    }else if (_posMap[0]==="l" || _posMap[0]==="r"){
                        _tooltipPos.top = _elePos.y + ( _eleSize.h - _tooltipSize.h ) /2 + 'px';
                    }
                    break;
            }
            _tooltip.css({
                top:_tooltipPos.top,
                right:_tooltipPos.right,
                bottom:_tooltipPos.bottom,
                left:_tooltipPos.left
            })
        },
        render : function (obj) {
            var _this = this;
            var _tid = 'tooltip-' + (new Date()).getTime();
            var _themeClass = '';
            var _pos = $(obj).attr(_this.opts.posKey);
            var _theme = $(obj).attr(_this.opts.themeKey);
            var _content = $(obj).attr(_this.opts.contentKey);
            var _flag = false;
            if ($.trim(_pos) === undefined || $.trim(_pos)==='') {
                _pos = 'tc';
            }else {
                for (var i=0,len = _this.posMap.length;i<len;i++){
                    if (_this.posMap[i] === _pos){
                        _flag = true;
                        break;
                    }
                }
            }
            if (!_flag){
                _pos = 'tc';
            }
            var _posClass = ' tooltip-' + _pos;
            if ($.trim(_theme)!==undefined && $.trim(_theme)!=='') {
                _themeClass = ' tooltip-'+_theme;
            }
            var _html = '';
                _html += '<div class="tooltip-wrapper" id="'+_tid+'">'+
                            '<div class="tooltip' + _posClass + _themeClass +'">'+
                                '<div class="tooltip-content">'+_content+'</div>'+
                                '<div class="tooltip-arrow"></div>'+
                            '</div>'+
                         '</div>';
            if ($('.tooltip-wrapper').length>0){
                _this.destroy();
            }
            $('body').append(_html);
            _this.setPosition(_tid,obj,_pos);
        },
        destroy : function () {
            $('.tooltip-wrapper').remove();
        }
    };
    new Tooltips();
})();