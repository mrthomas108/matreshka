import html2nodeList from './_html2nodelist';

function BQueryInit(selector, context) {
	let result;

	if (selector) {
		if (selector.nodeType || selector === window) {
			result = [selector];
		} else if (typeof selector === 'string') {
			if (/</.test(selector)) {
				result = html2nodeList(selector);
			} else {
				if (context) {
					const newContext = (new BQueryInit(context))[0];

					if (newContext) {
						result = newContext.querySelectorAll(selector);
					}
				} else {
					result = document.querySelectorAll(selector);
				}
			}
		} else if (selector instanceof Function) { // typeof nodeList returns "function" in old WebKit
			if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', selector);
			} else {
				selector();
			}
		} else {
			result = selector;
		}
	}

	const length = result && result.length;

	if (length) {
		for(const i = 0; i < length; i++) {
			this.push(result[i]);
		}
	}
}

BQueryInit.prototype = [];

export default BQueryInit;
