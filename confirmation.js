// Extract the product name from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product');

// Display the product name on the page
document.getElementById('produkname').textContent = decodeURIComponent(urlParams.get('product'));
document.getElementById('anzahl').textContent = decodeURIComponent(urlParams.get('anzahl'));
document.getElementById('kleber').textContent = decodeURIComponent(urlParams.get('kleber'));
document.getElementById('seriennr').textContent = decodeURIComponent(urlParams.get('seriennr'));
document.getElementById('mitarbeiter').textContent = decodeURIComponent(urlParams.get('mitarbeiter'));
