
var fg_exist = false;
var bg_exist = false;

function upload_img(id) {

    var input_file = document.getElementById(id);
    var img = new SimpleImage(input_file);

    if (id === "fg-img") {
        var canvas = document.getElementById("fg-canvas");
        fg_exist = true;
    }
    else {
        var canvas = document.getElementById("bg-canvas");
        bg_exist = true;
    }

    img.drawTo(canvas);
}


function composite(fg, bg) {
    let fg = document.getElementById(fg);
    let bg = document.getElementById(bg);

    if (fg_exist && bg_exist) {
        alert("exist!");
        var output = new SimpleImage(fg.width, fg.height);
        for (var pixel of fg.values()) {
            var x = pixel.getX();
            var y = pixel.getY();
            if (pass_threshold(pixel)) {
                var bg_pixel = bg.getPixel(x, y);
                output.setPixel(x, y, bg_pixel);
            }
            else {
                output.setPixel(x, y, pixel);
            }
        }
        alert("finish!")
    }
    else {
        alert("Please upload images first!")
    }
}

function pass_threshold(pixel) {
    const greenLower = 100;
    const redUpper = 100;
    const blueUpper = 100;
    if (pixel.getGreen() >= greenLower && pixel.getRed() <= redUpper && pixel.getBlue() <= blueUpper) {
        return true;
    }
    return false;
}

function clear_canvas() {
    for (let can of [document.getElementById("fg-canvas"), document.getElementById("bg-canvas"), document.getElementById("output-canvas")]) {
        let ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);

    }
    alert("clear")
    fg_exist = false;
    bg_exist = false;
}