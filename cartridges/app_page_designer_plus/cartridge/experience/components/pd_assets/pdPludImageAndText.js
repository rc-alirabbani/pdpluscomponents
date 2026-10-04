'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');


/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.heading = content.heading ? content.heading : null;
    model.ITCText = content.ITCText ? content.ITCText : null;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.link = content.ITCLink ? content.ITCLink : '#';
    model.alt = content.alt ? content.alt : null;
        /* Product hover text color */
    model.styletileTextColor = 'style="';
    if (content.tileTextColor) {
        model.styletileTextColor += 'color: ' + content.tileTextColor.value + '; ';  
    }

    /* Sub Hover effect color */

    model.bgComponentColor = 'style="';
    if (content.backgroundColor) {
        model.bgComponentColor += 'background-color: ' + content.backgroundColor.value + '; ';
    }
    if (content.backgroundColorAlpha) {
        model.bgComponentColor += 'opacity: ' + content.backgroundColorAlpha + '%;';
    }
    model.bgComponentColor += '"';

    /* product text Horizantal Alignment */

    if (content.podHoverDirection === 'top') {
        model.overlaydirection = 'top';
    } else if (content.podHoverDirection === 'right') {
        model.overlaydirection = 'right';
    } else if (content.podHoverDirection === 'bottom') {
        model.overlaydirection = 'bottom';
    } else if (content.podHoverDirection === 'left') {
        model.overlaydirection = 'left';
    }

    /* product text direction*/

    if (content.podTextDirection === 'top') {
        model.stylepodTextDirection = 'top';
    } else if (content.podTextDirection === 'center') {
        model.stylepodTextDirection = 'center';
    } else if (content.podTextDirection === 'bottom') {
        model.stylepodTextDirection = 'bottom';
    }
    return new Template('experience/components/pd_assets/pdPlusImageAndText').render(model).text;
};
