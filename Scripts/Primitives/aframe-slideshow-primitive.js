AFRAME.registerPrimitive('a-slideshow-gallery', {
    defaultComponents: {},
    mappings: {}
});

AFRAME.registerPrimitive('a-slide-img', {
    defaultComponents: {},
    mappings: {}
});

AFRAME.registerComponent('a-slideshow-nested-elements-', {
    schema: {
        'slidesTarget': { type: 'string' },
        'slidesSrc': { type: 'string' },
        'leftArrowSrc': { type: 'string' },
        'leftArrowPressSrc': { type: 'string' },
        'rightArrowSrc': { type: 'string' },
        'rightArrowPressSrc': { type: 'string' },
        'fullscreenButton': { type: 'string' },
        'fullscreenButtonPress': { type: 'string' },
        'fullscreenExit': { type: 'string' },
        'fullscreenExitPress': { type: 'string' }
    },
    init: function () {
        this.currentSlideNumber = 0;
        this.slides = document.querySelector(this.data['slidesSrc']);
        this.slidesTarget = document.querySelector(this.data['slidesTarget']);
        this.currentSlide = document.createElement('a-image');
        this.el.appendChild(this.currentSlide);

        this.fullscreenButton = document.createElement('img');
        let fullscreenButtonSrc = document.querySelector(this.data['fullscreenButton']).getAttribute('src');
        let fullscreenButtonPressSrc = document.querySelector(this.data['fullscreenButtonPress']).getAttribute('src');
        this.fullscreenButton.setAttribute('src', fullscreenButtonSrc);
        this.fullscreenButton.style.zIndex = 9999;
        this.fullscreenButton.style.position = 'absolute';
        this.fullscreenButton.style.width = 'auto';
        this.fullscreenButton.style.height = '15%';
        this.fullscreenButton.style.top = '2%';
        this.fullscreenButton.style.left = '2%';
        this.fullscreenButton.classList.add("fullscreen");

        this.fullscreenButton.addEventListener("click", () => {

            this.el.setAttribute('visible', false);
            this.fullscreenButton.hidden = true;
            this.leftArrow.hidden = true;
            this.rightArrow.hidden = true;

            let fullscreenImg = document.createElement('img');
            fullscreenImg.setAttribute('src', this.currentSlide.getAttribute('src'));
            fullscreenImg.style.zIndex = 9998;
            fullscreenImg.style.position = 'absolute';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                fullscreenImg.style.width = '85%';
                fullscreenImg.style.height = 'auto';
            } else {
                fullscreenImg.style.width = 'auto';
                fullscreenImg.style.height = '85%';
            }
            fullscreenImg.style.top = '50%';
            fullscreenImg.style.left = '50%';
            fullscreenImg.style.transform = 'translate(-50%, -50%)';
            fullscreenImg.classList.add("fullscreen");

            window.addEventListener("resize", () => {
                if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                    fullscreenImg.style.width = '85%';
                    fullscreenImg.style.height = 'auto';
                } else {
                    fullscreenImg.style.width = 'auto';
                    fullscreenImg.style.height = '85%';
                }
            });

            document.querySelector('body').appendChild(fullscreenImg);

            let fullscreenExit = document.createElement('img');
            let fullscreenExitSrc = document.querySelector(this.data['fullscreenExit']).getAttribute('src');
            let fullscreenExitPressSrc = document.querySelector(this.data['fullscreenExitPress']).getAttribute('src');
            fullscreenExit.setAttribute('src', fullscreenExitSrc);
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            fullscreenExit.style.height = '15%';
            fullscreenExit.style.top = '2%';
            fullscreenExit.style.left = '2%';
            fullscreenExit.classList.add("fullscreen");

            document.querySelector('body').appendChild(fullscreenExit);

            fullscreenExit.addEventListener('click', () => {
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                this.fullscreenButton.hidden = false;
                this.leftArrow.hidden = false;
                this.rightArrow.hidden = false;
                fullscreenImg.remove();
            });

            fullscreenExit.addEventListener('pointerup', () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });
            fullscreenExit.addEventListener("touchend", () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });
            fullscreenExit.addEventListener("mouseup", () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });

            fullscreenExit.addEventListener('pointerdown', () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });
            fullscreenExit.addEventListener("touchstart", () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });
            fullscreenExit.addEventListener("mousedown", () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });

        });

        this.fullscreenButton.addEventListener('pointerup', () => { this.changeSrc(this.fullscreenButton, fullscreenButtonSrc) });
        this.fullscreenButton.addEventListener("touchend", () => { this.changeSrc(this.fullscreenButton, fullscreenButtonSrc) });
        this.fullscreenButton.addEventListener("mouseup", () => { this.changeSrc(this.fullscreenButton, fullscreenButtonSrc) });

        this.fullscreenButton.addEventListener('pointerdown', () => { this.changeSrc(this.fullscreenButton, fullscreenButtonPressSrc) });
        this.fullscreenButton.addEventListener("touchstart", () => { this.changeSrc(this.fullscreenButton, fullscreenButtonPressSrc) });
        this.fullscreenButton.addEventListener("mousedown", () => { this.changeSrc(this.fullscreenButton, fullscreenButtonPressSrc) });

        this.leftArrow = document.createElement('img');
        let leftArrowSrc = document.querySelector(this.data['leftArrowSrc']).getAttribute('src');
        let leftArrowPressSrc = document.querySelector(this.data['leftArrowPressSrc']).getAttribute('src');
        this.leftArrow.setAttribute('src', leftArrowSrc);
        this.leftArrow.style.zIndex = 9999;
        this.leftArrow.style.position = 'absolute';
        this.leftArrow.style.width = 'auto';
        this.leftArrow.style.height = '15%';
        this.leftArrow.style.bottom = '2%';
        this.leftArrow.style.left = '10%';
        this.leftArrow.classList.add("fullscreen");

        this.leftArrow.addEventListener('click', () => { this.prevSlide(); });

        this.leftArrow.addEventListener('pointerup', () => { this.changeSrc(this.leftArrow, leftArrowSrc) });
        this.leftArrow.addEventListener("touchend", () => { this.changeSrc(this.leftArrow, leftArrowSrc) });
        this.leftArrow.addEventListener("mouseup", () => { this.changeSrc(this.leftArrow, leftArrowSrc) });

        this.leftArrow.addEventListener('pointerdown', () => { this.changeSrc(this.leftArrow, leftArrowPressSrc) });
        this.leftArrow.addEventListener("touchstart", () => { this.changeSrc(this.leftArrow, leftArrowPressSrc) });
        this.leftArrow.addEventListener("mousedown", () => { this.changeSrc(this.leftArrow, leftArrowPressSrc) });

        this.rightArrow = document.createElement('img');
        let rightArrowSrc = document.querySelector(this.data['rightArrowSrc']).getAttribute('src');
        let rightArrowPressSrc = document.querySelector(this.data['rightArrowPressSrc']).getAttribute('src');
        this.rightArrow.setAttribute('src', rightArrowSrc);
        this.rightArrow.style.zIndex = 9999;
        this.rightArrow.style.position = 'absolute';
        this.rightArrow.style.width = 'auto';
        this.rightArrow.style.height = '15%';
        this.rightArrow.style.bottom = '2%';
        this.rightArrow.style.right = '10%';
        this.rightArrow.classList.add("fullscreen");

        this.rightArrow.addEventListener('click', () => { this.nextSide(); });

        this.rightArrow.addEventListener('pointerup', () => { this.changeSrc(this.rightArrow, rightArrowSrc) });
        this.rightArrow.addEventListener("touchend", () => { this.changeSrc(this.rightArrow, rightArrowSrc) });
        this.rightArrow.addEventListener("mouseup", () => { this.changeSrc(this.rightArrow, rightArrowSrc) });

        this.rightArrow.addEventListener('pointerdown', () => { this.changeSrc(this.rightArrow, rightArrowPressSrc) });
        this.rightArrow.addEventListener("touchstart", () => { this.changeSrc(this.rightArrow, rightArrowPressSrc) });
        this.rightArrow.addEventListener("mousedown", () => { this.changeSrc(this.rightArrow, rightArrowPressSrc) });

        this.updateSlide();


        this.slidesTarget.addEventListener('targetFound', event => {
            var fullscreenElements = Array.from(document.getElementsByClassName("fullscreen"));
            for (let index = 0; index < fullscreenElements.length; index++) {
                fullscreenElements[index].remove();
            }
            this.el.setAttribute('visible', true);
            document.querySelector('body').appendChild(this.fullscreenButton);
            this.fullscreenButton.hidden = false;
            document.querySelector('body').appendChild(this.leftArrow);
            this.leftArrow.hidden = false;
            document.querySelector('body').appendChild(this.rightArrow);
            this.rightArrow.hidden = false;
        });

        this.slidesTarget.addEventListener('targetLost', event => {
            this.fullscreenButton.remove();
            this.leftArrow.remove();
            this.rightArrow.remove();
        });

    },
    updateSlide: function () {
        let newImg = this.slides.children[this.currentSlideNumber];
        this.currentSlide.setAttribute('visible', false);
        this.currentSlide.setAttribute('src', newImg.getAttribute('src'));
        this.currentSlide.setAttribute('width', newImg.getAttribute('width'));
        this.currentSlide.setAttribute('height', newImg.getAttribute('height'));
        this.currentSlide.setAttribute('visible', true);

    },
    nextSide: function () {
        this.currentSlideNumber = this.currentSlideNumber + 1;
        if (this.currentSlideNumber >= this.slides.children.length) {
            this.currentSlideNumber = 0;
        }
        this.updateSlide();
    },
    prevSlide: function () {
        this.currentSlideNumber = this.currentSlideNumber - 1;
        if (this.currentSlideNumber < 0) {
            this.currentSlideNumber = this.slides.children.length - 1;
        }
        this.updateSlide();
    },
    changeSrc: function (element, src) {
        element.setAttribute('src', src);
    }
});

AFRAME.registerPrimitive('a-interactive-slideshow', {
    defaultComponents: {
        'a-slideshow-nested-elements-': {}
    },

    mappings: {
        'slides-target': 'a-slideshow-nested-elements-.slidesTarget',
        'slides-src': 'a-slideshow-nested-elements-.slidesSrc',
        'left-arrow': 'a-slideshow-nested-elements-.leftArrowSrc',
        'left-arrow-press': 'a-slideshow-nested-elements-.leftArrowPressSrc',
        'right-arrow': 'a-slideshow-nested-elements-.rightArrowSrc',
        'right-arrow-press': 'a-slideshow-nested-elements-.rightArrowPressSrc',
        'fullscreen-button': 'a-slideshow-nested-elements-.fullscreenButton',
        'fullscreen-button-press': 'a-slideshow-nested-elements-.fullscreenButtonPress',
        'fullscreen-exit': 'a-slideshow-nested-elements-.fullscreenExit',
        'fullscreen-exit-press': 'a-slideshow-nested-elements-.fullscreenExitPress'
    }
});