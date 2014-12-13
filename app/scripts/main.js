(function () {
    var doc = document,
        leftHandle = doc.querySelector(".slider-handle.left-handle"),
        rightHandle = doc.querySelector(".slider-handle.right-handle");

    console.log(leftHandle.nodeType);
    console.log(rightHandle.nodeType);

    var flag = 0,
        startFlag = 0;
    // var element = xxxx;
    leftHandle.addEventListener("mousedown", function(){
        flag = 0;
        startFlag = 1;
    }, false);
    leftHandle.addEventListener("mousemove", function(e){
        flag = 1;
        if(startFlag === 1) {
            console.log(e.clientX, e.clientX, e.movementX, e.movementY);
            var y = e.movementY;
            if(y > 0) {
                var left = leftHandle.style.left;

                if(left) {
                    left = left.replace("px", "");
                    left = parseInt(left, 10);
                }
                else {
                    left = 0;
                }

                left += y;
                left += "px";
                leftHandle.style.left = left;
            }
        }
    }, false);
    leftHandle.addEventListener("mouseup", function(){
        startFlag = 0;
        if(flag === 0) {
            console.log("click");
        }
        else if(flag === 1) {
            console.log("drag");
        }
    }, false);

}());