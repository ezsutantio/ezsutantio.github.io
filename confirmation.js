// Extract the product name from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product');

// Display the product name on the page
if (productName) {
    document.getElementById('product-name').textContent = decodeURIComponent(productName);
} else {
    document.getElementById('product-name').textContent = "Unbekanntes Produkt";
}
