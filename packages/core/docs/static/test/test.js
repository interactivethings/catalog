// Test the baseline grid by pressing the "g" key when on the
// test page. It will toggle a class on the body and show
// a baseline grid.

if (!window.cgToggleBaselineGrid) {
  window.cgToggleBaselineGrid = function(evt) {
    if (evt.keyCode === 71) {
      // "g" key to toggle grid
      document.body.classList.toggle("va-debug");
    }
  };
}

document.body.removeEventListener("keydown", window.cgToggleBaselineGrid);
document.body.addEventListener("keydown", window.cgToggleBaselineGrid);
