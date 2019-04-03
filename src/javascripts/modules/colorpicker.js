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
    this.particlesWrapper = document.getElementById('particles-js')
    this.gradientWrapper = document.getElementById('gradient')
    this.buttons = el.querySelectorAll('.inputs__input-wrapper--buttons .btn')

    this.reference_monitor.style.background = '#fff'

      this.textInput.addEventListener('input', () => {
        this.setReferenceFromTextInput(event)
      })

        'change mousedown mouseup keypress'.split(' ').forEach( (event) => {
          this.colorInput.addEventListener(event, () => {
            this.setReferenceFromColorInput()
          })
        })

      for (let i = 0; i < this.rangeInputs.length; i++) {
        this.rangeInputs[i].addEventListener('input', () => {
          this.setGrayscale()
        })
      }

      for (let i = 0; i < this.buttons.length; i++) {
        this.buttons[i].addEventListener('click', () => {
          this.toggleDisplay(event)
        })
      }
  }

  init() {
      let userHasPickedDisplay = false;
      for(let i = 0; i < this.buttons.length; i++) {
        if( this.buttons[i].classList.contains('active') ) {
            userHasPickedDisplay = true;
        }
      }
      if(!userHasPickedDisplay) {
          this.particlesWrapper.style.display = 'none'
          this.gradientWrapper.style.display = 'none'
      }

  }

  setGrayscale () {
    for (let i = 0; i < this.monitors.length; i++) {
      let divider = i + 1;
      let color = 'rgb(' + Math.floor(this.red.value / divider) + ',' + Math.floor(this.green.value / divider )+ ',' + Math.floor(this.blue.value / divider) + ')'
      this.monitors[i].style.background = color
      this.monitors[i].children[0].textContent = color
    }
    this.init()
    this.setMonitorTextColor()
    this.particles()
    this.gradient()
  }

  setReferenceFromTextInput() {
    this.reference_monitor.style.background = this.textInput.value
    this.colorInput.value = 0
    this.setMonitorTextColor()
    this.particles('text_input')
    this.gradient()
  }

  setReferenceFromColorInput() {
    this.reference_monitor.style.background = '#' + this.colorInput.value
    this.textInput.value = 0
    this.setMonitorTextColor()
    this.particles('color_input')
    this.gradient()
  }

  setMonitorTextColor() {
    for (let i = 0; i < this.monitors.length; i++) {
      let referenceColor = this.reference_monitor.style.background
      this.monitors[i].style.color = referenceColor
      this.monitors[i].children[1].style.background = referenceColor
    }
  }

  toggleDisplay(event) {
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].classList.remove('active')
    }
    event.target.classList.add('active')

    let activeDisplay
    if(event.target.classList.contains('btn--block') ) { activeDisplay = 'block' }
    if(event.target.classList.contains('btn--particles') ) { activeDisplay = 'particles' }
    if(event.target.classList.contains('btn--gradient') ) { activeDisplay = 'gradient' }
    console.log(activeDisplay)
    if(activeDisplay == 'particles') {
      this.gradientWrapper.style.display = 'none'
      this.particlesWrapper.style.display = 'block'
    } else if(activeDisplay == 'gradient') {
      this.particlesWrapper.style.display = 'none'
      this.gradientWrapper.style.display = 'block'
    } else {
      this.particlesWrapper.style.display = 'none'
      this.gradientWrapper.style.display = 'none'
    }

  }

  gradient() {
    let color = this.reference_monitor.style.background
    // let reference = this.reference_monitor.style.background
    let gray = this.rgb2hex(Math.floor(this.red.value), Math.floor(this.green.value), Math.floor(this.blue.value))
    this.gradientWrapper.style.backgroundImage =  'linear-gradient(to right, '+color+',' +gray+')'
  }

  rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }

  particles(reference) {
    // reference == 'color_input' ? this.particlesWrapper.style.backgroundColor = ``this.colorInput.value : this.textInput.value ;
    let color = this.reference_monitor.style.background
    this.particlesWrapper.style.backgroundColor = color
    let gray1 = this.rgb2hex(Math.floor(this.red.value), Math.floor(this.green.value), Math.floor(this.blue.value))
    let gray2 = this.rgb2hex(Math.floor(this.red.value / 2), Math.floor(this.green.value / 2), Math.floor(this.blue.value / 2))
    let gray3 = this.rgb2hex(Math.floor(this.red.value / 3), Math.floor(this.green.value / 3), Math.floor(this.blue.value / 3))

    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 52,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": [
            gray1,
            gray2,
            gray3]
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1.0,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 94.69771699587272,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
}
