// console.log("from the background")

// Active Tab saved so the message can be sent to it later on
let activeTabId = 0


// Adds a listener as soon as the extention activates
// This finds what tab is active
chrome.tabs.onActivated.addListener(tab => {
    // console.log(tab)

    // Gets information of active tab
    chrome.tabs.get(tab.tabId, current_tab_info => {
        // console.log(current_tab_info.url)

        // Sets the global variable for later use externally
        // of this function
        activeTabId = tab.tabId

        // Checks if the extension can be used on this specific page
        if ((current_tab_info.url).includes("https://www.google.com")){
            chrome.tabs.insertCSS(null, { file: "./mystyles.css" });
            
            chrome.tabs.executeScript(null, 
                { file: "./foreground.js" }, 
                () =>
                // Let the console know it worked
                console.log("Injected")
            ); // end of executeScript
        } // end of if useable website
    }) // end of getting current tab information
}) // end of getting current open tab


// Sets up a listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Compares message to known messages
    switch (request.message) {
        // If the message is 'yo check the storage'
        case 'yo check the storage':
            // using sendResponse method
            sendResponse({message: 'yo i got your message'})

            // using sendMessage
            chrome.tabs.sendMessage(activeTabId, {message: 'yo i got your message'}) 

            // Get password from storage
            chrome.storage.local.get('password', value => {
                // console log it
                console.log(value)
            })
        // If it doesnt match any known messages
        default: 
            // Console log it for clarity and development
            console.log(request.message);
    } // End of switch
}) // End of event listener