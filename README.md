# nativeColorPicker
A Native Color Picker Polyfill for the HTML5's "color" input type on *Internet Explorer*

## Browser support
IE6+

## Demo
### See [demo.html](https://github.com/dciccale/nativeColorPicker/blob/master/demo.html) - [online](http://dciccale.github.com/nativeColorPicker)

## Usage
(just showing the minimum code needed)
```html
  <!-- include the plugin -->
  <script src="nativeColorPicker.js"></script>

  <input id="color" type="color" />

  <script>
    // init the plugin using the input id
    window.nativeColorPicker.init('color');
  </script>
```

### How?
See <a href="http://msdn.microsoft.com/en-us/library/ie/ms536349(v=vs.85).aspx">ChooseColorDlg method in MSDN</a>

## Screenshots

### Internet Explorer
![nativeColorPicker Internet Explorer](http://dciccale.github.com/nativeColorPicker/nativeColorPicker_ie.jpg)

### Google Chrome (just using HTML5 `<input type="color">` no js here)
![nativeColorPicker Google Chrome](http://dciccale.github.com/nativeColorPicker/nativeColorPicker_chrome.jpg)

## License
See [LICENSE.txt](https://raw.github.com/dciccale/nativeColorPicker/master/LICENSE.txt)
