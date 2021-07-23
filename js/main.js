/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
});
*/
const getElement = (tagName, classNames, attributes) => {
	//classNames - массив строк
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames);
	}
	//аттрибуты
	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}
	return element;
};

//header
const createHeader = (params) => {
	const header = getElement("header");
	const container = getElement("div", ["container"]);
	const wrapper = getElement("div", ["header"]);
	if (params.header.logo) {
		const logo = getElement("img", ["logo"], {
            src: params.header.logo,
            alt: "логотип " + params.title,
        });
		// logo.src = params.header.logo;
		// logo.alt = "логотип " + params.title;
		wrapper.append(logo);
	}
	//меню
	if (params.header.menu) {
		const menuWrapper = getElement("nav", ["menu-list"]);
		const allMenu = params.header.menu.map((item) => {
			const menuLink = getElement("a", ["menu-link"], {
				href: item.link,
				textContent: item.title
			});
			// menuLink.textContent = item.title;
			return menuLink;
		});
		menuWrapper.append(...allMenu);
		wrapper.append(menuWrapper);
	}
	//соцсети
	if (params.header.social) {
		const socialWrapper = getElement("div", ["social"]);
		const allSocial = params.header.social.map((item) => {
        	const socialLink = getElement("a", ["social-link"]);
        	socialLink.href = item.link;
        	// const socialImg = getElement("img");
            // socialImg.src = item.image;
        	// socialImg.alt = item.title;
			socialLink.append(getElement("img", [], {
				src: item.image,
				alt: item.title
			}));
			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);
	return header;
};
//main section
const createMain = ({ title, main: { genre, rating, description, trailer } }) => {
	const main = getElement("main");
	const container = getElement("div", ["container"]);
	main.append(container);
	const wrapper = getElement("div", ["main-content"]);
	container.append(wrapper);
	const content = getElement("div", ["content"]);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
			textContent: genre
		});
		content.append(genreSpan);
	}

	//рейтинг со звездочками
	if (rating) {
		const ratingWrapper = getElement("div", ["rating", "animated", "fadeInRight"]);
		const ratingStars = getElement("div", ["rating-stars"]);
		const ratingNumber = getElement("div", ["rating-number"], {
            textContent: rating + "/10",
        });
		ratingWrapper.append(ratingStars, ratingNumber);
		//stars
		const starsAlt = `Рейтинг ${rating} из 10`;
		// listing
		for (let i = 0; i < 10; i++) {
			const star = getElement("img", ["star"], {
				alt: i ? "" : `Рейтинг ${rating} из 10`,
				src: i < rating ? "img/star.svg" : "img/star-o.svg"
			});
			ratingStars.append(star);
		}
		content.append(ratingWrapper);
	}

	//title
	content.append(getElement("h1", ["main-title", "animated", "fadeInRight"], {
		textContent: title
	}));
	//description
	if (description) {
		content.append(getElement("p", ["main-description", "animated", "fadeInRight"], {
			textContent: description
		}));
	}
	//trailer
	if (trailer) {
		const youtubeLink = getElement("a", ["button", "animated", "fadeInRight", "youtube-modal"], {
            href: trailer,
            textContent: "Смотреть трейлер",
        });
		content.append(youtubeLink);
		const youtubeImgLink = getElement("a", ["play", "youtube-modal"], {
			href: trailer,
			ariaLabel: "Смотреть трейлер"
		});
		const iconPlay = getElement("img", ["play-img"], {
			src: "img/play.svg",
			alt: "",
			ariaHidden: true
		});
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
	}

	return main;
};

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add("body-app");

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : "";
	document.title = options.title;

	//заголовок
	if (options.header) {
		app.append(createHeader(options));
	}
	//контент
	if (options.main) {
		app.append(createMain(options));
	}
};


movieConstructor(".app", {
    title: "Ведьмак",
    background: "witcher/background.jpg",
    header: {
        logo: "witcher/logo.png",
        social: [
            {
                title: "Twitter",
                link: "https://twitter.com",
                image: "witcher/social/twitter.svg",
            },
            {
                title: "Instagram",
                link: "https://instagram.com",
                image: "witcher/social/instagram.svg",
            },
            {
                title: "Facebok",
                link: "https://facebook.com",
                image: "witcher/social/facebook.svg",
            },
        ],
        menu: [
            {
                title: "Описание",
                link: "#",
            },
            {
                title: "Трейлер",
                link: "#",
            },
            {
                title: "Отзывы",
                link: "#",
            },
        ],
    },
    main: {
        genre: "2019, фэнтези",
        rating: 8,
        description: `Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва
                        путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от
                        всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.`,
        trailer: "https://www.youtube.com/watch?v=P0oJqfLzZzQ",
    },
});