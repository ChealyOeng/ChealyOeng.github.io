MIN_WIDTH_CAROUSEL_TEXT = 400


class Carousel {
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

        carousel.#leftArrow.setAttribute("slide", idx);
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

        carousel.#leftArrow.setAttribute("slide", idx - 2);
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
