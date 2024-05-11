MIN_WIDTH_CAROUSEL_TEXT = 400


class Carousel {
    static #lastScrollX = 0;
    static #lastScrollY = 0;

    domElement = null;
    #leftArrow = null;
    #rightArrow = null;
    #totalItems = 0;

    get totalItems() {
        return this.#totalItems;
    }

    constructor(domElement, totalItems) {
        this.domElement = domElement;
        this.#totalItems = totalItems;
    }

    static readSlideNumberFrag() {
        let fragment = window.location.hash;
        let fragSplit = fragment.split("-");
        if (!fragSplit) {
            return NaN;
        }

        // Read the fragment and parse unto the buttons.
        let idxStr = fragSplit[1];
        let idx = parseInt(idxStr, 10);
        if (!idx) {
            return NaN;
        }
        return idx;
    }

    static #disableScroll() {
        // Scroll to that position immediately after any attempt to scroll:
        window.onscroll = function () {
            window.scrollTo(Carousel.#lastScrollX, Carousel.#lastScrollY);
            Carousel.#enableScroll();
        };
    }

    static #enableScroll() {
        window.onscroll = null;
    }

    static #onClickRightArrow(carousel) {
        function setDefaults() {
            carousel.#leftArrow.setAttribute("slide", 0);
            carousel.#rightArrow.setAttribute("slide", 2);
            window.location.hash = `slide-1`;
        }

        let idx = Carousel.readSlideNumberFrag();
        if (!idx) {
            setDefaults();
            return;
        } else if (idx >= carousel.totalItems - 1) {
            return;
        }

        // Remember last position
        Carousel.#lastScrollX = window.scrollX;
        Carousel.#lastScrollY = window.scrollY;

        carousel.#leftArrow.setAttribute("slide", idx);
        Carousel.#disableScroll();
        window.location.hash = `slide-${idx + 1}`;
        carousel.#rightArrow.setAttribute("slide", idx + 2);
    }

    static #onClickLeftArrow(carousel) {
        function setDefaults() {
            carousel.#leftArrow.setAttribute("slide", 0);
            carousel.#rightArrow.setAttribute("slide", 1);
            window.location.hash = `slide-0`;
        }

        let idx = Carousel.readSlideNumberFrag();
        if (!idx) {
            setDefaults();
            return;
        } else if (idx <= 0) {
            return;
        }

        // Remember last position
        Carousel.#lastScrollX = window.scrollX;
        Carousel.#lastScrollY = window.scrollY;

        console.log(Carousel.#lastScrollX,
            Carousel.#lastScrollY);

        carousel.#leftArrow.setAttribute("slide", idx - 2);
        Carousel.#disableScroll();
        window.location.hash = `slide-${idx - 1}`;
        carousel.#rightArrow.setAttribute("slide", idx);
    }

    setControlArrow(arrow) {
        if (!arrow) {
            console.error("setControlArrow arrow is null");
            return;
        }
        else if (arrow.className.includes("Left")) {
            this.#leftArrow = arrow;
            this.#leftArrow.onclick = () => Carousel.#onClickLeftArrow(this);
        }
        else if (arrow.className.includes("Right")) {
            this.#rightArrow = arrow;
            this.#rightArrow.onclick = () => Carousel.#onClickRightArrow(this);
        } else {
            console.error(`Invalid element setControlArrow: ${arrow}`);
        }
    }
}

function initCarousel() {
    let carouselDom = document.getElementsByClassName("Carousel")[0];
    let slides = carouselDom.getElementsByClassName("CarouselItem");

    carousel = new Carousel(carouselDom, slides.length);
    let controlArrows = carouselDom.getElementsByClassName("CarouselControlArrow");
    for (let iy = 0; iy < controlArrows.length; iy++) {
        carousel.setControlArrow(controlArrows.item(iy))
    }
}

var carousel = null;
initCarousel();
