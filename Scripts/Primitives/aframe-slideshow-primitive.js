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
        'rightArrowSrc': { type: 'string' },
        'fullscreenButton': { type: 'string' },
        'fullscreenExit': { type: 'string' }
    },
    init: function () {
        this.current_slide_number = 0;
        this.slides = document.querySelector(this.data['slidesSrc']);
        this.current_slide = document.createElement('a-image');
        this.el.appendChild(this.current_slide);

        this.fullscreenButton_background = document.createElement('a-plane');
        this.fullscreenButton_background.setAttribute('material', 'visible: false');
        this.fullscreenButton_background.setAttribute('height', 0.2);
        this.fullscreenButton_background.setAttribute('width', 0.2);
        this.fullscreenButton_background.className = 'clickable';

        let fullscreenButton = document.createElement('a-image');
        fullscreenButton.setAttribute('src', this.data['fullscreenButton']);
        fullscreenButton.setAttribute('height', 0.125);
        fullscreenButton.setAttribute('width', 0.125);
        fullscreenButton.setAttribute('position', '0 0 0.01');

        this.fullscreenButton_background.appendChild(fullscreenButton);
        this.el.appendChild(this.fullscreenButton_background);


        this.fullscreenButton_background.addEventListener("click", () => {

            this.el.setAttribute('visible', false);

            let fullscreenImg = document.createElement('img');
            fullscreenImg.setAttribute('src', this.current_slide.getAttribute('src'));
            fullscreenImg.style.zIndex = 9998;
            fullscreenImg.style.position = 'absolute';
            fullscreenImg.style.width = 'auto';
            fullscreenImg.style.height = '95%';
            fullscreenImg.style.top = '50%';
            fullscreenImg.style.left = '50%';
            fullscreenImg.style.transform = 'translate(-50%, -50%)';

            document.querySelector('body').appendChild(fullscreenImg);

            let fullscreenExit = document.createElement('img');
            fullscreenExit.setAttribute('src', document.querySelector(this.data['fullscreenExit']).getAttribute('src'));
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            fullscreenExit.style.height = '5%';
            fullscreenExit.style.top = '3%';
            fullscreenExit.style.left = '1.5%';

            document.querySelector('body').appendChild(fullscreenExit);

            fullscreenExit.addEventListener('click', event => {
                fullscreenImg.remove();
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
            })
        });

        this.left_arrow_background = document.createElement('a-plane');
        this.left_arrow_background.setAttribute('material', 'visible: false');
        this.left_arrow_background.setAttribute('height', 0.2);
        this.left_arrow_background.className = 'clickable';

        let left_arrow = document.createElement('a-image');
        left_arrow.setAttribute('src', this.data['leftArrowSrc']);
        left_arrow.setAttribute('height', 0.125);
        left_arrow.setAttribute('width', 0.125);
        left_arrow.setAttribute('position', '0 0 0.01');
        this.left_arrow_background.appendChild(left_arrow);
        this.el.appendChild(this.left_arrow_background);

        this.left_arrow_background.addEventListener('click', () => { this.prev_slide(); });

        this.right_arrow_background = document.createElement('a-plane');
        this.right_arrow_background.setAttribute('material', 'visible: false');
        this.right_arrow_background.setAttribute('height', 0.2);
        this.right_arrow_background.className = 'clickable';

        let right_arrow = document.createElement('a-image');
        right_arrow.setAttribute('src', this.data['rightArrowSrc']);
        right_arrow.setAttribute('height', 0.125);
        right_arrow.setAttribute('width', 0.125);
        right_arrow.setAttribute('position', '0 0 0.01');
        this.right_arrow_background.appendChild(right_arrow);
        this.el.appendChild(this.right_arrow_background);

        this.right_arrow_background.addEventListener('click', () => { this.next_side(); });

        this.update_slide();

    },
    update_slide: function () {
        let new_img = this.slides.children[this.current_slide_number];
        this.current_slide.setAttribute('src', new_img.getAttribute('src'));
        this.current_slide.setAttribute('width', new_img.getAttribute('width'));
        this.current_slide.setAttribute('height', new_img.getAttribute('height'));

        this.left_arrow_background.setAttribute('width', new_img.getAttribute('width') / 2 - 0.05);
        this.left_arrow_background.setAttribute('position', (-new_img.getAttribute('width') / 4).toString() + ' -0.6 0.02');

        this.right_arrow_background.setAttribute('width', new_img.getAttribute('width') / 2 - 0.05);
        this.right_arrow_background.setAttribute('position', (new_img.getAttribute('width') / 4).toString() + ' -0.6 0.02');

        let new_pos_x = (new_img.getAttribute('width') / 2 + this.fullscreenButton_background.getAttribute('width') / 2 + 0.01).toString();
        let new_pos_y = (-(new_img.getAttribute('height') / 2 + this.fullscreenButton_background.getAttribute('height') / 2)).toString();
        this.fullscreenButton_background.setAttribute('position', new_pos_x + ' ' + new_pos_y + ' 0.01');
    },
    next_side: function () {
        this.current_slide_number = this.current_slide_number + 1;
        if (this.current_slide_number >= this.slides.children.length) {
            this.current_slide_number = 0;
        }
        this.update_slide();
    },
    prev_slide: function () {
        this.current_slide_number = this.current_slide_number - 1;
        if (this.current_slide_number < 0) {
            this.current_slide_number = this.slides.children.length - 1;
        }
        this.update_slide();
    }
});

AFRAME.registerPrimitive('a-interactive-slideshow', {
    defaultComponents: {
        'a-slideshow-nested-elements-': {}
    },

    mappings: {
        'slides-src': 'a-slideshow-nested-elements-.slidesSrc',
        'left-arrow-src': 'a-slideshow-nested-elements-.leftArrowSrc',
        'right-arrow-src': 'a-slideshow-nested-elements-.rightArrowSrc',
        'fullscreen-button': 'a-slideshow-nested-elements-.fullscreenButton',
        'fullscreen-exit': 'a-slideshow-nested-elements-.fullscreenExit'
    }
});