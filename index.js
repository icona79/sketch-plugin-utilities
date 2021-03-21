function setResizingConstraint(
    item,
    pinProperties = [false, false, false, false],
    sizeProperties = [false, false]
) {
    // var layerResizingConstraint = item.sketchObject.resizingConstraint();

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
    if (fixedWidth === true) {
        flagMap[4] = "0";
    }
    let fixedHeight = sizeProperties[1];
    if (fixedHeight === true) {
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