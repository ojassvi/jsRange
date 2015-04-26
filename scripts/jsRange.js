(function () {
    'use strict';

    /*jshint validthis:true */
    function jsRange(element, options) {
        this.leftHandle = element.querySelector('.slider-handle.left-handle');
        this.rightHandle = element.querySelector('.slider-handle.right-handle');

        options = options || {};

        var down = false,
            width = options.width || 10,
            prevEvt,
            left = this.leftHandle.style.left,
            leftWidth = this.leftHandle.style.width,
            rangeWidth,
            rangeLeft;

        var startX = 0, startY = 0, x = 0, y = 0;

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

        var leftHandle = this.leftHandle,
            rightHandle = this.rightHandle;

        function mousemove(e) {
            // console.log(this);
            // y = e.pageY - startY;
            x = e.pageX - startX;
            css({
                // top: y + 'px',
                left:  x + 'px'
            });
        }

        function mousedown(e) {
            startX = e.pageX - x;
            leftHandle.addEventListener('mousemove', mousemove);
            leftHandle.addEventListener('mouseup', mouseup);
            leftHandle.addEventListener('mouseout', mouseup);
        }


        leftHandle.addEventListener('mousedown', mousedown);


        function mouseup() {
            console.log("in");
            leftHandle.removeEventListener('mousemove', mousemove);
            leftHandle.removeEventListener('mouseup', mouseup);
        }

        function css(params) {
            for(var p in params) {
                leftHandle.style[p] = params[p];
            }
        }

        // this.leftHandle.addEventListener('mousemove', function(e) {
        //     // if(down) {
        //     //     console.log(this.offsetWidth, this.offsetLeft);
        //     //     // console.log(e.clientX, e.clientX, e.movementX, e.movementY);
        //     //     var prevY = prevEvt ? prevEvt.screenY : 0;
        //     //     // console.log(e.screenY, prevY);
        //     //     var y = e.screenY - prevY;

        //     //     // console.log(y);
        //     //     if(y > 0) {
        //     //         if(left) {
        //     //             left = left.replace('px', '');
        //     //             left = parseInt(left, 10);
        //     //         }
        //     //         else {
        //     //             left = 0;
        //     //         }

        //     //         left += 1;
        //     //         left += 'px';
        //     //         this.style.left = left;
        //     //     }
        //     // }

        //     updateDragger(e);
        // }, false);

        // this.leftHandle.addEventListener('mouseup', function(e) {
        //     down = false;
        // }, false);

        function updateDragger(e) {
            console.log(e);
            if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
                console.log("yo");
                this.leftHandle.style.left = e.pageX - rangeLeft - leftWidth + 'px';
                if (typeof options.onDrag === "function") {
                    options.onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
                }
            }
        }
    }

    window.jsRange = jsRange;
}());