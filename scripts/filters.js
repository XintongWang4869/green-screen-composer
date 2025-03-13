
let base_img = null

function upload_img() {
    alert('ran upload_img');
    base_img = new SimpleImage(document.getElementById("base_img"));
    base_img.drawTo(document.getElementById("base-canvas"));
    alert("Loaded");
}


function filter(color) {
    if (base_img == null) {
        alert("Please upload images first :)");
    }
    else {
        let output = new SimpleImage(base_img.getWidth(), base_img.getHeight());
        let canvas = document.getElementById("output-canvas");
        let width = base_img.getWidth();
        let height = base_img.getHeight();
        alert("start to apply filter!")
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let pixel = base_img.getPixel(x, y);
                let red, green, blue;

                if (color === 'gray') {

                    let { red: newRed, green: newGreen, blue: newBlue } = gray_filter(pixel.getRed(), pixel.getGreen(), pixel.getBlue());
                    red = newRed;
                    green = newGreen;
                    blue = newBlue;
                }

                let outputPixel = output.getPixel(x, y);
                outputPixel.setRed(red);
                outputPixel.setGreen(green);
                outputPixel.setBlue(blue);

            }
        }
        alert("finished")
        output.drawTo(canvas);
    }
}


function gray_filter(r, g, b) {
    let value = (r + g + b) / 3;

    return { red: value, green: value, blue: value };
}



function clear_canvas() {
    for (let can of [document.getElementById("base-canvas"), document.getElementById("output-canvas")]) {
        let ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);

    }

    base_img = null;
}