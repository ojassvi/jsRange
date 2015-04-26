(function () {
    'use strict';

    function Handle(element, parent, current) {
        this.handle = element;
        this.start = element.style.left.replace("px", "") || 0;
        this.move = this.start;

        var self = this,
            handleWidthHalf = Math.round(parseInt(window.getComputedStyle(element).width, 10) / 2),
            parentWidth = parseInt(window.getComputedStyle(parent).width, 10),
            other = (current === "left") ? "right" : "left",
            otherHandle = parent.querySelector("." + other + "-handle"),
            otherPos = otherHandle.style.left || 0;

        this.mousedown = function (e) {
            e.preventDefault();
            self.start = e.clientX - self.move;
            this.style.zIndex = 1;
            otherPos = otherHandle.style.left || 0;
            otherPos = parseInt(otherPos, 10);
            this.addEventListener('mousemove', self.mousemove);
            document.addEventListener('mouseup', self.mouseup);
        };

        this.mousemove = function (e) {
            e.preventDefault();
            self.move = e.clientX - self.start;
            if(self.move < -handleWidthHalf  || self.move > parentWidth) {
                return;
            }
            else if(current === 'left' && self.move > otherPos) {
                return;
            }
            else if(current === 'right' && self.move < otherPos) {
                return;
            }

            self.css({
                left:  self.move + 'px'
            });
        };

        this.mouseup = function (e) {
            e.preventDefault();
            self.handle.removeEventListener('mousemove', self.mousemove);
            document.removeEventListener('mouseup', self.mouseup);
            self.handle.style.zIndex = 0;
        };

        this.css = function(params) {
            for(var p in params) {
                this.handle.style[p] = params[p];
            }
        };

        this.handle.addEventListener('mousedown', this.mousedown);
    }

    /*jshint validthis:true */
    function jsRange(element, options) {
        // this.leftHandle = element.querySelector('.slider-handle.left-handle');
        // this.rightHandle = element.querySelector('.slider-handle.right-handle');

        var jsRangeWidth = window.getComputedStyle(element).width;
        element.querySelector('.slider-handle.right-handle').style.left = jsRangeWidth;

        var leftHandle = new Handle(element.querySelector('.slider-handle.left-handle'), element, 'left'),
            rightHandle = new Handle(element.querySelector('.slider-handle.right-handle'), element, 'right');


        // options = options || {};

        // var down = false,
        //     width = options.width || 10,
        //     prevEvt,
        //     left = this.leftHandle.style.left,
        //     leftWidth = this.leftHandle.style.width


    }

    window.jsRange = jsRange;
}());