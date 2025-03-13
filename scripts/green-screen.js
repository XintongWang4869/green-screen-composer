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


function resize(img_canvas, newWidth, newHeight) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img_canvas, 0, 0, newWidth, newHeight);
    let new_img = new SimpleImage(canvas);
    return new_img;
}

function composite() {
    // if (output) {
    //     alert("Please clear the images.")
    // }
    if (fg_img == null || bg_img == null) {
        alert("Please upload images first :)");
    }

    else {
        // resize the images:
        let fg_w = fg_img.getWidth();
        let fg_h = fg_img.getHeight();
        let bg_w = bg_img.getWidth();
        let bg_h = bg_img.getHeight();
        if (fg_w <= bg_w && fg_h <= bg_h) {
            // resize bg
            bg_img = resize(bg_canvas, fg_w, fg_h);
        }
        else if (fg_w > bg_w && fg_h > bg_h) {
            // resize fg
            fg_img = resize(fg_canvas, bg_w, bg_h);
        }

        else {
            alert("The uploaded images have very different size. Please try other images.")
        }

        // composite 
        output = new SimpleImage(fg_img.getWidth(), fg_img.getHeight());
        for (var pixel of fg_img.values()) {
            var x = pixel.getX();
            var y = pixel.getY();
            if (pass_green_threshold(pixel)) {
                var bg_pixel = bg_img.getPixel(x, y);
                output.setPixel(x, y, bg_pixel);
            }
            else {
                output.setPixel(x, y, pixel);
            }
        }
        output.drawTo(output_canvas)
        // alert("finish!");


    }


}

function pass_green_threshold(pixel) {

    if (pixel.getGreen() >= pixel.getRed() * 1.5 && pixel.getGreen() >= pixel.getBlue() * 1.25) {
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
    fg_img = null;
    bg_img = null;
    output = null;
    // alert("clear")
}

function download_output() {
    if (output == null) {
        alert("Let's create composite!")
    }
    else {
        let link = document.createElement("a");
        link.href = output_canvas.toDataURL("image/png");
        link.download = "composite.png";
        document.body.appendChild(link);
        link.click(); // Simulate a click to download
        document.body.removeChild(link);
        alert("Download successfully!")
    }
}