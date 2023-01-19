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

        slidesTarget = document.querySelector(this.data['slidesTarget']);

        leftArrow = document.createElement('img');
        let leftArrowSrc = document.querySelector(this.data['leftArrowSrc']).getAttribute('src');
        let leftArrowPressSrc = document.querySelector(this.data['leftArrowPressSrc']).getAttribute('src');
        leftArrow.setAttribute('src', leftArrowSrc);
        leftArrow.style.zIndex = 9999;
        leftArrow.style.position = 'absolute';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            leftArrow.style.height = '7%';
        } else {
            leftArrow.style.height = '15%';
        }
        leftArrow.style.width = 'auto';
        leftArrow.style.bottom = '2%';
        leftArrow.style.left = '10%';
        leftArrow.classList.add("fullscreen");

        leftArrow.addEventListener('click', () => { this.prevSlide(); });

        leftArrow.addEventListener('pointerup', () => { this.changeSrc(leftArrow, leftArrowSrc) });
        leftArrow.addEventListener("touchend", () => { this.changeSrc(leftArrow, leftArrowSrc) });
        leftArrow.addEventListener("mouseup", () => { this.changeSrc(leftArrow, leftArrowSrc) });

        leftArrow.addEventListener('pointerdown', () => { this.changeSrc(leftArrow, leftArrowPressSrc) });
        leftArrow.addEventListener("touchstart", () => { this.changeSrc(leftArrow, leftArrowPressSrc) });
        leftArrow.addEventListener("mousedown", () => { this.changeSrc(leftArrow, leftArrowPressSrc) });

        rightArrow = document.createElement('img');
        let rightArrowSrc = document.querySelector(this.data['rightArrowSrc']).getAttribute('src');
        let rightArrowPressSrc = document.querySelector(this.data['rightArrowPressSrc']).getAttribute('src');
        rightArrow.setAttribute('src', rightArrowSrc);
        rightArrow.style.zIndex = 9999;
        rightArrow.style.position = 'absolute';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            rightArrow.style.height = '7%';
        } else {
            rightArrow.style.height = '15%';
        }
        rightArrow.style.width = 'auto';
        rightArrow.style.bottom = '2%';
        rightArrow.style.right = '10%';
        rightArrow.classList.add("fullscreen");

        rightArrow.addEventListener('click', () => { this.nextSide(); });

        rightArrow.addEventListener('pointerup', () => { this.changeSrc(rightArrow, rightArrowSrc) });
        rightArrow.addEventListener("touchend", () => { this.changeSrc(rightArrow, rightArrowSrc) });
        rightArrow.addEventListener("mouseup", () => { this.changeSrc(rightArrow, rightArrowSrc) });

        rightArrow.addEventListener('pointerdown', () => { this.changeSrc(rightArrow, rightArrowPressSrc) });
        rightArrow.addEventListener("touchstart", () => { this.changeSrc(rightArrow, rightArrowPressSrc) });
        rightArrow.addEventListener("mousedown", () => { this.changeSrc(rightArrow, rightArrowPressSrc) });

        fullscreenButton = document.createElement('img');
        let fullscreenButtonSrc = document.querySelector(this.data['fullscreenButton']).getAttribute('src');
        let fullscreenButtonPressSrc = document.querySelector(this.data['fullscreenButtonPress']).getAttribute('src');
        fullscreenButton.setAttribute('src', fullscreenButtonSrc);
        fullscreenButton.style.zIndex = 9999;
        fullscreenButton.style.position = 'absolute';
        fullscreenButton.style.width = 'auto';
        if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
            fullscreenButton.style.height = '7%';
        } else {
            fullscreenButton.style.height = '15%';
        }
        fullscreenButton.style.top = '2%';
        fullscreenButton.style.left = '2%';
        fullscreenButton.classList.add("fullscreen");

        fullscreenButton.addEventListener("click", () => {

            this.el.setAttribute('visible', false);
            fullscreenButton.hidden = true;
            leftArrow.hidden = true;
            rightArrow.hidden = true;

            fullscreenImg = document.createElement('img');
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

            document.querySelector('body').appendChild(fullscreenImg);

            fullscreenExit = document.createElement('img');
            let fullscreenExitSrc = document.querySelector(this.data['fullscreenExit']).getAttribute('src');
            let fullscreenExitPressSrc = document.querySelector(this.data['fullscreenExitPress']).getAttribute('src');
            fullscreenExit.setAttribute('src', fullscreenExitSrc);
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                fullscreenExit.style.height = '7%';
            } else {
                fullscreenExit.style.height = '15%';
            }
            fullscreenExit.style.top = '2%';
            fullscreenExit.style.left = '2%';
            fullscreenExit.classList.add("fullscreen");

            document.querySelector('body').appendChild(fullscreenExit);

            fullscreenExit.addEventListener('click', () => {
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                fullscreenButton.hidden = false;
                leftArrow.hidden = false;
                rightArrow.hidden = false;
                fullscreenImg.remove();
            });

            fullscreenExit.addEventListener('pointerup', () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });
            fullscreenExit.addEventListener("touchend", () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });
            fullscreenExit.addEventListener("mouseup", () => { this.changeSrc(fullscreenExit, fullscreenExitSrc) });

            fullscreenExit.addEventListener('pointerdown', () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });
            fullscreenExit.addEventListener("touchstart", () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });
            fullscreenExit.addEventListener("mousedown", () => { this.changeSrc(fullscreenExit, fullscreenExitPressSrc) });

        });

        fullscreenButton.addEventListener('pointerup', () => { this.changeSrc(fullscreenButton, fullscreenButtonSrc) });
        fullscreenButton.addEventListener("touchend", () => { this.changeSrc(fullscreenButton, fullscreenButtonSrc) });
        fullscreenButton.addEventListener("mouseup", () => { this.changeSrc(fullscreenButton, fullscreenButtonSrc) });

        fullscreenButton.addEventListener('pointerdown', () => { this.changeSrc(fullscreenButton, fullscreenButtonPressSrc) });
        fullscreenButton.addEventListener("touchstart", () => { this.changeSrc(fullscreenButton, fullscreenButtonPressSrc) });
        fullscreenButton.addEventListener("mousedown", () => { this.changeSrc(fullscreenButton, fullscreenButtonPressSrc) });

        slidesTarget.addEventListener('targetFound', event => {
            var fullscreenElements = Array.from(document.getElementsByClassName("fullscreen"));
            for (let index = 0; index < fullscreenElements.length; index++) {
                fullscreenElements[index].remove();
            }
            this.el.setAttribute('visible', true);
            document.querySelector('body').appendChild(fullscreenButton);
            fullscreenButton.hidden = false;
            document.querySelector('body').appendChild(leftArrow);
            leftArrow.hidden = false;
            document.querySelector('body').appendChild(rightArrow);
            rightArrow.hidden = false;
        });

        slidesTarget.addEventListener('targetLost', event => {
            fullscreenButton.remove();
            leftArrow.remove();
            rightArrow.remove();
        });
        
        window.addEventListener("resize", () => {
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                rightArrow.style.height = '7%';
                leftArrow.style.height = '7%';
                fullscreenButton.style.height = '7%';
            } else {
                rightArrow.style.height = '15%';
                leftArrow.style.height = '15%';
                fullscreenButton.style.height = '15%';
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