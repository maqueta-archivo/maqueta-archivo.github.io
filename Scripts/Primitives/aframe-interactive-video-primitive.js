AFRAME.registerComponent('a-interactive-video-nested-elements-', {
    schema: {
        'videoTarget': { type: 'string' },
        'videoSrc': { type: 'string' },
        'videoWidth': { type: 'number' },
        'videoHeight': { type: 'number' },
        'thumbnailSrc': { type: 'string' },
        'playButtonSrc': { type: 'string' },
        'fullscreenButton': { type: 'string' },
        'fullscreenButtonPress': { type: 'string' },
        'fullscreenExit': { type: 'string' },
        'fullscreenExitPress': { type: 'string' }
    },
    init: function () {
        this.videoSrc = document.querySelector(this.data['videoSrc']);

        this.thumbnail = document.createElement('a-image');
        this.thumbnail.setAttribute('src', this.data['thumbnailSrc']);
        this.thumbnail.setAttribute('width', this.data['videoWidth']);
        this.thumbnail.setAttribute('height', this.data['videoHeight']);
        this.thumbnail.setAttribute('position', "0 0 0.01");
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
        this.thumbnail.setAttribute('transparent', false);

        this.isPlaying = false;
        this.videoTarget = document.querySelector(this.data['videoTarget']);

        this.playButton = document.createElement('a-image');
        this.playButton.setAttribute('src', this.data['playButtonSrc']);
        this.playButton.setAttribute('width', 0.25);
        this.playButton.setAttribute('height', 0.25);
        this.playButton.setAttribute('position', "0 0 0.01");
        this.playButton.setAttribute('opacity', 0.8);

        this.thumbnail.appendChild(this.playButton);
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
            this.isPlaying = true;
        });

        this.video.addEventListener('click', event => {
            this.pauseVideo();
            this.isPlaying = false;
        });

        this.videoTarget.addEventListener('targetFound', event => {
            var fullscreenElements = Array.from(document.getElementsByClassName("fullscreen"));
            for (let index = 0; index < fullscreenElements.length; index++) {
                fullscreenElements[index].remove();
            }
            this.el.setAttribute('visible', true);
            document.querySelector('body').appendChild(this.fullscreenButton);
            this.fullscreenButton.hidden = false;
            document.querySelector('body').appendChild(this.fullscreenButton);
            if (this.isPlaying) {
                this.playVideo();
            }
        });

        this.videoTarget.addEventListener('targetLost', event => {
            this.fullscreenButton.remove();
            this.videoSrc.pause();
        });

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

            this.pauseVideo();
            this.el.setAttribute('visible', false);
            this.fullscreenButton.hidden = true;

            this.fullscreenVid = document.createElement('video');
            this.fullscreenVid.setAttribute('src', this.videoSrc.getAttribute('src'));
            this.fullscreenVid.setAttribute('controls', true);
            this.fullscreenVid.style.zIndex = 9998;
            this.fullscreenVid.style.position = 'absolute';
            
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                this.fullscreenVid.style.width = '85%';
                this.fullscreenVid.style.height = 'auto';
            } else {
                this.fullscreenVid.style.width = 'auto';
                this.fullscreenVid.style.height = '85%';
            }
            this.fullscreenVid.style.top = '50%';
            this.fullscreenVid.style.left = '50%';
            this.fullscreenVid.style.transform = 'translate(-50%, -50%)';
            this.fullscreenVid.classList.add("fullscreen");

            window.addEventListener("resize", () => {
                if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                    this.fullscreenVid.style.width = '85%';
                    this.fullscreenVid.style.height = 'auto';
                } else {
                    this.fullscreenVid.style.width = 'auto';
                    this.fullscreenVid.style.height = '85%';
                }
            });

            document.querySelector('body').appendChild(this.fullscreenVid);

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
                this.fullscreenVid.remove();
                this.fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                this.fullscreenButton.hidden = false;
                this.playVideo();
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

    },
    playVideo: function () {
        this.thumbnail.setAttribute('visible', false);
        this.thumbnail.className = '';
        this.video.setAttribute('visible', true);
        this.video.className = 'clickable';
        this.videoSrc.play();
    },
    pauseVideo: function () {
        this.videoSrc.pause();
        this.video.setAttribute('visible', false);
        this.video.className = '';
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
    },
    changeSrc: function (element, src) {
        element.setAttribute('src', src);
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
        'fullscreen-button-press': 'a-interactive-video-nested-elements-.fullscreenButtonPress',
        'fullscreen-exit': 'a-interactive-video-nested-elements-.fullscreenExit',
        'fullscreen-exit-press': 'a-interactive-video-nested-elements-.fullscreenExitPress'
    }
});