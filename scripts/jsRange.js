(function () {
    'use strict';

    function Handle(element) {
        this.handle = element;
        this.start = element.style.left.replace("px", "") || 0;
        this.move = this.start;
        var self = this;

        this.mousedown = function (e) {
            e.preventDefault();
            self.start = e.pageX - self.move;
            this.addEventListener('mousemove', self.mousemove);
            document.addEventListener('mouseup', self.mouseup);
        };

        this.mousemove = function (e) {
            e.preventDefault();
            self.move = e.pageX - self.start;
            self.css({
                left:  self.move + 'px'
            });
        };

        this.mouseup = function (e) {
            e.preventDefault();
            console.log("yo", this);
            self.handle.removeEventListener('mousemove', self.mousemove);
            document.removeEventListener('mouseup', self.mouseup);
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

        var leftHandle = new Handle(element.querySelector('.slider-handle.left-handle')),
            rightHandle = new Handle(element.querySelector('.slider-handle.right-handle'));


        // options = options || {};

        // var down = false,
        //     width = options.width || 10,
        //     prevEvt,
        //     left = this.leftHandle.style.left,
        //     leftWidth = this.leftHandle.style.width,
        //     rangeWidth,
        //     rangeLeft;

        // var startX = 0, startY = 0, x = 0, y = 0;

        // this.leftHandle.addEventListener('mousedown', function(e) {
        //     // rangeWidth = this.offsetWidth;
        //     // rangeLeft = this.offsetLeft;
        //     // down = true;
        //     // console.log(rangeLeft, rangeWidth);
        //     // console.log(e.pageX);
        //     console.log(this);
        //     console.log(e.pageX, x);
        //     startX = e.pageX - x;
        //     // startY = event.pageY - y;
        //     this.leftHandle.addEventListener('mousemove', this.mousemove);
        //     this.leftHandle.addEventListener('mouseup', this.mouseup);

        //     // updateDragger(e);
        //     // return false;
        // }, false);

        // var leftHandle = this.leftHandle,
        //     rightHandle = this.rightHandle;

        // function mousemove(e) {
        //     x = e.pageX - startX;
        //     css({
        //         left:  x + 'px'
        //     });
        // }

        // function mousedown(e) {
        //     startX = e.pageX - x;
        //     leftHandle.addEventListener('mousemove', mousemove);
        //     leftHandle.addEventListener('mouseup', mouseup);
        // }


        // leftHandle.addEventListener('mousedown', mousedown);


        // function mouseup() {
        //     leftHandle.removeEventListener('mousemove', mousemove);
        //     leftHandle.removeEventListener('mouseup', mouseup);
        // }

        // function css(params) {
        //     for(var p in params) {
        //         leftHandle.style[p] = params[p];
        //     }
        // }

        // function updateDragger(e) {
        //     if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
        //         console.log("yo");
        //         this.leftHandle.style.left = e.pageX - rangeLeft - leftWidth + 'px';
        //         if (typeof options.onDrag === "function") {
        //             options.onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
        //         }
        //     }
        // }
    }

    window.jsRange = jsRange;
}());