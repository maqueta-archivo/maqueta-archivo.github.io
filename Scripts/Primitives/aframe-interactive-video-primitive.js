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

        isPlaying = false;
        videoTarget = document.querySelector(this.data['videoTarget']);

        playButton = document.createElement('a-image');
        playButton.setAttribute('src', this.data['playButtonSrc']);
        playButton.setAttribute('width', 0.25);
        playButton.setAttribute('height', 0.25);
        playButton.setAttribute('position', "0 0 0.01");
        playButton.setAttribute('opacity', 0.8);

        this.thumbnail.appendChild(playButton);
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
            isPlaying = true;
        });

        this.video.addEventListener('click', event => {
            this.pauseVideo();
            isPlaying = false;
        });

        videoTarget.addEventListener('targetFound', event => {
            var fullscreenElements = Array.from(document.getElementsByClassName("fullscreen"));
            for (let index = 0; index < fullscreenElements.length; index++) {
                fullscreenElements[index].remove();
            }
            this.el.setAttribute('visible', true);
            document.querySelector('body').appendChild(fullscreenButton);
            fullscreenButton.hidden = false;
            document.querySelector('body').appendChild(fullscreenButton);
            if (isPlaying) {
                this.playVideo();
            }
        });

        videoTarget.addEventListener('targetLost', event => {
            fullscreenButton.remove();
            this.videoSrc.pause();
        });

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

            this.pauseVideo();
            this.el.setAttribute('visible', false);
            fullscreenButton.hidden = true;

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
                fullscreenVid.remove();
                fullscreenExit.remove();
                this.el.setAttribute('visible', true);
                fullscreenButton.hidden = false;
                this.playVideo();
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