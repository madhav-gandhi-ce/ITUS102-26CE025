"use strict";

// PRACTICAL 6: Asynchronous JavaScript, Fetch API and Browser Storage
// Keep simple statements on one line. Use multiple lines for functions and conditions.

// 1. TIMERS: setTimeout() works once; setInterval() repeats.
let messages = ["Explore Goa this weekend!", "Discover the royal city of Jaipur!", "Plan a trip to the mountains of Manali!"];
let messageNumber = 0;

setTimeout(function(){ document.getElementById("promoMessage").textContent = "Special Offer: Enjoy 10% OFF on selected demo packages!"; }, 3000);

let promoTimer = setInterval(function(){
    document.getElementById("timerResult").textContent = messages[messageNumber];
    messageNumber = (messageNumber + 1) % messages.length;
}, 5000);

document.getElementById("stopTimerBtn").addEventListener("click", function(){
    clearInterval(promoTimer);
    document.getElementById("timerResult").textContent = "Repeating promotional messages stopped.";
});

// 2. FETCH API: Read JSON file and display packages without reloading the page.
let allPackages = [];

function loadPackages(fileName){
    let status = document.getElementById("fetchStatus");
    status.textContent = "Loading packages...";
    status.className = "message";
    document.getElementById("packageList").replaceChildren();

    fetch(fileName).then(function(response){
        if(!response.ok) throw new Error("File not found (HTTP " + response.status + ")");
        return response.json();
    }).then(function(data){
        if(!Array.isArray(data)) throw new Error("JSON must contain a list of packages.");
        allPackages = data;
        fillDestinationOptions();
        showPackages();
        status.textContent = "Success! Loaded " + data.length + " packages using Fetch API.";
        status.className = "message success";
    }).catch(function(error){
        allPackages = [];
        status.textContent = "Error: " + error.message + ". Click Load Travel Packages to try again.";
        status.className = "message error";
    });
}

function fillDestinationOptions(){
    let select = document.getElementById("destinationFilter");
    let savedDestination = localStorage.getItem("wandergo_destination") || "all";
    select.replaceChildren();
    select.add(new Option("All Destinations", "all"));

    for(let i = 0; i < allPackages.length; i++){
        let destination = allPackages[i].destination;
        if(!Array.from(select.options).some(function(option){ return option.value === destination; })) select.add(new Option(destination, destination));
    }

    select.value = Array.from(select.options).some(function(option){ return option.value === savedDestination; }) ? savedDestination : "all";
    showLocalPreference();
}

function showPackages(){
    let container = document.getElementById("packageList");
    let selected = document.getElementById("destinationFilter").value;
    container.replaceChildren();
    let count = 0;

    for(let i = 0; i < allPackages.length; i++){
        let item = allPackages[i];
        if(selected !== "all" && item.destination !== selected) continue;
        let card = document.createElement("article");
        card.className = "travel-card";
        let icon = document.createElement("div"); icon.className = "travel-icon"; icon.textContent = item.icon;
        let title = document.createElement("h3"); title.textContent = item.title;
        let details = document.createElement("div"); details.className = "meta"; details.textContent = item.destination + " • " + item.days + " days";
        let description = document.createElement("p"); description.textContent = item.description;
        let price = document.createElement("div"); price.className = "price"; price.textContent = "₹" + Number(item.price).toLocaleString("en-IN") + " / person";
        card.append(icon, title, details, description, price);
        container.appendChild(card);
        count++;
    }

    if(count === 0) container.textContent = "No packages found for this destination.";
}

document.getElementById("loadBtn").addEventListener("click", function(){ loadPackages("packages.json"); });
document.getElementById("errorBtn").addEventListener("click", function(){ loadPackages("missing_packages.json"); });

// 3. CALLBACK: The callback runs only after the simulated request finishes.
function processTravelRequest(destination, callback){
    setTimeout(function(){ callback("Demo request for " + destination + " was processed successfully."); }, 1500);
}

document.getElementById("bookingBtn").addEventListener("click", function(){
    let button = this;
    let destination = document.getElementById("destinationFilter").value;
    if(destination === "all") destination = "Goa";
    button.disabled = true;
    document.getElementById("callbackResult").textContent = "Step 1: Request started... Step 2: Processing (1.5 seconds)...";

    processTravelRequest(destination, function(message){
        document.getElementById("callbackResult").textContent = "Step 3: Callback executed! " + message;
        button.disabled = false;
    });
});

// 4. LOCAL STORAGE: Remember preferred destination and theme after reload.
function showLocalPreference(){
    let destination = localStorage.getItem("wandergo_destination") || "All Destinations";
    let theme = localStorage.getItem("wandergo_theme") || "light";
    document.getElementById("localResult").textContent = "Saved destination: " + destination + " | Saved theme: " + theme;
}

document.getElementById("destinationFilter").addEventListener("change", function(){
    localStorage.setItem("wandergo_destination", this.value);
    showPackages();
    showLocalPreference();
});

document.getElementById("themeBtn").addEventListener("click", function(){
    document.body.classList.toggle("dark");
    localStorage.setItem("wandergo_theme", document.body.classList.contains("dark") ? "dark" : "light");
    showLocalPreference();
});

document.getElementById("clearLocalBtn").addEventListener("click", function(){
    localStorage.removeItem("wandergo_destination");
    localStorage.removeItem("wandergo_theme");
    document.body.classList.remove("dark");
    document.getElementById("destinationFilter").value = "all";
    showPackages();
    showLocalPreference();
});

// 5. SESSION STORAGE: Remember guest name in the current tab session.
function showSessionName(){
    let name = sessionStorage.getItem("wandergo_guest") || "";
    document.getElementById("sessionResult").textContent = name ? "Welcome, " + name + "! (Saved in Session Storage)" : "No temporary guest name is saved.";
    document.getElementById("guestName").value = name;
}

document.getElementById("saveSessionBtn").addEventListener("click", function(){
    let name = document.getElementById("guestName").value.trim();
    if(name === ""){ document.getElementById("sessionResult").textContent = "Please enter a guest name first."; return; }
    sessionStorage.setItem("wandergo_guest", name);
    showSessionName();
});

document.getElementById("clearSessionBtn").addEventListener("click", function(){
    sessionStorage.removeItem("wandergo_guest");
    showSessionName();
});

// Load saved preferences when the webpage opens.
if(localStorage.getItem("wandergo_theme") === "dark") document.body.classList.add("dark");
showLocalPreference();
showSessionName();
