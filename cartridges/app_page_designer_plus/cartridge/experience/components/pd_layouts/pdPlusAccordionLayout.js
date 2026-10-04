'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');


/**
 * Render logic for the pd_layouts.pdPlusGrid1row1column.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    var component = context.component;

    model.isContainer = content.isContainer ? 'container-fluid' : 'container';

    model.bgComponentColor = 'style="';
    
    if (content.backgroundColor) {
        model.bgComponentColor += 'background-color: ' + content.backgroundColor.value + '; ';
    }
    if (content.backgroundColorAlpha) {
        model.bgComponentColor += 'opacity: ' + content.backgroundColorAlpha + '%;';
    }
    if (content.itemHeadingTextColor) {
        model.bgComponentColor += 'color: ' + content.itemHeadingTextColor.value + '; ';
    }
    if (content.itemHeadingBorderColor) {
        model.bgComponentColor += 'bordercolor: ' + content.itemHeadingBorderColor.value + '; ';
    }

    if (content.HeadingbgColor) {
        model.bgComponentColor += 'background-color: ' + content.HeadingbgColor.value + '; ';
    }
    model.bgComponentColor += '"';

    /* Margin | Padding Settings */
    model.UILayout = 'style="';
    model.UILayout += 'padding-top: ' + (content.setPaddingTop ? content.setPaddingTop : '0');
    model.UILayout += '; padding-right: ' + (content.setPaddingRight ? content.setPaddingRight : '0');
    model.UILayout += '; padding-bottom: ' + (content.setPaddingBottom ? content.setPaddingBottom : '0');
    model.UILayout += '; padding-left: ' + (content.setPaddingLeft ? content.setPaddingLeft : '0');
    model.UILayout += '; margin-top: ' + (content.setMarginTop ? content.setMarginTop : '0');
    model.UILayout += '; margin-right: ' + (content.setMarginRight ? content.setMarginRight : '0');
    model.UILayout += '; margin-bottom: ' + (content.setMarginBottom ? content.setMarginBottom : '0');
    model.UILayout += '; margin-left: ' + (content.setMarginLeft ? content.setMarginLeft : '0');
    model.UILayout += ';"';


    model.regions = PageRenderHelper.getRegionModelRegistry(component);
   
    return new Template('experience/components/pd_layouts/pdPlusAccordionLayout').render(model).text;
};
