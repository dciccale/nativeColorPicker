(function (window) {
  var document = window.document,
    nativeColorPicker = {
      // initialized flag
      started: false,
      
      // start color
      color: '#000000',
      
      // inputs where plugin was initialized
      inputs: {},
      
      // flag to know if color input is supported
      hasNativeColorSupport: false,
      
      // inits the plugin on specified input
      init: function (inputId) {
        // start the plugin
        this.start();

        if (this.hasNativeColorSupport) {
          return;
        }

        if (typeof inputId !== 'string') {
          throw 'inputId have to be a string id selector';
        }

        // set the input
        this.input = (this.inputs[inputId] = this.inputs[inputId]) || document.getElementById(inputId);
        
        if (!this.input) {
          throw 'There was no input found with id: "' + inputId + '"';
        }

        // input defaults
        this.input.value = this.color;
        this.input.unselectable = 'on';
        this.css(this.input, {
          backgroundColor: this.color,
          borderWidth: '0.4em 0.3em',
          width: '3em',
          cursor: 'default'
        });

        // register input event
        this.input.onfocus = function () {
          nativeColorPicker.onFocus(this.id);
        };
      },
      
      // initialize once
      start: function () {
        // is already started
        if (this.started) {
          return;
        }

        // test if browser has native support for color input
        try { this.hasNativeColorSupport = !!(document.createElement('input').type = 'color'); } catch (e) {};

        // no native support...
        if (!this.hasNativeColorSupport) {
          // create object element
          var object_element = document.createElement('object');
          object_element.classid = 'clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b';
          // set attributes
          object_element.id = 'colorHelperObj';
          this.css(object_element, {
            width: '0',
            height: '0'
          });
          document.body.appendChild(object_element);
        }
        // mark as started
        this.started = true;
      },
      
      // destroys the plugin
      destroy: function (inputId) {
        var i;
        // destroy one input or all the plugin if no input id
        if (typeof inputId === 'string') {
          this.off(this.inputs[inputId]);
        } else {
          // remove helper object
          document.body.removeChild(document.getElementById('colorHelperObj'));
          // remove input events and styles
          for (i in this.inputs) {
            this.off(this.inputs[i]);
          }
          // mark not started
          this.started = false;
        }
      },
      
      off: function (input) {
        input.onfocus = null;
        this.css(input, {
          backgroundColor: '',
          borderWidth: '',
          width: '',
          cursor: ''
        });
      },
      
      // input focus function
      onFocus: function (inputId) {
        this.input = this.inputs[inputId];
        this.color = this.getColor();
        this.input.value = this.color;
        nativeColorPicker.css(this.input, {
          backgroundColor: this.color,
          color: this.color
        });
        this.input.blur();
      },
      
      // gets the color from the object
      // and normalize it
      getColor: function () {
        // get decimal color, (passing the previous one)
        // and change to hex
        var hex = colorHelperObj.ChooseColorDlg(this.color.replace(/#/, '')).toString(16);

        // add extra zeroes if hex number is less than 6 digits
        if (hex.length < 6) {
          var tmpstr = '000000'.substring(0, 6 - hex.length);
          hex = tmpstr.concat(hex);
        }

        return '#' + hex;
      },
      
      // set css properties
      css: function (el, props) {
        for (var prop in props) {
          el.style[prop] = props[prop];
        }
      }
    };

  // expose to global
  window.nativeColorPicker = nativeColorPicker;
}(window));
