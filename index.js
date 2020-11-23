// ==UserScript==
// @namespace		https://openuserjs.org/users/mikhailsdv
// @name			Google Meet Push-to-Talk
// @description		Enables push-to-talk mode for Google Meet by pressing right ctrl.
// @copyright		2020, mikhailsdv (https://openuserjs.org/users/mikhailsdv)
// @license			MIT
// @version			0.2
// @match			https://meet.google.com/*
// @icon			https://gstatic.com/images/branding/product/1x/meet_16dp.png
// @author			Misha Saidov
// @grant			none
// ==/UserScript==

(function() {
	let tiemeout;
	let keyCodes = ["ControlRight"];
	window.focus();

	const onKeyDown = e => {
		let button = document.querySelector("[jscontroller='vFmxfe'] > div > div > div[jscontroller='lCGUBd'][data-is-muted='true']");
		window.removeEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		if (button && keyCodes.includes(e.code)) {
			clearTimeout(timeout);
			button.click();
		}
	}
	const onKeyUp = e => {
		window.removeEventListener("keydown", onKeyUp);
		window.addEventListener("keydown", onKeyDown);
		timeout = setTimeout(() => {
			let button = document.querySelector("[jscontroller='vFmxfe'] > div > div > div[jscontroller='lCGUBd'][data-is-muted='false']");
			if (button && keyCodes.includes(e.code)) {
				button.click();
			}
		}, 300);
	}

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	setInterval(() => {
		window.focus();
	}, 200);
})();