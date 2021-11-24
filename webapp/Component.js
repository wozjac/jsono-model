sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device"], function (UIComponent, sap_ui_Device) {
  const support = sap_ui_Device["support"];
  /**
   * @namespace jwozniczak.io.jsonomodel
   */

  const Component = UIComponent.extend("jwozniczak.io.jsonomodel.Component", {
    metadata: {
      manifest: "json"
    },
    init: function _init() {
      // call the base component's init function
      UIComponent.prototype.init.call(this);
    },
    getContentDensityClass: function _getContentDensityClass() {
      if (this.contentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this.contentDensityClass = "";
        } else if (!support.touch) {
          // apply "compact" mode if touch is not supported
          this.contentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this.contentDensityClass = "sapUiSizeCozy";
        }
      }

      return this.contentDensityClass;
    }
  });
  return Component;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21wb25lbnQudHMiXSwibmFtZXMiOlsic3VwcG9ydCIsIkNvbXBvbmVudCIsIlVJQ29tcG9uZW50IiwibWV0YWRhdGEiLCJtYW5pZmVzdCIsImluaXQiLCJnZXRDb250ZW50RGVuc2l0eUNsYXNzIiwiY29udGVudERlbnNpdHlDbGFzcyIsInVuZGVmaW5lZCIsImRvY3VtZW50IiwiYm9keSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwidG91Y2giXSwibWFwcGluZ3MiOiI7UUFDU0EsTztBQUdUO0FBQ0E7QUFDQTs7UUFDcUJDLFMsR0FBa0JDLFc7QUFFeEJDLElBQUFBLFEsRUFBVztBQUN4QkMsTUFBQUEsUUFBUSxFQUFFO0FBRGMsSztBQU1sQkMsSUFBQUEsSSxtQkFBYztBQUNwQjtBQUNBO0FBQ0EsSztBQVNNQyxJQUFBQSxzQixxQ0FBa0M7QUFDeEMsVUFBSSxLQUFLQyxtQkFBTCxLQUE2QkMsU0FBakMsRUFBNEM7QUFDM0M7QUFDQSxZQUFJQyxRQUFRLENBQUNDLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsUUFBeEIsQ0FBaUMsZUFBakMsS0FBcURILFFBQVEsQ0FBQ0MsSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxRQUF4QixDQUFpQyxrQkFBakMsQ0FBekQsRUFBK0c7QUFDOUcsZUFBS0wsbUJBQUwsR0FBMkIsRUFBM0I7QUFDQSxTQUZELE1BRU8sSUFBSSxDQUFDUCxPQUFPLENBQUNhLEtBQWIsRUFBb0I7QUFBRTtBQUM1QixlQUFLTixtQkFBTCxHQUEyQixrQkFBM0I7QUFDQSxTQUZNLE1BRUE7QUFDTjtBQUNBLGVBQUtBLG1CQUFMLEdBQTJCLGVBQTNCO0FBQ0E7QUFDRDs7QUFDRCxhQUFPLEtBQUtBLG1CQUFaO0FBQ0E7O1NBakNtQk4sUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwic2FwL3VpL2NvcmUvVUlDb21wb25lbnRcIjtcbmltcG9ydCB7IHN1cHBvcnQgfSBmcm9tIFwic2FwL3VpL0RldmljZVwiO1xuXG5cbi8qKlxuICogQG5hbWVzcGFjZSBqd296bmljemFrLmlvLmpzb25vbW9kZWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgVUlDb21wb25lbnQge1xuXG5cdHB1YmxpYyBzdGF0aWMgbWV0YWRhdGEgPSB7XG5cdFx0bWFuaWZlc3Q6IFwianNvblwiXG5cdH07XG5cblx0cHJpdmF0ZSBjb250ZW50RGVuc2l0eUNsYXNzIDogc3RyaW5nO1xuXG5cdHB1YmxpYyBpbml0KCkgOiB2b2lkIHtcblx0XHQvLyBjYWxsIHRoZSBiYXNlIGNvbXBvbmVudCdzIGluaXQgZnVuY3Rpb25cblx0XHRzdXBlci5pbml0KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgc2FwVWlTaXplQ29tcGFjdCBvciBzYXBVaVNpemVDb3p5XG5cdCAqIGRlc2lnbiBtb2RlIGNsYXNzIHNob3VsZCBiZSBzZXQsIHdoaWNoIGluZmx1ZW5jZXMgdGhlIHNpemUgYXBwZWFyYW5jZSBvZiBzb21lIGNvbnRyb2xzLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gY3NzIGNsYXNzLCBlaXRoZXIgJ3NhcFVpU2l6ZUNvbXBhY3QnIG9yICdzYXBVaVNpemVDb3p5JyAtIG9yIGFuIGVtcHR5IHN0cmluZyBpZiBubyBjc3MgY2xhc3Mgc2hvdWxkIGJlIHNldFxuXHQgKi9cblx0cHVibGljIGdldENvbnRlbnREZW5zaXR5Q2xhc3MoKSA6IHN0cmluZyB7XG5cdFx0aWYgKHRoaXMuY29udGVudERlbnNpdHlDbGFzcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBjaGVjayB3aGV0aGVyIEZMUCBoYXMgYWxyZWFkeSBzZXQgdGhlIGNvbnRlbnQgZGVuc2l0eSBjbGFzczsgZG8gbm90aGluZyBpbiB0aGlzIGNhc2Vcblx0XHRcdGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcInNhcFVpU2l6ZUNvenlcIikgfHwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXBVaVNpemVDb21wYWN0XCIpKSB7XG5cdFx0XHRcdHRoaXMuY29udGVudERlbnNpdHlDbGFzcyA9IFwiXCI7XG5cdFx0XHR9IGVsc2UgaWYgKCFzdXBwb3J0LnRvdWNoKSB7IC8vIGFwcGx5IFwiY29tcGFjdFwiIG1vZGUgaWYgdG91Y2ggaXMgbm90IHN1cHBvcnRlZFxuXHRcdFx0XHR0aGlzLmNvbnRlbnREZW5zaXR5Q2xhc3MgPSBcInNhcFVpU2l6ZUNvbXBhY3RcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFwiY296eVwiIGluIGNhc2Ugb2YgdG91Y2ggc3VwcG9ydDsgZGVmYXVsdCBmb3IgbW9zdCBzYXAubSBjb250cm9scywgYnV0IG5lZWRlZCBmb3IgZGVza3RvcC1maXJzdCBjb250cm9scyBsaWtlIHNhcC51aS50YWJsZS5UYWJsZVxuXHRcdFx0XHR0aGlzLmNvbnRlbnREZW5zaXR5Q2xhc3MgPSBcInNhcFVpU2l6ZUNvenlcIjtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29udGVudERlbnNpdHlDbGFzcztcblx0fVxuXG59XG4iXX0=