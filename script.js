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
        keys: []
    },

    properties: {
        value: '',
        capsLock: false
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
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "↑", "LShift",
            "Ctrl", "Win", "Alt", "Space", "LAlt", "LCtrl", "←", "↓", "→",
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const lineBreak = ["Backspace", "\\", "Enter", "LShift"].indexOf(key) !== -1;

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch(key) {
                case 'Tab':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Tab';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '  ';
                        textarea.value = this.properties.value;
                    })
                    break;

                case 'Caps Lock':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerText = 'Caps Lock';
                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    })
                    break;

                case 'Shift':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerText = 'Shift';
                    keyElement.addEventListener('mousedown', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle(this.properties.capsLock);
                    });
                    keyElement.addEventListener('mouseup', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle(this.properties.capsLock);
                    })
                    break;
                case 'LShift':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Shift';
                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle(this.properties.capsLock);
                    })
                    break;

                case 'Ctrl':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerText = 'Ctrl';
                    break;
                case 'LCtrl':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Ctrl';
                    break;

                case 'Alt':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Alt';
                    break;
                case 'LAlt':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Alt';
                    break;

                case 'Win':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = 'Win';
                    break;

                case 'Backspace':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerText = 'Backspace';
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        textarea.value = this.properties.value;
                    })
                    break;

                case 'Enter':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerText = 'Enter';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '/n';
                    })
                    break;

                case 'Space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerText = 'Space';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        textarea.value = this.properties.value;
                    })
                    break;

                case '↑':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = '↑';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↑';
                        textarea.value = this.properties.value;
                    })
                    break;
                case '←':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = '←';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '←';
                        textarea.value = this.properties.value;
                    })
                    break;
                case '↓':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = '↓';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↓';
                        textarea.value = this.properties.value;
                    })
                    break;
                case '→':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerText = '→';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '→';
                        textarea.value = this.properties.value;
                    })
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        textarea.value = this.properties.value;
                    })
                    break;
            }

            fragment.appendChild(keyElement);

            if(lineBreak){
                fragment.appendChild(document.createElement('br'));
            };
        })

        return fragment;
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if(key.classList.contains('keyboard__key--dark') || key.classList.contains('keyboard__key--extra-wide')){
                key.textContent.toLowerCase();
            } else {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }
}

keys.init();
