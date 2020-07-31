// Apply css class to item on the page
// document.querySelector("#hplogo img").classList.add("spinspinspin");

// Create first button
const first = document.createElement('button');

// Set text
first.innerText = "SET DATA";

// Set ID to get css
first.id = 'first';

// Created Second button
const second = document.createElement("button");
second.innerText = "SHOUTOUT TO BACKEND";
second.id = "second";


// Add buttons to the page
document.querySelector('body').appendChild(first);
document.querySelector("body").appendChild(second);


// Event listener when first button is clicked
// Sets the password in the storage to 123
first.addEventListener('click', () => {
    // If you want to sync accross all devices use
    // chrome.storage.sync 

    // Setting local storage variable
    chrome.storage.local.set(
        {"password": "123"}
    ) // end of set local storage

    // Console log for developer clarity
    console.log('I set data')
}) // Ends first.addEventListener


// Add event listener to the button
// Tells the background file to load the local storage
second.addEventListener('click', () => {

    // Sends the message to the backend
    // Can also send other data
    chrome.runtime.sendMessage(
        {message: "yo check the storage"},
        // If using the response method
        response => {
            // Do this when responded to
            console.log(response)
        } // end of response
    ) // end of sendMessage

    // console log for clarity 
    console.log('sent message')
}) // ends second.addEventListener

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Anytime a message is sent from the background to the foreground
    console.log(request.message)
}) // end addListener