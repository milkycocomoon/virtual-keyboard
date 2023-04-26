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
