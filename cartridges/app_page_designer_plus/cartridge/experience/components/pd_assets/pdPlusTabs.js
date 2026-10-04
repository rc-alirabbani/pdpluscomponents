'use strict';

/**
 * Script file for rendering an pd_assets.pdPlusSmartSlider component
 */

/* Initialize constants */
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');


/**
 * Render logic for pdPlusSmartSlider component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.tabTitle = content.tabTitle;
    model.tabDescription = content.tabDescription;

    model.bgComponentColor = 'style="';
    if (content.backgroundColor) {
        model.bgComponentColor += 'background-color: ' + content.backgroundColor.value + '; ';
    }
    if (content.backgroundColorAlpha) {
        model.bgComponentColor += 'opacity: ' + content.backgroundColorAlpha + '%;';
    }
    if (content.tabTextColor) {
        model.bgComponentColor += 'color: ' + content.tabTextColor.value + '; ';
    }
    if (content.tabBorderColor) {
        model.bgComponentColor += 'border-bottom-color: ' + content.tabBorderColor.value + '; ';
    }

    model.bgComponentColor += '"';

    
    return new Template('experience/components/pd_assets/pdPlusTabs').render(model).text;
};
