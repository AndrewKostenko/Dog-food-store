// IBG =============================================================
if (document.querySelectorAll('.ibg')) {
	const imageBackground = document.querySelectorAll('.ibg');
	for (elem of imageBackground) {
		let img = elem.querySelector('img');
		elem.style.background = `url(${img.getAttribute('src')}) center / cover no-repeat`;
		img.remove();
	}
}
// /IBG =============================================================
//tabs
class Tab {
	constructor(tabsSelector) {
		this.tabs = document.querySelector(tabsSelector);
		this.head = this.tabs.querySelector('.tab-head');
		this.body = this.tabs.querySelector('.tab-body');
		this.titles = this.head.querySelectorAll('.tab-title');
		this.items = this.body.querySelectorAll('.tab-item');

		this.paddings = [];

		this.activeTab = 0;

		this.init();
	}

	init() {
		this.onLoad();
		this.onClick();
	}

	onLoad() {
		if (!this.activeTab) {
			this.activeTab = 0;
		}

		for (let a = 0; a < this.titles.length; a++) {
			if (this.paddings[a] == undefined) {
				this.paddings[a] = {};
			}

			this.paddings[a] = this.getPaddings(a);
			this.removeTab(a);
		}

		this.showTab(this.activeTab);
	}

	onClick() {
		this.head.addEventListener('click', (e) => {
			this.changeTab(e)
		})
	}

	removeTab(index) {
		this.titles[index].classList.remove('tab-title-active');
		this.items[index].classList.remove('tab-item-active');
		this.items[index].style.height = '0';
		this.items[index].style.overflow = 'hidden';
		this.paddings[index] = this.getPaddings(index);
	}
	showTab(index) {
		this.titles[index].classList.add('tab-title-active');
		this.items[index].classList.add('tab-item-active');
		this.items[index].style.height = 'auto';
		this.items[index].style.overflow = 'visible';
		this.setPaddings(index);
	}
	changeTab(e) {
		this.removeTab(this.activeTab);

		this.activeTab = [...this.head.children].indexOf(e.target);

		this.showTab(this.activeTab);
	}

	getPaddings(index) {
		let obj = {};
		let style = window.getComputedStyle(this.items[index]);

		obj['t'] = style.getPropertyValue("padding-top");
		obj['r'] = style.getPropertyValue("padding-right");
		obj['b'] = style.getPropertyValue("padding-bottom");
		obj['l'] = style.getPropertyValue("padding-left");

		this.items[index].style.padding = '0';

		return obj
	}
	setPaddings(index) {
		console.log(this.paddings[index]['t']);

		this.items[index].style.padding = this.paddings[index]['t'] + ' ' + this.paddings[index]['r'] + ' ' + this.paddings[index]['b'] + ' ' + this.paddings[index]['l'] + ' ';
	}
}