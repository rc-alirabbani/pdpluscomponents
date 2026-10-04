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

    model.videoSelect = content.videoSelect;

    model.isContainer = content.isContainer ? 'container-fluid' : 'container';

    model.videoID = content.videoID;

    if (content.classNameVideo) {
        model.classNameVideo = content.classNameVideo;
    } else {
        model.classNameVideo = '';
    }

    if (content.classNameSmartText) {
        model.classNameSmartText = content.classNameSmartText;
    } else {
        model.classNameSmartText = '';
    }

    /* Vertical Position of Image if found then concatenate its class name */
    if (content.alignItems === 'flex-start') {
        model.alignItems = 'align-items-start';
    } else if (content.alignItems === 'center') {
        model.alignItems = 'align-items-center';
    } else if (content.alignItems === 'flex-end') {
        model.alignItems = 'align-items-end';
    }

    model.vidContentAsset = content.vidContentAsset;

    model.videoResolution = content.videoResolution;

    model.smartTextOrder = content.smartTextOrder;

    model.smartVidOrder = content.smartVidOrder;

    model.videoAutoPlay = content.videoAutoPlay ? '1' : '0';

    model.videoMute = content.videoMute ? '1' : '0';

    model.videoLoop = content.videoLoop ? '1' : '0';

    model.videoFullScreen = content.videoFullScreen ? '1' : '';

    model.videoTitle = 0;

    return new Template('experience/components/pd_assets/pdPlusSmartSlider').render(model).text;
};
