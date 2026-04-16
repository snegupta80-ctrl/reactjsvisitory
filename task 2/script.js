function calculateGST(price) {
    return price * 0.18; // assuming 18% GST
}

document.getElementById("btn").addEventListener("click", function () {
    let price = Number(document.getElementById("price").value);
    let gst = calculateGST(price);

    document.getElementById("result").innerText =
        "Total price: " + (price + gst);
});