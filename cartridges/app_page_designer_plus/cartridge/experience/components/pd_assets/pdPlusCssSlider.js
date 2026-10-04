'use strict';

/**
 * Script file for rendering an pd_assets.pdPlusAccordion component
 */

/* Initialize constants */
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');


/**
 * Render logic for pdPlusAccordions component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    /* Vertical Position of Image if found then concatenate its class name */ 
    if (content.imageYPos === 'top') {
        model.imageYPos = 'align-items-start';
    } else if (content.imageYPos === 'center') {
        model.imageYPos = 'align-items-center';
    } else if (content.imageYPos === 'bottom') {
        model.imageYPos = 'align-items-end';
    }

    /* Horizontal Position of Image if found then concatenate its Class Name */

    if (content.imageXPos === 'right') {
        model.imageXPos = 'justify-content-end';
    } else if (content.imageXPos === 'center') {
        model.imageXPos = 'justify-content-center';
    } else if (content.imageXPos === 'left') {
        model.imageXPos = 'justify-content-start';
    }

    model.cssSliderNo = 'trigger' + content.cssSliderNo;
    model.slideContent = content.slideContent ? content.slideContent : '';

    if (content.tileLink) {
        model.tileLink = content.tileLink;
    } else {
        model.tileLink = 'javascript:void(0)';
    }
    model.tileNewtab = content.tileNewtab;
    model.buttontext = content.buttontext;

    /* Get image from the user for slide */
    model.imgFile = content.imgFile ? content.imgFile.file.url : null;

    /* Slider text Style */

    model.sliderTextStyles = 'style="';
    if (content.sliderTextColor) {
        model.sliderTextStyles += 'color: ' + content.sliderTextColor.value + '; ';
    }

    model.sliderTextStyles += '"';
    
    /* Button Bakcground Style */

    model.btnBgStyles = 'style="';
    if (content.btnBgColor) {
        model.btnBgStyles += 'background-color: ' + content.btnBgColor.value + '; ';
    }

    if (content.btnTextColor) {
        model.btnBgStyles += 'color: ' + content.btnTextColor.value + '; ';
    }

    if (content.btnFontSize) {
        model.btnBgStyles += 'font-size: ' + content.btnFontSize.value + '; ';
    }


    if (content.buttonBorderColor) {
        model.btnBgStyles += 'border-color: ' + content.buttonBorderColor.value + '; ';
    }

    model.btnBgStyles += '"';

    
    return new Template('experience/components/pd_assets/pdPlusCssSlider').render(model).text;
};
