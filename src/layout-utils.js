const SmartLayout = require("sketch").SmartLayout;

/**
 * Set the Pinning Properties and Size properties for the selected artefact
 *
 * @param {item} text the selected artefact (it should be a group, text, shapepath, symbol).
 * @param {[pin Left, pin Right, pin Top, Pin bottom]} array boolean, set the
 *         pin properties for the selected artefact
 * @param {[fix size horizontal, fix size vertical]} array boolean, set the
 *         fixed size
 * Note: in case of all the same direction parameters are true (which will cause a Sketch error)
 *       the pin properties wins over the size contraint properties
 */
function setResizingConstraint(
    item,
    pinProperties = [false, false, false, false],
    sizeProperties = [false, false]
) {
    let flagMap = ["1", "1", "1", "1", "1", "1"];

    let leftPin = pinProperties[0];
    if (leftPin === true) {
        flagMap[3] = "0";
    }
    let rightPin = pinProperties[1];
    if (rightPin === true) {
        flagMap[5] = "0";
    }
    let topPin = pinProperties[2];
    if (topPin === true) {
        flagMap[0] = "0";
    }
    let bottomPin = pinProperties[3];
    if (bottomPin === true) {
        flagMap[2] = "0";
    }

    let fixedWidth = sizeProperties[0];
    if (fixedWidth === true && !(leftPin === true && rightPin === true)) {
        flagMap[4] = "0";
    }
    let fixedHeight = sizeProperties[1];
    if (fixedHeight === true && !(topPin === true && bottomPin === true)) {
        flagMap[1] = "0";
    }

    let result =
        flagMap[0] +
        flagMap[1] +
        flagMap[2] +
        flagMap[3] +
        flagMap[4] +
        flagMap[5];

    item.sketchObject.setResizingConstraint(parseInt(result, 2));
}

exports.setResizingConstraint = setResizingConstraint;

/**
 * Set the Smart Layout properties for the selected artefact
 *
 * @param {item} text the selected artefact (it should be a group, text, shapepath, symbol).
 * @param {type} text the type of Smart layout option
 *         Options:
 *          1. LeftToRight
 *          2. HorizontallyCenter
 *          3. RightToLeft
 *          4. TopToBottom
 *          5. VerticallyCenter
 *          6. BottomToTOp
 */
function setSmartLayout(item, type) {
    let smartLayoutType = type;
    switch (smartLayoutType) {
        case "LeftToRight":
            return (item.smartLayout = SmartLayout.LeftToRight);
        case "HorizontallyCenter":
            return (item.smartLayout = SmartLayout.HorizontallyCenter);
        case "RightToLeft":
            return (item.smartLayout = SmartLayout.RightToLeft);
        case "TopToBottom":
            return (item.smartLayout = SmartLayout.TopToBottom);
        case "VerticallyCenter":
            return (item.smartLayout = SmartLayout.VerticallyCenter);
        case "BottomToTop":
            return (item.smartLayout = SmartLayout.BottomToTop);
    }
}

exports.setSmartLayout = setSmartLayout;