'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var pdPlusCarouselBuilder = require('*/cartridge/scripts/experience/utilities/pdPlusCarouselBuilder.js');

/**
 * Render logic for pd_layouts.PD Plus Carousel layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    model = pdPlusCarouselBuilder.init(model, context);

    return new Template('experience/components/pd_layouts/pdPlusCampaignPromo').render(model).text;
};
