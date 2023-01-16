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

        this.fullscreenButtonBackground = document.createElement('a-plane');
        this.fullscreenButtonBackground.setAttribute('material', 'visible: false');
        this.fullscreenButtonBackground.setAttribute('height', 0.2);
        this.fullscreenButtonBackground.setAttribute('width', 0.2);
        this.fullscreenButtonBackground.className = 'clickable';

        let fullscreenButton = document.createElement('a-image');
        fullscreenButton.setAttribute('src', this.data['fullscreenButton']);
        fullscreenButton.setAttribute('height', 0.125);
        fullscreenButton.setAttribute('width', 0.125);
        fullscreenButton.setAttribute('position', '0 0 0.01');

        this.fullscreenButtonBackground.appendChild(fullscreenButton);
        this.el.appendChild(this.fullscreenButtonBackground);


        this.fullscreenButtonBackground.addEventListener("click", () => {

            this.el.setAttribute('visible', false);

            let fullscreenImg = document.createElement('img');
            fullscreenImg.setAttribute('src', this.currentSlide.getAttribute('src'));
            fullscreenImg.style.zIndex = 9998;
            fullscreenImg.style.position = 'absolute';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                fullscreenImg.style.width = '95%';
                fullscreenImg.style.height = 'auto';
            } else {
                fullscreenImg.style.width = 'auto';
                fullscreenImg.style.height = '95%';
            }
            fullscreenImg.style.top = '50%';
            fullscreenImg.style.left = '50%';
            fullscreenImg.style.transform = 'translate(-50%, -50%)';

            window.addEventListener("resize", () => {
                if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                    fullscreenImg.style.width = '95%';
                    fullscreenImg.style.height = 'auto';
                } else {
                    fullscreenImg.style.width = 'auto';
                    fullscreenImg.style.height = '95%';
                }
            });
            this.fullscreenButtonBackground.addEventListener('mouseup', () => { fullscreenButton.setAttribute('src', this.data['fullscreenButton']); });
            this.fullscreenButtonBackground.addEventListener('mousedown', () => { fullscreenButton.setAttribute('src', this.data['fullscreenButtonPress']); });

            document.querySelector('body').appendChild(fullscreenImg);

            let fullscreenExit = document.createElement('img');
            fullscreenExit.setAttribute('src', document.querySelector(this.data['fullscreenExit']).getAttribute('src'));
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            fullscreenExit.style.height = '9%';
            fullscreenExit.style.top = '2%';
            fullscreenExit.style.left = '2%';

            document.querySelector('body').appendChild(fullscreenExit);

            fullscreenExit.addEventListener('mouseup', () => {
                fullscreenExit.setAttribute('src', document.querySelector(this.data['fullscreenExit']).getAttribute('src')); fullscreenImg.remove();
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
            });
            fullscreenExit.addEventListener('mousedown', () => { fullscreenExit.setAttribute('src', document.querySelector(this.data['fullscreenExitPress']).getAttribute('src')); });

        });

        this.leftArrowBackground = document.createElement('a-plane');
        this.leftArrowBackground.setAttribute('material', 'visible: false');
        this.leftArrowBackground.setAttribute('height', 0.2);
        this.leftArrowBackground.className = 'clickable';

        let leftArrow = document.createElement('a-image');
        leftArrow.setAttribute('src', this.data['leftArrowSrc']);
        leftArrow.setAttribute('height', 0.125);
        leftArrow.setAttribute('width', 0.125);
        leftArrow.setAttribute('position', '0 0 0.01');
        this.leftArrowBackground.appendChild(leftArrow);
        this.el.appendChild(this.leftArrowBackground);

        this.leftArrowBackground.addEventListener('click', () => { this.prevSlide(); });
        this.leftArrowBackground.addEventListener('mouseup', () => { leftArrow.setAttribute('src', this.data['leftArrowSrc']); });
        this.leftArrowBackground.addEventListener('mousedown', () => { leftArrow.setAttribute('src', this.data['leftArrowPressSrc']); });

        this.rightArrowBackground = document.createElement('a-plane');
        this.rightArrowBackground.setAttribute('material', 'visible: false');
        this.rightArrowBackground.setAttribute('height', 0.2);
        this.rightArrowBackground.className = 'clickable';

        let rightArrow = document.createElement('a-image');
        rightArrow.setAttribute('src', this.data['rightArrowSrc']);
        rightArrow.setAttribute('height', 0.125);
        rightArrow.setAttribute('width', 0.125);
        rightArrow.setAttribute('position', '0 0 0.01');
        this.rightArrowBackground.appendChild(rightArrow);
        this.el.appendChild(this.rightArrowBackground);

        this.rightArrowBackground.addEventListener('click', () => { this.nextSide(); });
        this.rightArrowBackground.addEventListener('mouseup', () => { rightArrow.setAttribute('src', this.data['rightArrowSrc']); });
        this.rightArrowBackground.addEventListener('mousedown', () => { rightArrow.setAttribute('src', this.data['rightArrowPressSrc']); });

        this.updateSlide();

    },
    updateSlide: function () {
        let newImg = this.slides.children[this.currentSlideNumber];
        this.currentSlide.setAttribute('src', newImg.getAttribute('src'));
        this.currentSlide.setAttribute('width', newImg.getAttribute('width'));
        this.currentSlide.setAttribute('height', newImg.getAttribute('height'));

        this.leftArrowBackground.setAttribute('width', newImg.getAttribute('width') / 2 - 0.05);
        this.leftArrowBackground.setAttribute('position', (-newImg.getAttribute('width') / 4).toString() + ' -0.6 0.02');

        this.rightArrowBackground.setAttribute('width', newImg.getAttribute('width') / 2 - 0.05);
        this.rightArrowBackground.setAttribute('position', (newImg.getAttribute('width') / 4).toString() + ' -0.6 0.02');

        let newPosX = (newImg.getAttribute('width') / 2 + this.fullscreenButtonBackground.getAttribute('width') / 2 + 0.01).toString();
        let newPosY = (-(newImg.getAttribute('height') / 2 + this.fullscreenButtonBackground.getAttribute('height') / 2)).toString();
        this.fullscreenButtonBackground.setAttribute('position', newPosX + ' ' + newPosY + ' 0.01');
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
    }
});

AFRAME.registerPrimitive('a-interactive-slideshow', {
    defaultComponents: {
        'a-slideshow-nested-elements-': {}
    },

    mappings: {
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