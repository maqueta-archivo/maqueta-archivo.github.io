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
        this.isPlaying = false;
        this.videoSrc = document.querySelector(this.data['videoSrc']);
        this.videoTarget = document.querySelector(this.data['videoTarget']);

        this.thumbnail = document.createElement('a-image');
        this.thumbnail.setAttribute('src', this.data['thumbnailSrc']);
        this.thumbnail.setAttribute('width', this.data['videoWidth']);
        this.thumbnail.setAttribute('height', this.data['videoHeight']);
        this.thumbnail.setAttribute('position', "0 0 0.01");
        this.thumbnail.setAttribute('visible', true);
        this.thumbnail.className = 'clickable';
        this.thumbnail.setAttribute('transparent', false);


        this.fullscreenButton = document.createElement('img');
        let fullscreenButtonSrc = document.querySelector(this.data['fullscreenButton']).getAttribute('src');
        let fullscreenButtonPressSrc = document.querySelector(this.data['fullscreenButtonPress']).getAttribute('src');
        this.fullscreenButton.setAttribute('src', fullscreenButtonSrc);
        this.fullscreenButton.style.zIndex = 9999;
        this.fullscreenButton.style.position = 'absolute';
        this.fullscreenButton.style.width = 'auto';
        this.fullscreenButton.style.height = '10%';
        this.fullscreenButton.style.top = '2%';
        this.fullscreenButton.style.left = '2%';
        this.fullscreenButton.classList.add("fullscreen");

        this.fullscreenButton.addEventListener("click", () => {

            this.pauseVideo();
            this.el.setAttribute('visible', false);
            this.fullscreenButton.hidden = true;

            let fullscreenVid = document.createElement('video');
            fullscreenVid.setAttribute('src', this.videoSrc.getAttribute('src'));
            fullscreenVid.setAttribute('controls', true);
            fullscreenVid.style.zIndex = 9998;
            fullscreenVid.style.position = 'absolute';
            if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                fullscreenVid.style.width = '85%';
                fullscreenVid.style.height = 'auto';
            } else {
                fullscreenVid.style.width = 'auto';
                fullscreenVid.style.height = '85%';
            }
            fullscreenVid.style.top = '50%';
            fullscreenVid.style.left = '50%';
            fullscreenVid.style.transform = 'translate(-50%, -50%)';
            fullscreenVid.classList.add("fullscreen");

            window.addEventListener("resize", () => {
                if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                    fullscreenVid.style.width = '85%';
                    fullscreenVid.style.height = 'auto';
                } else {
                    fullscreenVid.style.width = 'auto';
                    fullscreenVid.style.height = '85%';
                }
            });

            document.querySelector('body').appendChild(fullscreenVid);

            let fullscreenExit = document.createElement('img');
            let fullscreenExitSrc = document.querySelector(this.data['fullscreenExit']).getAttribute('src');
            let fullscreenExitPressSrc = document.querySelector(this.data['fullscreenExitPress']).getAttribute('src');
            fullscreenExit.setAttribute('src', fullscreenExitSrc);
            fullscreenExit.style.zIndex = 9999;
            fullscreenExit.style.position = 'absolute';
            fullscreenExit.style.width = 'auto';
            fullscreenExit.style.height = '10%';
            fullscreenExit.style.top = '2%';
            fullscreenExit.style.left = '2%';
            fullscreenExit.classList.add("fullscreen");

            document.querySelector('body').appendChild(fullscreenExit);


            fullscreenExit.addEventListener('click', () => {
                fullscreenVid.remove();
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                this.fullscreenButton.hidden = false;
                this.playVideo();
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