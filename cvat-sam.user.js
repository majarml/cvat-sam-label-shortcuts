// ==UserScript==
// @name         cvat-shortcuts
// @description	 This script aims to enhance the experience of labelling using sam tracker in CVAT by adding shortcuts to the label class.
// @namespace    https://github.com/majarml/cvat-sam-label-shortcuts
// @version      0.1
// @description  try to take over the world!
// @author       majar5c
// @match        https://app.cvat.ai/tasks/*/jobs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @license      MIT
// @grant        none
// ==/UserScript==


const labelList = [];

(function() {
    'use strict';
    initLabelText();
    const aiToolsTab = resolveElement("#root > section > main > section > main > section > aside.ant-layout-sider.ant-layout-sider-light.cvat-canvas-controls-sidebar > div > div:nth-child(8) > span > svg");

    // Wait for the element to be added to the page
    aiToolsTab.then(element => {
        hoverElement(element);
        const labelListDiv = resolveElement("body > div:nth-child(11) > div > div > div > div.rc-virtual-list > div > div > div");
        labelListDiv.then(element => {
            for (const child of element.children) {
                labelList.push(child.title);
            }
        });
        // const labelDropDown = resolveElement("#rc-tabs-1-panel-interactors > div.ant-row.ant-row-center");
        // labelDropDown.then(element => {
        //    console.log(element);
        // });
    });
})();

function doc_keyUp(e) {
    const KEY_DIGIT_1 = 49;
    // Check if the event target is an input field or text area
    if (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') {
        return;
    }
    if (e.keyCode >= KEY_DIGIT_1 && e.keyCode < KEY_DIGIT_1 + Math.min(10, labelList.length)) {
        changeLabel(e.keyCode - KEY_DIGIT_1 + 1);
    }
    // Rest of the code
}

document.addEventListener('keyup', doc_keyUp, false);


// helper
function resolveElement(selector) {
    return new Promise(resolve => {
        // Create a MutationObserver to monitor changes to the DOM
        const observer = new MutationObserver(mutations => {
            // Loop through all mutations
            for (const mutation of mutations) {
                // Check if nodes were added
                if (mutation.addedNodes.length > 0) {
                    // Check if the node is the element we are looking for
                    var node = document.querySelector(selector);
                    if (node){
                        // Stop observing changes to the DOM
                        observer.disconnect();

                        // Resolve the promise with the added element
                        resolve(node);
                    }
                }
            }
        });

        // Start observing changes to the body element and its descendants
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function changeLabel(index) {
    document.querySelector(`body > div:nth-child(11) > div > div > div > div.rc-virtual-list > div > div > div > div:nth-child(${index}) > div`).click();
    document.querySelector(`#rc-tabs-1-panel-interactors > div.ant-row.ant-row-end.ant-row-middle > div > button`).click();
    changeLabelText(`${index}: ${labelList[index-1]}`);
}

function initLabelText() {
    const canvas = resolveElement("#root > section > main > section > main > section > main > div.react-grid-layout.cvat-canvas-grid-root.cvat-canvas-grid-root-single > div.react-grid-item.cvat-canvas-grid-item.react-draggable.cssTransforms.react-resizable > div.cvat-canvas-container");
    // Create a new style element
    var style = document.createElement("style");

    // Set the CSS code for the style element
    style.innerHTML = `
        /* Text */
        .text {
          font-size: 20px;
          position: absolute;
          top: 0px;
          left: 0px;
        }
    `;

    // Append the style element to the head section of the page
    document.head.appendChild(style);

    // Create a new div element for the text
    var textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.innerHTML = "";

    canvas.then(element => {
        element.appendChild(textDiv);
    });
}

function changeLabelText(text) {
    const labelText = document.querySelector("#root > section > main > section > main > section > main > div.react-grid-layout.cvat-canvas-grid-root.cvat-canvas-grid-root-single > div > div.cvat-canvas-container > div.text");
    labelText.innerHTML = text;

}

function hoverElement(element) {
    const mouseoverEvent = new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    // Create a new MouseEvent for the mouseout event
    const mouseoutEvent = new MouseEvent('mouseout', );
    element.dispatchEvent(mouseoverEvent);
    //element.dispatchEvent(mouseoutEvent);
}