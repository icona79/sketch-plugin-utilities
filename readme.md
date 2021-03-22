# Sketch plugin utilities

Useful functions for Sketch plugins. Provides functions to be reused into your plugins.

## Installation

```bash
npm i @icona79/sketch-plugin-utilities
```

## Usage

You can import all the functions in once via

```javascript
var SketchUtilities = require("@icona79/sketch-plugin-utilities");
```

or select every single function you need:

```javascript
import { functionNameA, functionNameB } from "@icona79/sketch-plugin-utilities";
```

### Smart Layout options

#### Set Constraint (Pinning properties)

Set the Pinning Properties and Size properties for the selected artefact

```javascript
import { setResizingConstraint } from "@icona79/sketch-plugin-utilities";

// set fix size both horizontally and vertically
setResizingConstraint(myItem, [false, false, false, false], [true, true]);
// set all the pinning properties to automatically resize the item based on its container size
setResizingConstraint(myItem, [true, true, true, true], [false, false]);
```

Note: in case of all the same direction parameters are true (which will cause a Sketch error) the pin properties wins over the size contraint properties

#### Set Smart Layout

Set the Smart Layout properties for the selected artefact (Symbol or Group only)

```javascript
import { setSmartLayout } from "@icona79/sketch-plugin-utilities";

// set the item's smart layout to be resized horzontally from the center
setSmartLayout(myItem, "HorizontallyCenter"));
```
