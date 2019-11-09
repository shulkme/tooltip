# tooltip
> A jQuery plugin for tooltips

### preview
1. dark theme (default)

![demo preview](https://github.com/shulkme/tooltip/blob/master/theme-dark.png)

2. light theme

![demo preview](https://github.com/shulkme/tooltip/blob/master/theme-light.png)

### Example:

```html
<button data-tooltip="tooltips">tooltip</button>
```
```javascript
$('[data-tooltip]').tooltip({
  //options...All optional
  trigger   : 'hover', //Trigger mode：'hover','click','focus'
  autoPlace : true,    //Automatic placement to avoid out of view
  delay     : 10,      //Show hidden delay
  placement : 'top',   //Placement preference：'top','topLeft','topRight','right','rightTop','rightBottom','bottom','bottomLeft','bottomRight','left','leftTop','leftBottom'
  theme   : 'dark'     //Theme style
});
```
