const typebox = (dom, list, speed = 200, delay = 10) => {
	let text = '', _text = '', _speed = 0, _delay = 0;
	setInterval(() => {
		if (_text != text) {
			_text = text.substring(0, _text.length + 1);
			dom.textContent = _text;
		} else if (_delay) {
			_delay--;
		} else {
			_text = '';
			_delay = delay;
			text = list[Math.floor(Math.random() * list.length)];
			dom.textContent = _text;
		}
	}, speed);
};