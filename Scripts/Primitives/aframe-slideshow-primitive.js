AFRAME.registerPrimitive('a-slideshow-images', {
    defaultComponents: {},
    mappings: {}
});

AFRAME.registerComponent('a-slideshow-nested-elements-', {
    schema: {
        'slidesSrc': { type: 'string' },
        'leftArrowSrc': { type: 'string' },
        'rightArrowSrc': { type: 'string' }
    },
    init: function () {
        this.current_slide_number = 0;
        this.slides = document.querySelector(this.data['slidesSrc']);
        this.current_slide = document.createElement('a-image');
        this.el.appendChild(this.current_slide);

        this.left_arrow_background = document.createElement('a-plane');
        this.left_arrow_background.setAttribute('material', 'visible: false');
        this.left_arrow_background.setAttribute('height', 0.25);
        this.left_arrow_background.className = 'clickable';

        let left_arrow = document.createElement('a-image');
        left_arrow.setAttribute('src', this.data['leftArrowSrc']);
        left_arrow.setAttribute('height', 0.25);
        left_arrow.setAttribute('width', 0.125);
        left_arrow.setAttribute('position', '0 0 0.1');
        this.left_arrow_background.appendChild(left_arrow);
        this.el.appendChild(this.left_arrow_background);

        this.left_arrow_background.addEventListener('click', () => { this.prev_slide(); });

        this.right_arrow_background = document.createElement('a-plane');
        this.right_arrow_background.setAttribute('material', 'visible: false');
        this.right_arrow_background.setAttribute('height', 0.25);
        this.right_arrow_background.className = 'clickable';

        let right_arrow = document.createElement('a-image');
        right_arrow.setAttribute('src', this.data['rightArrowSrc']);
        right_arrow.setAttribute('height', 0.25);
        right_arrow.setAttribute('width', 0.125);
        right_arrow.setAttribute('position', '0 0 0.1');
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

        this.left_arrow_background.setAttribute('width', new_img.getAttribute('width') / 2);
        this.left_arrow_background.setAttribute('position', (-new_img.getAttribute('width') / 4).toString() + ' -0.65 0.02');

        this.right_arrow_background.setAttribute('width', new_img.getAttribute('width') / 2);
        this.right_arrow_background.setAttribute('position', (new_img.getAttribute('width') / 4).toString() + ' -0.65 0.02');
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
        'right-arrow-src': 'a-slideshow-nested-elements-.rightArrowSrc'
    }
});