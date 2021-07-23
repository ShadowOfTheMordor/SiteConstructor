// import configObject from "./witcher.js";
import configObject from "./loki.js";

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
const createHeader = ({ title, header: { logo, menu, social } }) => {
    const header = getElement("header");
    const container = getElement("div", ["container"]);
    const wrapper = getElement("div", ["header"]);
    if (logo) {
        const logoImg = getElement("img", ["logo"], {
            src: logo,
            alt: "логотип " + title,
        });
        wrapper.append(logoImg);
    }
    //меню
    if (menu) {
        const menuWrapper = getElement("nav", ["menu-list"]);
        const allMenu = menu.map((item) => {
            const menuLink = getElement("a", ["menu-link"], {
                href: item.link,
                textContent: item.title,
            });
            // menuLink.textContent = item.title;
            return menuLink;
        });
        menuWrapper.append(...allMenu);
        wrapper.append(menuWrapper);
        //кнопка меню для малых экранов
        const menuBtn = getElement("button", ["menu-button"]);
        // console.log(menuBtn);
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("menu-button-active");
            wrapper.classList.toggle("header-active");
        });
        container.append(menuBtn);
    }
    //соцсети
    if (social) {
        const socialWrapper = getElement("div", ["social"]);
        const allSocial = social.map((item) => {
            const socialLink = getElement("a", ["social-link"]);
            socialLink.href = item.link;
            // const socialImg = getElement("img");
            // socialImg.src = item.image;
            // socialImg.alt = item.title;
            socialLink.append(
                getElement("img", [], {
                    src: item.image,
                    alt: item.title,
                })
            );
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
const createMain = ({ title, main: { genre, rating, description, trailer, slider } }) => {
    const main = getElement("main");
    const container = getElement("div", ["container"]);
    main.append(container);
    const wrapper = getElement("div", ["main-content"]);
    container.append(wrapper);
    const content = getElement("div", ["content"]);
    wrapper.append(content);

    if (genre) {
        const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
            textContent: genre,
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
                src: i < rating ? "img/star.svg" : "img/star-o.svg",
            });
            ratingStars.append(star);
        }
        content.append(ratingWrapper);
    }

    //title
    content.append(
        getElement("h1", ["main-title", "animated", "fadeInRight"], {
            textContent: title,
        })
    );
    //description
    if (description) {
        content.append(
            getElement("p", ["main-description", "animated", "fadeInRight"], {
                textContent: description,
            })
        );
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
            ariaLabel: "Смотреть трейлер",
        });
        const iconPlay = getElement("img", ["play-img"], {
            src: "img/play.svg",
            alt: "",
            ariaHidden: true,
        });
        youtubeImgLink.append(iconPlay);
        wrapper.append(youtubeImgLink);
    }

    if (slider) {
        const sliderBlock = getElement("div", ["series"]);
        const swiperBlock = getElement("div", ["swiper-container"]);
        const swiperWrapper = getElement("div", ["swiper-wrapper"]);
        const arrow = getElement("button", ["arrow"]);

        const allSliders = slider.map((item) => {
            let alt = "";

            const swiperSlide = getElement("div", ["swiper-slide"]);
            const swiperCard = getElement("figure", ["card"]);
            swiperSlide.append(swiperCard);
            //image
            const swiperImg = getElement("img", ["card-img"], {
                src: item.img,
                alt: item.title + " " + item.subtitle,
            });
            swiperCard.append(swiperImg);
            //descr
            if (item.title || item.subtitle) {
                const swiperFigCaption = getElement("figcaption", ["card-description"]);
                if (item.subtitle) {
                    const swiperSubtitle = getElement("p", ["card-subtitle"], {
                        textContent: item.subtitle,
                    });
                    swiperFigCaption.append(swiperSubtitle);
                }
                if (item.title) {
                    const swiperTitle = getElement("p", ["card-title"], {
                        textContent: item.title,
                    });
                    swiperFigCaption.append(swiperTitle);
                }
                swiperCard.append(swiperFigCaption);
            }

            return swiperSlide;
        });
        swiperWrapper.append(...allSliders);
        swiperBlock.append(swiperWrapper);
        sliderBlock.append(swiperBlock);
        sliderBlock.append(arrow);
        container.append(sliderBlock);
        new Swiper(swiperBlock, {
            loop: true,
            navigation: {
                nextEl: arrow,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                541: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
            },
        });
    }

    return main;
};

//footer
const createFooter = ({ title, footer: { copyright, menu } }) => {
    const footerBlock = getElement("footer", ["footer"]);
    const container = getElement("div", ["container"]);
    const content = getElement("div", ["footer-content"]);
    container.append(content);
    footerBlock.append(container);
    if (copyright) {
        const copyrightBlock = getElement("div", ["left"]);
        const copyrightContent = getElement("span", ["copyright"], {
            textContent: copyright,
        });
        copyrightBlock.append(copyrightContent);
        content.append(copyrightBlock);
    }
    if (menu) {
        const menuBlock = getElement("div", ["right"]);
        const menuNav = getElement("nav", ["footer-menu"]);
        menuBlock.append(menuNav);
        const allMenu = menu.map((item) => {
            return getElement("a", ["footer-link"], {
                textContent: item.title,
                href: item.link,
            });
        });
        menuNav.append(...allMenu);
        content.append(menuBlock);
    }

    return footerBlock;
};

const movieConstructor = (selector, options) => {
    const app = document.querySelector(selector);
    app.classList.add("body-app");

    app.style.color = options.fontColor || "";
    app.style.backgroundColor = options.backgroundColor || "";
    if (options.subColor) {
        document.documentElement.style.setProperty("--sub-color", options.subColor);
    }

    if (options.favicon) {
        const index = options.favicon.lastIndexOf(".");
        const type = options.favicon.substring(index + 1);
        const favicon = getElement("link", null, {
            rel: "icon",
            href: options.favicon,
            type: "image/" + type === "svg" ? "image/svg-xml" : type,
        });
        document.head.append(favicon);
    }

    app.style.backgroundImage = options.background ? `url("${options.background}")` : "";
    document.title = options.title;

    //заголовок
    if (options.header) {
        app.append(createHeader(options));
    }
    //контент
    if (options.main) {
        app.append(createMain(options));
    }
    //футер
    if (options.footer) {
        app.append(createFooter(options));
    }
};

movieConstructor(".app", configObject);
