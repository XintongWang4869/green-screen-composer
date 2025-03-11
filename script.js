var fg_img = null;
var bg_img = null;
var output = null;

var fg_canvas = document.getElementById("fg-canvas");
var bg_canvas = document.getElementById("bg-canvas");
var output_canvas = document.getElementById("output-canvas");


function upload_img(id) {
    // alert('ran upload_img');
    
    if (id === "fg-img") {
        // alert("fg loading...");
        
        fg_img = new SimpleImage(document.getElementById("fg-img"));
        fg_img.drawTo(fg_canvas);
        // alert("fg loaded");
    }
    if (id === "bg-img") {
        bg_img = new SimpleImage(document.getElementById("bg-img"));
        bg_img.drawTo(bg_canvas);       
    }

}


function composite() {
    if (output) {
        alert("Please clear the images.")
    }
    if (fg_img && bg_img) {
        // alert("images exist!");
        var output = new SimpleImage(fg_img.getWidth(), fg_img.getHeight());
        for (var pixel of fg_img.values()) {
            var x = pixel.getX();
            var y = pixel.getY();
            if (pass_green_threshold(pixel)) {
                var bg_pixel = bg_img.getPixel(x, y);
                // todo: fg and bg size should be similar
                output.setPixel(x, y, bg_pixel);
            }
            else {
                output.setPixel(x, y, pixel);
            }
        }
        output.drawTo(output_canvas)
        // alert("finish!");
    }
    else {
        alert("Please upload images first!");
    }
}

function pass_green_threshold(pixel) {

    if (pixel.getGreen() >= pixel.getRed()*1.5 &&  pixel.getGreen() >= pixel.getBlue()*1.25) {
        return true;
    }
    return false;
}


// todo: clear canvas automatically
function clear_canvas() {
    for (let can of [fg_canvas, bg_canvas, output_canvas]) {
        let ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);

    }
    var fg_img = null;
    var bg_img = null;
    var output = null;
    // alert("clear")

}