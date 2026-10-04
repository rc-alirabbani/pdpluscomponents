'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
/**
 * Render logic for the storefront.photoTile component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.isContainer = content.isContainer ? 'container-fluid' : 'container';

    /* Image File Uploader */
    if (content.imgFile) {
        /* Image File Alt Text */
        model.imgAlt = content.imgAlt ? content.imgAlt : null;

        model.imgFile = {
            src: {
                mobile: ImageTransformation.url(content.imgFile, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.imgFile, { device: 'desktop' })
            },
            alt: content.imgAlt,
            focalPointX: (content.imgFile.focalPoint.x * 100) + '%',
            focalPointY: (content.imgFile.focalPoint.y * 100) + '%'
        };
    }

    /* Image Scale on Hover Checkbox */
    model.imgScaleHover = content.imgScaleHover;

    if (content.richText) {
        model.richText = content.richText;
    }

    if (content.tileLink) {
        model.tileLink = content.tileLink;
    } else {
        model.tileLink = 'javascript:void(0)';
    }

    model.tileNewtab = content.tileNewtab;

    if(content.buttonText) {
        model.buttonText = content.buttonText;
    }
    /* Container Area color Scheme styles */
    model.bgComponentColor = 'style="';
    if (content.backgroundColor) {
        model.bgComponentColor += 'background-color: ' + content.backgroundColor.value + '; ';
    }
    if (content.backgroundColorAlpha) {
        model.bgComponentColor += 'opacity: ' + content.backgroundColorAlpha + '%;';
    }

    model.bgComponentColor += '"';

    /* button color styles */
    model.btnBgComponentColor = 'style="';
    if (content.buttonBgColor) {
        model.btnBgComponentColor += 'background-color: ' + content.buttonBgColor.value + '; ';
    }
    if (content.buttonTextColor) {
        model.btnBgComponentColor += 'color: ' + content.buttonTextColor.value + '; ';
    }
    if (content.buttonBorderColor) {
        model.btnBgComponentColor += 'border-color: ' + content.buttonBorderColor.value + '; ';
    }
    model.btnBgComponentColor += '"';

    /* text with Image layout if found then concatenate its class name */
    if (content.textXaxisAlignment === 'text on left') {
        model.textXaxisAlignment = 'order-text-left';
    } else if (content.textXaxisAlignment === 'text on right') {
        model.textXaxisAlignment = 'order-text-right';
    }

    /* Horizontal Position of text Container if found then concatenate its Class Name */

    if (content.textAlignmentVertical === 'top') {
        model.textAlignmentVertical = 'start';
    } else if (content.textAlignmentVertical === 'center') {
        model.textAlignmentVertical = 'center';
    } else if (content.textAlignmentVertical === 'bottom') {
        model.textAlignmentVertical = 'end';
    }

    return new Template('experience/components/pd_assets/pdPlusTextWithImage').render(model).text;
};
