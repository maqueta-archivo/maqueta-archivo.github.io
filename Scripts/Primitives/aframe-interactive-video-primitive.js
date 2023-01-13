AFRAME.registerComponent('a-interactive-video-nested-elements-', {
    schema: {
        'videoTarget': { type: 'string' },
        'videoSrc': { type: 'string' },
        'videoWidth': { type: 'number' },
        'videoHeight': { type: 'number' },
        'thumbnailSrc': { type: 'string' },
        'playButtonSrc': { type: 'string' },
        'fullscreenButton': { type: 'string' },
        'fullscreenExit': { type: 'string' }
    },
    init: function () {
        this.is_playing = false;
        this.video_src = document.querySelector(this.data['videoSrc']);
        this.video_target = document.querySelector(this.data['videoTarget']);

        this.thumbnail = document.createElement('a-image');
        this.thumbnail.setAttribute('src', this.data['thumbnailSrc']);
        this.thumbnail.setAttribute('width', this.data['videoWidth']);
        this.thumbnail.setAttribute('height', this.data['videoHeight']);
        this.thumbnail.setAttribute('position', "0 0 0.01");
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
        this.thumbnail.setAttribute('transparent', false);


        this.fullscreenButton_background = document.createElement('a-plane');
        this.fullscreenButton_background.setAttribute('material', 'visible: false');
        this.fullscreenButton_background.setAttribute('height', 0.2);
        this.fullscreenButton_background.setAttribute('width', 0.2);
        let new_pos_x = (this.data['videoWidth'] / 2 + this.fullscreenButton_background.getAttribute('width') / 2 + 0.01).toString();
        let new_pos_y = (-(this.data['videoHeight'] / 2 + this.fullscreenButton_background.getAttribute('height') / 2 + 0.01)).toString();
        this.fullscreenButton_background.setAttribute('position', new_pos_x + ' ' + new_pos_y + ' 0.01');
        this.fullscreenButton_background.className = 'clickable';

        let fullscreenButton = document.createElement('a-image');
        fullscreenButton.setAttribute('src', this.data['fullscreenButton']);
        fullscreenButton.setAttribute('height', 0.125);
        fullscreenButton.setAttribute('width', 0.125);
        fullscreenButton.setAttribute('position', '0 0 0.01');

        this.fullscreenButton_background.appendChild(fullscreenButton);
        this.el.appendChild(this.fullscreenButton_background);

        this.fullscreenButton_background.addEventListener("click", () => {
            
            this.pauseVideo();
            this.el.setAttribute('visible', false);

            let fullscreenVid = document.createElement('video');
            fullscreenVid.setAttribute('src', this.video_src.getAttribute('src'));
            fullscreenVid.setAttribute('controls', true);
            fullscreenVid.style.zIndex = 9998;
            fullscreenVid.style.position = 'absolute';
            if(document.documentElement.clientHeight > document.documentElement.clientWidth){
                fullscreenVid.style.width = '95%';
                fullscreenVid.style.height = 'auto';
            }else{
                fullscreenVid.style.width = 'auto';
                fullscreenVid.style.height = '95%';
            }
            fullscreenVid.style.top = '50%';
            fullscreenVid.style.left = '50%';
            fullscreenVid.style.transform = 'translate(-50%, -50%)';

            document.querySelector('body').appendChild(fullscreenVid);

            let fullscreenExit = document.createElement('img');
            fullscreenExit.setAttribute('src', document.querySelector(this.data['fullscreenExit']).getAttribute('src'));
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            fullscreenExit.style.height = '9%';
            fullscreenExit.style.top = '2%';
            fullscreenExit.style.left = '1%';

            document.querySelector('body').appendChild(fullscreenExit);

            fullscreenExit.addEventListener('click', event => {
                fullscreenVid.remove();
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
            })

        });

        this.play_button = document.createElement('a-image');
        this.play_button.setAttribute('src', this.data['playButtonSrc']);
        this.play_button.setAttribute('width', 0.25);
        this.play_button.setAttribute('height', 0.25);
        this.play_button.setAttribute('position', "0 0 0.01");
        this.play_button.setAttribute('opacity', 0.8);

        this.thumbnail.appendChild(this.play_button);
        this.el.appendChild(this.thumbnail);

        this.video = document.createElement('a-video');
        this.video.setAttribute('src', this.data['videoSrc']);
        this.video.setAttribute('width', this.data['videoWidth']);
        this.video.setAttribute('height', this.data['videoHeight']);
        this.video.setAttribute('position', "0 0 0.02");
        this.video.setAttribute('visible', false);

        this.el.appendChild(this.video);

        this.thumbnail.addEventListener('click', event => {
            this.playVideo();
            this.is_playing = true;
        });

        this.video.addEventListener('click', event => {
            this.pauseVideo();
            this.is_playing = false;
        });

        this.video_target.addEventListener('targetFound', event => {
            if (this.is_playing) {
                this.playVideo();
            }
        });

        this.video_target.addEventListener('targetLost', event => {
            this.video_src.pause();
        });

    },
    playVideo: function () {
        this.thumbnail.setAttribute('visible', false);
        this.thumbnail.className = '';
        this.video.setAttribute('visible', true);
        this.video.className = 'clickable';
        this.video_src.play();
    },
    pauseVideo: function () {
        this.video_src.pause();
        this.video.setAttribute('visible', false);
        this.video.className = '';
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
    }
});

AFRAME.registerPrimitive('a-interactive-video', {
    defaultComponents: {
        'a-interactive-video-nested-elements-': {}
    },

    mappings: {
        'video-target': 'a-interactive-video-nested-elements-.videoTarget',
        'video-src': 'a-interactive-video-nested-elements-.videoSrc',
        'video-width': 'a-interactive-video-nested-elements-.videoWidth',
        'video-height': 'a-interactive-video-nested-elements-.videoHeight',
        'thumbnail-src': 'a-interactive-video-nested-elements-.thumbnailSrc',
        'play-button-src': 'a-interactive-video-nested-elements-.playButtonSrc',
        'fullscreen-button': 'a-interactive-video-nested-elements-.fullscreenButton',
        'fullscreen-exit': 'a-interactive-video-nested-elements-.fullscreenExit'
    }
});