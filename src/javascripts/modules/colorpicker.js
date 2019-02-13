export default class ColorPicker {
  constructor(el) {
    this.el = el
    this.rangeInputs = el.querySelectorAll('input[type=range]')
    this.monitors = el.querySelectorAll('.monitors__cube')
    this.colorInput = document.getElementById('reference')
    this.textInput = document.getElementById('text-reference')
    this.red = document.getElementById('red')
    this.green = document.getElementById('green')
    this.blue = document.getElementById('blue')
    this.reference_monitor = document.getElementById('reference_monitor')


      this.textInput.addEventListener('input', () => {
        this.setReferenceFromTextInput(event)
      })

        this.colorInput.addEventListener('change', () => {
          this.setReferenceFromColorInput(event)
        })

      for (let i = 0; i < this.rangeInputs.length; i++) {
        this.rangeInputs[i].addEventListener('input', () => {
          this.setGrayscale(event)
        })
      }
  }

  setGrayscale (event) {

    for (let i = 0; i < this.monitors.length; i++) {
      let divider = i + 1;
      let color = 'rgb(' + Math.floor(this.red.value / divider) + ',' + Math.floor(this.green.value / divider )+ ',' + Math.floor(this.blue.value / divider) + ')'
      this.monitors[i].style.background = color
      this.monitors[i].textContent = color
    }

    this.setMonitorTextColor()
  }

  setReferenceFromTextInput() {
    this.reference_monitor.style.background = this.textInput.value
    this.colorInput.value = 0
    this.setMonitorTextColor()
  }

  setReferenceFromColorInput() {
    this.reference_monitor.style.background = '#' + this.colorInput.value
    this.textInput.value = 0
    this.setMonitorTextColor()
  }

  setMonitorTextColor() {
    for (let i = 0; i < this.monitors.length; i++) {
      let referenceColor = this.reference_monitor.style.background
      this.monitors[i].style.color = referenceColor
    }
  }
}
