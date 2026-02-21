const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encodeText() {
    let input = document.getElementById("input").value;
    let str = unescape(encodeURIComponent(input));
    let output = "";
    let i = 0;

    while (i < str.length) {
        let c1 = str.charCodeAt(i++);
        let c2 = str.charCodeAt(i++);
        let c3 = str.charCodeAt(i++);

        let e1 = c1 >> 2;
        let e2 = ((c1 & 3) << 4) | (c2 >> 4);
        let e3 = ((c2 & 15) << 2) | (c3 >> 6);
        let e4 = c3 & 63;

        if (isNaN(c2)) {
            e3 = e4 = 64;
        } else if (isNaN(c3)) {
            e4 = 64;
        }

        output += chars[e1] + chars[e2] + chars[e3] + chars[e4];
    }

    document.getElementById("output").value = output;
}

function decodeText() {
    let input = document.getElementById("input").value.replace(/[^A-Za-z0-9+/=]/g, "");
    let output = "";
    let i = 0;

    while (i < input.length) {
        let e1 = chars.indexOf(input.charAt(i++));
        let e2 = chars.indexOf(input.charAt(i++));
        let e3 = chars.indexOf(input.charAt(i++));
        let e4 = chars.indexOf(input.charAt(i++));

        let c1 = (e1 << 2) | (e2 >> 4);
        let c2 = ((e2 & 15) << 4) | (e3 >> 2);
        let c3 = ((e3 & 3) << 6) | e4;

        output += String.fromCharCode(c1);

        if (e3 != 64) {
            output += String.fromCharCode(c2);
        }
        if (e4 != 64) {
            output += String.fromCharCode(c3);
        }
    }

    document.getElementById("output").value = decodeURIComponent(escape(output));
}

function clearText() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
}