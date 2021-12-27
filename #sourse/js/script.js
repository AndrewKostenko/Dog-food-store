document.addEventListener('DOMContentLoaded', function () {
	// aos
	AOS.init();


	//window width
	let windowW = window.innerWidth;
	window.addEventListener('resize', function () {
		windowW = window.innerWidth;
	});

	//menu scroll
	const headerMenuItems = document.querySelectorAll('.header_menu a');
	for (elem of headerMenuItems) {
		elem.addEventListener('click', function (e) {
			e.preventDefault();
			let block = document.querySelector(`*[data-scroll="${this.innerHTML}"]`) || document.querySelector(`footer[data-scroll=${this.innerHTML.toLowerCase()}]`);
			if (block) {
				block.scrollIntoView({ block: "start", behavior: "smooth" });
			}
		})
	}

	// header && round line
	const header = document.querySelector('.header');
	const roundLines = document.querySelectorAll('.round_line');

	for (elem of roundLines) {
		if (elem.getBoundingClientRect().top < (window.innerHeight / 1.3) && !elem.classList.contains('active')) {
			elem.classList.add('active');
		}
	}

	window.addEventListener('scroll', function () {
		if (window.scrollY > 0) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
		for (elem of roundLines) {
			if (elem.getBoundingClientRect().top < (window.innerHeight / 1.3) && !elem.classList.contains('active')) {
				elem.classList.add('active');
			}
		}
	});

	// menu burger 
	const burger = document.querySelector('.menu_burger');
	const headerMenu = document.querySelector('.header_menu');
	burger.addEventListener('click', function () {
		this.classList.toggle('active');
		headerMenu.classList.toggle('active');
		document.body.classList.toggle('lock')
	});

	//bafr slider
	bafrSlider = new Swiper('.bafr_bottom', {
		slidesPerView: 1,
		spaceBetween: 80,
		breakpoints: {
			700: {
				slidesPerView: 2,
			},
			500: {
				spaceBetween: 40,
			},
		},
		pagination: {
			el: '.bafr_pagination',
		},
	});

	// zooov slider
	let zooovSlider = new Swiper('.zooov_items', {
		spaceBetween: 26,
		slidesPerView: 'auto',
		freeMode: true,
		pagination: {
			el: ".zooov_pagination",
			clickable: true,
		},
	})

	// questions accordion
	let questionItems = document.querySelectorAll('.item-question');

	for (elem of questionItems) {
		elem.querySelector('.item-question_body').style.height = 0 + 'px';;
		elem.querySelector('.item-question_top').addEventListener('click', function () {
			this.classList.toggle('active');
			let questionBody = this.parentElement.querySelector('.item-question_body');
			if (this.classList.contains('active')) {
				questionBody.style.height = questionBody.scrollHeight + 'px';
			} else {
				questionBody.style.height = 0 + 'px';
			}
		})
	}

	// footer form
	let formInputs = document.querySelectorAll('.form-footer_input');

	for (elem of formInputs) {
		elem.querySelector('input').addEventListener('change', function () {
			if (this.value.length > 0) {
				this.parentElement.classList.add('active');
			} else {
				this.parentElement.classList.remove('active');
			}
		})
	}

	//popups
	const popupsLinks = document.querySelectorAll('*[data-popup]');
	let activePopup = '';
	let popupLock = false;

	for (elem of popupsLinks) {
		elem.addEventListener('click', callPopup);
	}
	document.addEventListener('click', closePopup)

	function callPopup() {
		event.preventDefault();
		if (activePopup) {
			activePopup.classList.remove('active');
			activePopup = '';
		}
		if (!popupLock) {
			let link = this.getAttribute('data-popup');

			activePopup = document.querySelector(link);
			activePopup.classList.add('active');
			document.body.classList.add('lock');

			if (document.querySelector(`${link} .popup-zooov_topslider`)) {
				let topSlider = new Swiper(`${link} .popup-zooov_topslider`, {
					spaceBetween: 40,
				})
				let slider = new Swiper(`${link} .popup-zooov_slider`, {
					spaceBetween: 16,
					slidesPerView: 4,
					freeMode: true,
				})
				document.querySelector(`${link} .popup-zooov_slider`).addEventListener('click', function () {
					let targetElement = event.target.closest('.popup-zooov_item');
					let targetElements = Array.prototype.slice.call(event.target.closest('.popup-zooov_item').parentElement.children);
					topSlider.slideTo(targetElements.indexOf(targetElement));
				})
			}

			lockPopup(300);
		}
	}

	function closePopup() {
		if ((!event.target.closest('.popup_block') || event.target.closest('.popup_close')) && !popupLock && activePopup) {
			activePopup.classList.remove('active');
			activePopup = '';
			document.body.classList.remove('lock');
			lockPopup(300);
		}

	}

	function lockPopup(time) {
		popupLock = true;
		setTimeout(function () {
			popupLock = false;
		}, time);

	}

	//custom select
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/* For each element, create a new DIV that will act as the selected item: */
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/* For each element, create a new DIV that will contain the option list: */
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < ll; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e) {
				/* When an item is clicked, update the original select box,
				and the selected item: */
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						yl = y.length;
						for (k = 0; k < yl; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
			/* When the select box is clicked, close any other select boxes,
			and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

	function closeAllSelect(elmnt) {
		/* A function that will close all select boxes in the document,
		except the current select box: */
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	document.addEventListener("click", closeAllSelect);

	//popup input quantity
	const zooovQuantity = document.querySelectorAll('.popup-zooov_quantity');

	for (elem of zooovQuantity) {
		elem.addEventListener('click', function () {
			if (event.target.closest('.plus')) {
				this.querySelector('input').value++
			} else if (event.target.closest('.minus') && this.querySelector('input').value > 1) {
				this.querySelector('input').value--
			}
		})
	}
})
