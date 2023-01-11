AFRAME.registerComponent('a-interactive-video-nested-elements-', {
    schema: {
        'videoTarget': { type: 'selector' },
        'videoSrc': { type: 'selector' },
        'videoWidth': { type: 'number' },
        'videoHeight': { type: 'number' },
        'thumbnailSrc': { type: 'string' },
        'playButtonSrc': { type: 'string' }
    },
    init: function () {
        this.is_playing = false;
        this.video_src = this.data['videoSrc'];
        this.video_target = this.data['videoTarget'];

        this.thumbnail = document.createElement('a-image');
        this.thumbnail.setAttribute('src', this.data['thumbnailSrc']);
        this.thumbnail.setAttribute('width', this.data['videoWidth']);
        this.thumbnail.setAttribute('height', this.data['videoHeight']);
        this.thumbnail.setAttribute('position', "0 0 0.01");
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
        this.thumbnail.setAttribute('transparent', false);

        this.play_button = document.createElement('a-image');
        this.play_button.setAttribute('src', this.data['playButtonSrc']);
        this.play_button.setAttribute('width', 0.25);
        this.play_button.setAttribute('height', 0.25);
        this.play_button.setAttribute('position', "0 0 0.01");
        this.play_button.setAttribute('opacity', 0.5);

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
        'play-button-src': 'a-interactive-video-nested-elements-.playButtonSrc'

    }
});