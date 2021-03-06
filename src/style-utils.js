var sketch = require("sketch");
var SharedStyle = require("sketch/dom").SharedStyle;
var document = sketch.getSelectedDocument();

var layerStyles = document.sharedLayerStyles;
var arrayLayerStyleIDs = layerStyles.map((sharedstyle) => sharedstyle["id"]);
var arrayLayerStyleNames = layerStyles.map(
    (sharedstyle) => sharedstyle["name"]
);
var arrayLayerStyleStyles = layerStyles.map(
    (sharedstyle) => sharedstyle["style"]
);
var layerStylesOrdered = [...document.sharedLayerStyles].sort(
    (left, right) => left.name > right.name
);
var stylesString = JSON.stringify(layerStylesOrdered);

var textStyles = document.sharedTextStyles;
var arrayTextStyleIDs = textStyles.map((sharedstyle) => sharedstyle["id"]);
var arrayTextStyleNames = textStyles.map((sharedstyle) => sharedstyle["name"]);
var arrayTextStyleStyles = textStyles.map(
    (sharedstyle) => sharedstyle["style"]
);
var textStylesOrdered = [...document.sharedTextStyles].sort(
    (left, right) => left.name > right.name
);
var textString = JSON.stringify(textStylesOrdered);

/**
 * Update the document layer styles
 * Return an object that contains:
 * 1. ids: an array with the list of all the layer style IDs
 * 2. names: an array with the list of all the layer style names
 * 3. styles: an array with the list of all the layer style styles
 * 4. orderedByName: an array with the list of all the layer styles names odered alphabetically
 */
function updateLayerStyles() {
    layerStyles = document.sharedLayerStyles;
    let arrayLayerStyleIDs = layerStyles.map(
        (sharedstyle) => sharedstyle["id"]
    );
    let arrayLayerStyleNames = layerStyles.map(
        (sharedstyle) => sharedstyle["name"]
    );
    let arrayLayerStyleStyles = layerStyles.map(
        (sharedstyle) => sharedstyle["style"]
    );
    let layerStylesOrdered = [...document.sharedLayerStyles].sort(
        (left, right) => left.name > right.name
    );

    return {
        ids: arrayLayerStyleIDs,
        names: arrayLayerStyleNames,
        styles: arrayLayerStyleStyles,
        orderedByName: layerStylesOrdered,
    };
}

/**
 * Get the layer style name statrting from its ID
 *
 * @param {id} text the ID of the style you need the name for.
 *
 */
function getLayerStyleNameFromID(id) {
    let styleName = "";
    for (let i = 0; i < arrayLayerStyleNames.length; i++) {
        if (arrayLayerStyleIDs[i] === id) {
            styleName = arrayLayerStyleNames[i];
        }
    }
    return styleName;
}

/**
 * Get the layer style ID statrting from its name
 *
 * @param {name} text the name of the style you need the ID for.
 *
 */
function getLayerStyleIDFromName(name) {
    let styleID = "";
    for (let i = 0; i < arrayLayerStyleIDs.length; i++) {
        if (arrayLayerStyleNames[i] === name) {
            styleID = arrayLayerStyleIDs[i];
        }
    }
    return styleID;
}

/**
 * Generate a new layer style from the selected item
 *
 * @param {item} text the selected artefact
 * @param {styleName} text the desired layer style name
 * @param {apply} bool apply the new style to the selected item
 *
 * Notes:
 * 1. if styleName already exist, the function will not create a new one
 * 2. if apply = true, it apply styleName even if the style already exist
 *
 */
function createNewLayerStyle(item, styleName = "New Style", apply = false) {
    if (arrayLayerStyleNames.indexOf(styleName) === -1) {
        let sharedStyle = layerStyles.push({
            name: styleName,
            style: item.style,
            document: document,
        });

        let stylesUpdated = updateLayerStyles();
        arrayLayerStyleIDs = stylesUpdated.ids;
        arrayLayerStyleNames = stylesUpdated.names;
        arrayLayerStyleStyles = stylesUpdated.styles;
        layerStylesOrdered = stylesUpdated.orderedByName;

        return sharedStyle;
    }

    if (apply === true) {
        applyLayerStyle(item, styleName);
    }
}

function applyLayerStyle(item, styleName) {
    let newLayerStyleID = getLayerStyleIDFromName(styleName);
    let localIndex = arrayLayerStyleIDs.indexOf(newLayerStyleID);
    item.sharedStyleId = newLayerStyleID;
    item.style = layerStyles[localIndex].style;
}

function getTextStyleNameFromID(id) {
    let textStyle = "";
    for (let i = 0; i < arrayTextStyleStyles.length; i++) {
        if (arrayTextStyleIDs[i] === id) {
            textStyle = arrayTextStyleStyles[i];
        }
    }
    return textStyle;
}

function getTextStyleIDFromName(name) {
    let styleID = "";
    for (let i = 0; i < arrayTextStyleIDs.length; i++) {
        if (arrayTextStyleNames[i] === name) {
            styleID = arrayTextStyleIDs[i];
        }
    }
    return styleID;
}

function createNewTextStyle(item, styleName, apply = false, letiants = false) {
    try {
        if (arrayTextStyleNames.indexOf(styleName) === -1) {
            let sharedStyle = textStyles.push({
                name: styleName,
                style: item.style,
                document: document,
            });
            updateTextStyles();
            if (apply === true) {
                let newTextStyleID = getTextStyleIDFromName(styleName);
                let localIndex = arrayTextStyleIDs.indexOf(newTextStyleID);
                item.sharedStyleId = newTextStyleID;
                item.style = textStyles[localIndex].style;
            }
            if (letiants === true && states.length > 0) {
                styleName = styleName.replace(states[0], "");
                for (let vIndex = 1; vIndex < states.length; vIndex++) {
                    styleName =
                        styleName.replace(states[vIndex - 1], "") +
                        states[vIndex];
                    sharedStyle = textStyles.push({
                        name: styleName,
                        style: item.style,
                        document: document,
                    });
                }
            }
            // return sharedStyle;
        } else {
            if (apply === true) {
                let newTextStyleID = getTextStyleIDFromName(styleName);
                let localIndex = arrayTextStyleIDs.indexOf(newTextStyleID);
                item.sharedStyleId = newTextStyleID;
                item.style = textStyles[localIndex].style;
            }
        }
    } catch (createTextStyleErr) {
        console.log(createTextStyleErr);
    }
}

function updateTextStyles() {
    let textStyles = document.sharedTextStyles;
    arrayTextStyleIDs = textStyles.map((sharedstyle) => sharedstyle["id"]);
    arrayTextStyleNames = textStyles.map((sharedstyle) => sharedstyle["name"]);
    arrayTextStyleStyles = textStyles.map(
        (sharedstyle) => sharedstyle["style"]
    );
}

module.exports = {
    updateLayerStyles: updateLayerStyles,
    getLayerStyleNameFromID: getLayerStyleNameFromID,
    getLayerStyleIDFromName: getLayerStyleIDFromName,
};