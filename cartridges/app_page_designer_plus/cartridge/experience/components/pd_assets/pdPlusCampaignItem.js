'use strict';

/**
 * Script file for rendering an pd_assets.pdPlusSmartSlider component
 */

/* Initialize constants */
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for pdPlusCompaignBanner component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.promoTextItem = content.promoTextItem;
    model.isHideCloseBtn = content.isHideCloseBtn ? 'd-none' : 'd-block';
    
    return new Template('experience/components/pd_assets/pdPlusCampaignItem').render(model).text;
};
