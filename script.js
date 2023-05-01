const div = document.createElement('div');
div.className = 'centered';

const title = document.createElement('h1');
title.innerText = 'Virtual keyboard';

const textarea = document.createElement('textarea');
textarea.className = 'textarea';

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

const description = document.createElement('p');
description.innerText = 'Made in OS Windows. Hotkey to switch language: ctrl + alt';

document.body.appendChild(div);
div.appendChild(title);
div.appendChild(textarea);
div.appendChild(keyboard);
div.appendChild(description);

const keys = {
  elements: {
    main: keyboard,
    keyContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
  },

  init() {
    this.elements.keyContainer = document.createElement('div');
    this.elements.keyContainer.classList.add('keyboard__rows');

    this.elements.main.appendChild(this.elements.keyContainer);
    this.elements.keyContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '↑', 'RShift',
      'Ctrl', 'Win', 'Alt', 'Space', 'RAlt', 'RCtrl', '←', '↓', '→',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const lineBreak = ['Backspace', '\\', 'Enter', 'RShift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'Tab':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'Tab');
          keyElement.innerText = 'Tab';
          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            textarea.value = this.properties.value;
          });
          break;

        case 'Caps Lock':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.setAttribute('code', 'CapsLock');
          keyElement.innerText = 'Caps Lock';
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'CapsLock')) {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            }
          });
          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.setAttribute('code', 'ShiftLeft');
          keyElement.innerText = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            keyElement.classList.toggle(this.properties.shift);
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            keyElement.classList.toggle(this.properties.shift);
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ShiftLeft')) {
              this.toggleShift();
              keyElement.classList.toggle(this.properties.shift);
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ShiftLeft')) {
              this.toggleShift();
              keyElement.classList.toggle(this.properties.shift);
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;
        case 'RShift':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ShiftRight');
          keyElement.innerText = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            keyElement.classList.toggle(this.properties.shift);
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            keyElement.classList.toggle(this.properties.shift);
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ShiftRight')) {
              this.toggleShift();
              keyElement.classList.toggle(this.properties.shift);
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ShiftRight')) {
              this.toggleShift();
              keyElement.classList.toggle(this.properties.shift);
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;

        case 'Ctrl':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.setAttribute('code', 'ControlLeft');
          keyElement.innerText = 'Ctrl';
          break;
        case 'RCtrl':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ControlRight');
          keyElement.innerText = 'Ctrl';
          break;

        case 'Alt':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'AltLeft');
          keyElement.innerText = 'Alt';
          break;
        case 'RAlt':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'AltRight');
          keyElement.innerText = 'Alt';
          break;

        case 'Win':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'MetaLeft');
          keyElement.innerText = 'Win';
          break;

        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.setAttribute('code', 'Backspace');
          keyElement.innerText = 'Backspace';
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            textarea.value = this.properties.value;
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'Backspace')) {
              this.properties.value = this.properties.value
                .substring(0, this.properties.value.length - 1);
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'Backspace')) {
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.setAttribute('code', 'Enter');
          keyElement.innerText = 'Enter';
          keyElement.addEventListener('click', () => {
            this.properties.value += `${'\n'}`;
          });
          break;

        case 'Space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.setAttribute('code', 'Space');
          keyElement.innerText = 'Space';
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            textarea.value = this.properties.value;
          });
          break;

        case '↑':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ArrowUp');
          keyElement.innerText = '↑';
          keyElement.addEventListener('click', () => {
            this.properties.value += '↑';
            textarea.value = this.properties.value;
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowUp')) {
              this.properties.value += '↑';
              textarea.value = this.properties.value;
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowUp')) {
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;
        case '←':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ArrowLeft');
          keyElement.innerText = '←';
          keyElement.addEventListener('click', () => {
            this.properties.value += '←';
            textarea.value = this.properties.value;
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowLeft')) {
              this.properties.value += '←';
              textarea.value = this.properties.value;
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowLeft')) {
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;
        case '↓':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ArrowDown');
          keyElement.innerText = '↓';
          keyElement.addEventListener('click', () => {
            this.properties.value += '↓';
            textarea.value = this.properties.value;
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowDown')) {
              this.properties.value += '↓';
              textarea.value = this.properties.value;
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowDown')) {
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;
        case '→':
          keyElement.classList.add('keyboard__key--dark');
          keyElement.setAttribute('code', 'ArrowRight');
          keyElement.innerText = '→';
          keyElement.addEventListener('click', () => {
            this.properties.value += '→';
            textarea.value = this.properties.value;
          });
          window.addEventListener('keydown', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowRight')) {
              this.properties.value += '→';
              textarea.value = this.properties.value;
              keyElement.classList.remove('keyboard__key--active');
            }
          });
          window.addEventListener('keyup', (e) => {
            if (e.code === keyElement.getAttribute('code', 'ArrowRight')) {
              keyElement.classList.add('keyboard__key--active');
            }
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.setAttribute('key', `${key}`);
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase() : key.toLowerCase();
            textarea.value = this.properties.value;
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (lineBreak) {
        fragment.appendChild(document.createElement('br'));
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === keyElement.getAttribute('key', `${key}`)) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'Tab')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'ControlLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'ControlRight')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'AltLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'AtlRight')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'MetaLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'Enter')) {
          keyElement.classList.toggle('keyboard__key--active');
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.key === keyElement.getAttribute('key', `${key}`)) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'Tab')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'ControlLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'ControlRight')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'AltLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'AtlRight')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'MetaLeft')) {
          keyElement.classList.toggle('keyboard__key--active');
        } else if (e.code === keyElement.getAttribute('code', 'Enter')) {
          keyElement.classList.toggle('keyboard__key--active');
        }
      });
    });

    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.classList.contains('keyboard__key--dark')
      || key.classList.contains('keyboard__key--extra-wide')) {
        key.textContent.toLowerCase();
      } else {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (let key of this.elements.keys) {
      if (key = this.elements.keys[0]) {
        key.textContent = this.properties.shift ? key.textContent = '~' : key.textContent = '`';
      } if (key = this.elements.keys[1]) {
        key.textContent = this.properties.shift ? key.textContent = '!' : key.textContent = '1';
      } if (key = this.elements.keys[2]) {
        key.textContent = this.properties.shift ? key.textContent = '@' : key.textContent = '2';
      } if (key = this.elements.keys[3]) {
        key.textContent = this.properties.shift ? key.textContent = '#' : key.textContent = '3';
      } if (key = this.elements.keys[4]) {
        key.textContent = this.properties.shift ? key.textContent = '$' : key.textContent = '4';
      } if (key = this.elements.keys[5]) {
        key.textContent = this.properties.shift ? key.textContent = '%' : key.textContent = '5';
      } if (key = this.elements.keys[6]) {
        key.textContent = this.properties.shift ? key.textContent = '^' : key.textContent = '6';
      } if (key = this.elements.keys[7]) {
        key.textContent = this.properties.shift ? key.textContent = '&' : key.textContent = '7';
      } if (key = this.elements.keys[8]) {
        key.textContent = this.properties.shift ? key.textContent = '*' : key.textContent = '8';
      } if (key = this.elements.keys[9]) {
        key.textContent = this.properties.shift ? key.textContent = '(' : key.textContent = '9';
      } if (key = this.elements.keys[10]) {
        key.textContent = this.properties.shift ? key.textContent = ')' : key.textContent = '0';
      } if (key = this.elements.keys[11]) {
        key.textContent = this.properties.shift ? key.textContent = '_' : key.textContent = '-';
      } if (key = this.elements.keys[12]) {
        key.textContent = this.properties.shift ? key.textContent = '+' : key.textContent = '=';
      } if (key = this.elements.keys[25]) {
        key.textContent = this.properties.shift ? key.textContent = '{' : key.textContent = '[';
      } if (key = this.elements.keys[26]) {
        key.textContent = this.properties.shift ? key.textContent = '}' : key.textContent = ']';
      } if (key = this.elements.keys[27]) {
        key.textContent = this.properties.shift ? key.textContent = '|' : key.textContent = '\\';
      } if (key = this.elements.keys[38]) {
        key.textContent = this.properties.shift ? key.textContent = ':' : key.textContent = ';';
      } if (key = this.elements.keys[39]) {
        key.textContent = this.properties.shift ? key.textContent = '"' : key.textContent = '\'';
      } if (key = this.elements.keys[49]) {
        key.textContent = this.properties.shift ? key.textContent = '<' : key.textContent = ',';
      } if (key = this.elements.keys[50]) {
        key.textContent = this.properties.shift ? key.textContent = '>' : key.textContent = '.';
      } if (key = this.elements.keys[51]) {
        key.textContent = this.properties.shift ? key.textContent = '/' : key.textContent = '?';
      }
    }
    for (const key of this.elements.keys) {
      if (key.classList.contains('keyboard__key--dark') || key.classList.contains('keyboard__key--extra-wide')) {
        key.textContent.toLowerCase();
      } else {
        key.textContent = this.properties.shift
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },
};

keys.init();
