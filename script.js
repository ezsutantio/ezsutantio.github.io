


document.addEventListener("DOMContentLoaded", function () {
    redStar();

    // Check if the 'kurzel' cookie exists and autofill the field
    const kurzelCookie = getCookie("kurzel");
    if (kurzelCookie) {
        console.log("Cookie found:", kurzelCookie); // Debugging
        document.querySelector('input[name="kurzel"]').value = kurzelCookie;
    } else {
        console.log("No 'kurzel' cookie found."); // Debugging
    }

    // Add event listener to the form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const kurzelValue = document.querySelector('input[name="kurzel"]').value;
        if (kurzelValue) {
            console.log("Setting cookie with value:", kurzelValue); // Debugging
            setCookie("kurzel", kurzelValue, 3); // Set cookie for 3 hours
        } else {
            console.log("No value in 'kurzel' field to set cookie."); // Debugging
        }

        // Submit the form manually after setting the cookie
        let formData = new FormData(this);
    
        try {
            let response = await fetch('https://script.google.com/macros/s/AKfycbzO1ylwkUFx0w0I0B-76MU33605QPP7Nby6NJEgaKn3yrOURhCj1CjSrC0qXzldbEPQ/exec', {
                method: 'POST',
                body: formData
            });
    
            let result = await response.text(); // Use .json() if returning JSON
            console.log('Server response:', result);
    
            // Optionally update the page
            window.location.href = `confirmation.html?product=${encodeURIComponent(document.querySelector('input[name="produkname"]').value)}&kleber=`+result+`&anzahl=${encodeURIComponent(document.querySelector('input[name="anzahl"]').value)}&seriennr=${encodeURIComponent(document.querySelector('input[name="seriennummer"]').value)}&mitarbeiter=${encodeURIComponent(document.querySelector('input[name="mitarbeiter"]').value)}`;

        } catch (error) {
            console.error('Error:', error);
        }        
        

    }
    );

    document.getElementById('template').addEventListener('change', fillTemplate);
});

function redStar() {
    document.body.innerHTML = document.body.innerHTML.replace(/\*/g, '<span style="color: red;">*</span>');
}

function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    console.log("Cookie set:", document.cookie); // Debugging
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }
    return null;
}

function fillTemplate() {
    const selectedTemplate = document.getElementById('template').value;
    const data = jsonData[selectedTemplate];

    if (data) {
        document.querySelector('input[name="produkname"]').value = data.produktname || '';
        document.querySelector('input[name="anzahl"]').value = data.Anzahl || '';
        document.querySelector('input[name="eigentum"]').value = data.eigentum || '';
        document.querySelector('input[name="kaufpreis"]').value = data.kaufpreis || '';
        document.querySelector('input[name="dguv"][value="Ja"]').checked = data.dguv === true;
        document.querySelector('input[name="dguv"][value="Nein"]').checked = data.dguv === false;
        document.querySelector('input[name="verwendung"][value="Ja"]').checked = data.verwendung === true;
        document.querySelector('input[name="verwendung"][value="Nein"]').checked = data.verwendung === false;
    }
}
function checkEnthaltenChange(){
    if (document.getElementById('enthaltencheck').checked){
        document.getElementById('enthaltenfield').disabled = false;
        document.getElementById('kaufpreis').disabled = true;
    }
    else{
        document.getElementById('enthaltenfield').disabled = true;
        document.getElementById('kaufpreis').disabled = false;
        document.getElementById('enthaltenfield').value = "";
    }
}



// Function to set a cookie
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}




const jsonData = {
    "Yubikey": {
        "produktname": "Yubikey 5 NFC",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 54.90,
        "dguv": false,
        "verwendung": false
    },
    "Docking": {
        "produktname": "ThinkPad Universal USB-C Docking Station",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 139.99,
        "dguv": false,
        "verwendung": false
    },
    "DockingPwr": {
        "produktname": "ThinkPad Universal USB-C Docking Station Netzteil 90 W",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": true,
        "dguv": true,
        "verwendung": false
    },
    "LG27Zoll": {
        "produktname": "LG 27BN55UP-B Monitor 27 Zoll",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 215.69,
        "dguv": false,
        "verwendung": false
    },
    "LGNetz": {
        "produktname": "LG BildschirmNetzteil",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": true,
        "dguv": true,
        "verwendung": false
    },
    "TransponderB": {
        "produktname": "Simons&Voss Transponder",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 39.90,
        "dguv": false,
        "verwendung": false
    },
    "TransponderS": {
        "produktname": "Simons&Voss Transponder (Socura)",
        "Anzahl": 1,
        "eigentum": "Socura",
        "kaufpreis": 0,
        "dguv": false,
        "verwendung": false
    },
    "AnkerCharger": {
        "produktname": "Anker 735 Charger (GaNPrime 65W)",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 54.99,
        "dguv": true,
        "verwendung": false
    },
    "LenovoT14": {
        "produktname": "Lenovo T14 G5 Laptop",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": 1041.69,
        "dguv": false,
        "verwendung": false
    },
    "LenovoT14Pwr": {
        "produktname": "Lenovo T14 G5 Laptop Netzteil",
        "Anzahl": 1,
        "eigentum": "bobbie",
        "kaufpreis": true,
        "dguv": true,
        "verwendung": false
    }
}
