import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import numeral from 'numeral';
var STATE = require("../_state");

@customElement("au-numeric")
export class Numeric {
  // input properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;

  // numeric properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) step;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  // input = null;
<<<<<<< HEAD
  @bindable editorValue;
=======
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181

  @computedFrom("min", "max")
  get inputOptions() {
    return {
      "min": this.min,
      "max": this.max,
      "class": "form-control text-right"
    }
  }

  bind() {
<<<<<<< HEAD
    // this.value = this.value || 0;
    this.value = this.placeholder ? "" :  this.value || 0;
    this.format = this.format || "0,000.00";
  }

=======
    this.value = this.value || 0;
    this.editorValue = this.value || 0;
    this.format = this.format || "0,000.00";

  }
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181
  attached() {
    if (this.input && this.input.element) {
      this.input.element.addEventListener("keydown", this.keydownCallback, false);
    }
  }

  keydownCallback(e) {
    var keyCode = e.keyCode;

    // Allow: backspace, delete, tab, escape, enter and .
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) !== -1 ||
      // Allow: Ctrl/cmd+A
      (keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+C
      (keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+X
      (keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)) {
      // let it happen, don't do anything 
      return;
    }

    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
      e.preventDefault();
    }
  }
<<<<<<< HEAD
=======

  stateChangeCallback(event) {
    // console.log(this.input.element)
    var context = event.detail;
    context.editorValue = context.editorState === STATE.VIEW ? numeral(context.editorValue).format(this.format) : numeral(context.editorValue).value(this.format);
    context.value = numeral(context.editorValue).value(this.format);

  }
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181
} 
