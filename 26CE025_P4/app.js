
"use strict";

// 1. Selecting HTML Elements
document.getElementById("selectBtn").addEventListener("click", function() {

    let byId = document.getElementById("selectMessage");

    let byClass = document.getElementsByClassName("demoClass");

    let byTag = document.getElementsByTagName("p");

    let firstBox = document.querySelector(".box");

    let allBoxes = document.querySelectorAll(".box");

    document.getElementById("selectOutput").innerHTML =
        "getElementById(): " + byId.innerHTML +
        "<br>getElementsByClassName(): " + byClass.length + " elements" +
        "<br>getElementsByTagName(): " + byTag.length + " paragraphs" +
        "<br>querySelector(): " + firstBox.tagName +
        "<br>querySelectorAll(): " + allBoxes.length + " boxes";

});


// 2. Change Content
document.getElementById("contentBtn").addEventListener("click", function() {

    document.getElementById("changeText").innerHTML =
        "New message: Special offer available!";

});


// Change Attribute
document.getElementById("attributeBtn").addEventListener("click", function() {

    let link = document.getElementById("shopLink");

    link.setAttribute("href", "https://www.google.com");

    link.innerHTML = "Open Google";

});


// Change Style
document.getElementById("styleBtn").addEventListener("click", function() {

    let text = document.getElementById("changeText");

    text.style.color = "blue";

    text.style.fontWeight = "bold";

});


// 3. Create and Append
document.getElementById("addBtn").addEventListener("click", function() {

    let newItem = document.createElement("li");

    newItem.innerHTML = "Headphones";

    document.getElementById("productList").appendChild(newItem);

});


// Replace
document.getElementById("replaceBtn").addEventListener("click", function() {

    let list = document.getElementById("productList");

    if (list.children.length === 0) {
        return;
    }

    let newItem = document.createElement("li");

    newItem.innerHTML = "Smart Watch";

    list.replaceChild(newItem, list.children[0]);

});


// Remove
document.getElementById("removeBtn").addEventListener("click", function() {

    let list = document.getElementById("productList");

    if (list.children.length === 0) {
        return;
    }

    list.removeChild(list.lastElementChild);

});


// 4. Click Event
document.getElementById("clickBtn").addEventListener("click", function() {

    document.getElementById("clickOutput").innerHTML =
        "Button was clicked.";

});


// Double-Click Event
document.getElementById("doubleBtn").addEventListener("dblclick", function() {

    document.getElementById("clickOutput").innerHTML =
        "Button was double-clicked.";

});


// 5. Mouse Events
document.getElementById("mouseBox").addEventListener("mouseover", function() {

    document.getElementById("mouseOutput").innerHTML =
        "Mouse entered the box.";

    this.classList.add("highlight");

});


document.getElementById("mouseBox").addEventListener("mouseout", function() {

    document.getElementById("mouseOutput").innerHTML =
        "Mouse left the box.";

    this.classList.remove("highlight");

});


// 6. Keyboard Events
document.getElementById("nameInput").addEventListener("keydown", function(event) {

    document.getElementById("keyOutput").innerHTML =
        "Key down: " + event.key;

});


document.getElementById("nameInput").addEventListener("keyup", function() {

    document.getElementById("keyOutput").innerHTML =
        "Current text: " + this.value;

});


// 7. Change Event
document.getElementById("categorySelect").addEventListener("change", function() {

    document.getElementById("changeOutput").innerHTML =
        "Selected Category: " + this.value;

});


// 8. Theme Switching
document.getElementById("themeBtn").addEventListener("click", function() {

    document.body.classList.toggle("dark");

});


// 9. Image Preview
document.getElementById("imageSelect").addEventListener("change", function() {

    document.getElementById("previewImage").src = this.value;

});


// 10. Dynamic Menu
document.getElementById("menuBtn").addEventListener("click", function() {

    let menu = document.getElementById("menu");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    }
    else {

        menu.style.display = "block";

    }

});
