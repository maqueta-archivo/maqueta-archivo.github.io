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
        this.currentSlide = document.createElement('a-image');
        this.el.appendChild(this.currentSlide);

        this.slidesTarget = document.querySelector(this.data['slidesTarget']);

        this.leftArrow = document.createElement('img');
        this.leftArrowSrc = document.querySelector(this.data['leftArrowSrc']).getAttribute('src');
        this.leftArrowPressSrc = document.querySelector(this.data['leftArrowPressSrc']).getAttribute('src');
        this.leftArrow.setAttribute('src', this.leftArrowSrc);
        this.leftArrow.style.zIndex = 9999;
        this.leftArrow.style.position = 'absolute';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            this.leftArrow.style.height = '7%';
        } else {
            this.leftArrow.style.height = '15%';
        }
        this.leftArrow.style.width = 'auto';
        this.leftArrow.style.bottom = '2%';
        this.leftArrow.style.left = '10%';
        this.leftArrow.classList.add("fullscreen");

        this.leftArrow.addEventListener('click', () => { this.prevSlide(); });

        this.leftArrow.addEventListener('pointerup', () => { this.changeSrc(this.leftArrow, this.leftArrowSrc) });
        this.leftArrow.addEventListener("touchend", () => { this.changeSrc(this.leftArrow, this.leftArrowSrc) });
        this.leftArrow.addEventListener("mouseup", () => { this.changeSrc(this.leftArrow, this.leftArrowSrc) });

        this.leftArrow.addEventListener('pointerdown', () => { this.changeSrc(this.leftArrow, this.leftArrowPressSrc) });
        this.leftArrow.addEventListener("touchstart", () => { this.changeSrc(this.leftArrow, this.leftArrowPressSrc) });
        this.leftArrow.addEventListener("mousedown", () => { this.changeSrc(this.leftArrow, this.leftArrowPressSrc) });

        this.rightArrow = document.createElement('img');
        this.rightArrowSrc = document.querySelector(this.data['rightArrowSrc']).getAttribute('src');
        this.rightArrowPressSrc = document.querySelector(this.data['rightArrowPressSrc']).getAttribute('src');
        this.rightArrow.setAttribute('src', this.rightArrowSrc);
        this.rightArrow.style.zIndex = 9999;
        this.rightArrow.style.position = 'absolute';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            this.rightArrow.style.height = '7%';
        } else {
            this.rightArrow.style.height = '15%';
        }
        this.rightArrow.style.width = 'auto';
        this.rightArrow.style.bottom = '2%';
        this.rightArrow.style.right = '10%';
        this.rightArrow.classList.add("fullscreen");

        this.rightArrow.addEventListener('click', () => { this.nextSide(); });

        this.rightArrow.addEventListener('pointerup', () => { this.changeSrc(this.rightArrow, this.rightArrowSrc) });
        this.rightArrow.addEventListener("touchend", () => { this.changeSrc(this.rightArrow, this.rightArrowSrc) });
        this.rightArrow.addEventListener("mouseup", () => { this.changeSrc(this.rightArrow, this.rightArrowSrc) });

        this.rightArrow.addEventListener('pointerdown', () => { this.changeSrc(this.rightArrow, this.rightArrowPressSrc) });
        this.rightArrow.addEventListener("touchstart", () => { this.changeSrc(this.rightArrow, this.rightArrowPressSrc) });
        this.rightArrow.addEventListener("mousedown", () => { this.changeSrc(this.rightArrow, this.rightArrowPressSrc) });

        this.fullscreenButton = document.createElement('img');
        this.fullscreenButtonSrc = document.querySelector(this.data['fullscreenButton']).getAttribute('src');
        this.fullscreenButtonPressSrc = document.querySelector(this.data['fullscreenButtonPress']).getAttribute('src');
        this.fullscreenButton.setAttribute('src', this.fullscreenButtonSrc);
        this.fullscreenButton.style.zIndex = 9999;
        this.fullscreenButton.style.position = 'absolute';
        this.fullscreenButton.style.width = 'auto';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            this.fullscreenButton.style.height = '7%';
        } else {
            this.fullscreenButton.style.height = '15%';
        }
        this.fullscreenButton.style.top = '2%';
        this.fullscreenButton.style.left = '2%';
        this.fullscreenButton.classList.add("fullscreen");

        this.fullscreenButton.addEventListener("click", () => {

            this.el.setAttribute('visible', false);
            this.fullscreenButton.hidden = true;
            this.leftArrow.hidden = true;
            this.rightArrow.hidden = true;

            this.fullscreenImg = document.createElement('img');
            this.fullscreenImg.setAttribute('src', this.currentSlide.getAttribute('src'));
            this.fullscreenImg.style.zIndex = 9998;
            this.fullscreenImg.style.position = 'absolute';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                this.fullscreenImg.style.width = '85%';
                this.fullscreenImg.style.height = 'auto';
            } else {
                this.fullscreenImg.style.width = 'auto';
                this.fullscreenImg.style.height = '85%';
            }
            this.fullscreenImg.style.top = '50%';
            this.fullscreenImg.style.left = '50%';
            this.fullscreenImg.style.transform = 'translate(-50%, -50%)';
            this.fullscreenImg.classList.add("fullscreen");

            document.querySelector('body').appendChild(this.fullscreenImg);

            this.fullscreenExit = document.createElement('img');
            this.fullscreenExitSrc = document.querySelector(this.data['fullscreenExit']).getAttribute('src');
            this.fullscreenExitPressSrc = document.querySelector(this.data['fullscreenExitPress']).getAttribute('src');
            this.fullscreenExit.setAttribute('src', this.fullscreenExitSrc);
            this.fullscreenExit.style.zIndex = 9999;
            this.fullscreenExit.style.position = 'absolute';
            this.fullscreenExit.style.width = 'auto';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                this.fullscreenExit.style.height = '7%';
            } else {
                this.fullscreenExit.style.height = '15%';
            }
            this.fullscreenExit.style.top = '2%';
            this.fullscreenExit.style.left = '2%';
            this.fullscreenExit.classList.add("fullscreen");

            document.querySelector('body').appendChild(this.fullscreenExit);

            this.fullscreenExit.addEventListener('click', () => {
                this.fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                this.fullscreenButton.hidden = false;
                this.leftArrow.hidden = false;
                this.rightArrow.hidden = false;
                this.fullscreenImg.remove();
            });

            this.fullscreenExit.addEventListener('pointerup', () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitSrc) });
            this.fullscreenExit.addEventListener("touchend", () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitSrc) });
            this.fullscreenExit.addEventListener("mouseup", () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitSrc) });

            this.fullscreenExit.addEventListener('pointerdown', () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitPressSrc) });
            this.fullscreenExit.addEventListener("touchstart", () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitPressSrc) });
            this.fullscreenExit.addEventListener("mousedown", () => { this.changeSrc(this.fullscreenExit, this.fullscreenExitPressSrc) });

        });

        this.fullscreenButton.addEventListener('pointerup', () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonSrc) });
        this.fullscreenButton.addEventListener("touchend", () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonSrc) });
        this.fullscreenButton.addEventListener("mouseup", () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonSrc) });

        this.fullscreenButton.addEventListener('pointerdown', () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonPressSrc) });
        this.fullscreenButton.addEventListener("touchstart", () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonPressSrc) });
        this.fullscreenButton.addEventListener("mousedown", () => { this.changeSrc(this.fullscreenButton, this.fullscreenButtonPressSrc) });

        this.slidesTarget.addEventListener('targetFound', event => {
            let fullscreenElements = Array.from(document.getElementsByClassName("fullscreen"));
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
        
        window.addEventListener("resize", () => {
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                this.rightArrow.style.height = '7%';
                this.leftArrow.style.height = '7%';
                this.fullscreenButton.style.height = '7%';
            } else {
                this.rightArrow.style.height = '15%';
                this.leftArrow.style.height = '15%';
                this.fullscreenButton.style.height = '15%';
            }
        });

        this.updateSlide();

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