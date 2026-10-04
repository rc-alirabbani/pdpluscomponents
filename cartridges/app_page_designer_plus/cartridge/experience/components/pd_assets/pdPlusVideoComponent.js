'use strict';

/**
 * Script file for rendering an pd_assets.pdPlusVideoComponent component
 */

/* Initialize constants */
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var UUIDUtils = require('dw/util/UUIDUtils');


/**
 * Render logic for pdPlusVideoComponent component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.videoSelect = content.videoSelect;

    model.videoID = content.videoID;

    if (content.className) {
        model.className = content.className;
    } else {
        model.className = '';
    }

    var popupUUID = 'popupID_' + UUIDUtils.createUUID();
    model.modalPopupID = popupUUID;

    if (content.videoScale) {
        model.videoScale = 'style="transform: ' + content.videoScale + ';"';
    }

    model.videoResolution = content.videoResolution;

    model.videoAutoPlay = content.videoAutoPlay ? '1' : '0';

    model.videoMute = content.videoMute ? '1' : '0';

    model.videoLoop = content.videoLoop ? '1' : '0';

    model.videoFullScreen = content.videoFullScreen ? '1' : '';

    model.videoTitle = '0';

    model.videoModalPopup = content.videoModalPopup;

    model.videoPlayIcon = content.videoPlayIcon;

    if (content.videoPoster) {
        /* Image File Alt Text */
        model.imgAlt = content.imgAlt ? content.imgAlt : '';

        model.videoPoster = {
            src: {
                mobile: ImageTransformation.url(content.videoPoster, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.videoPoster, { device: 'desktop' })
            },
            alt: model.imgAlt,
            focalPointX: (content.videoPoster.focalPoint.x * 100) + '%',
            focalPointY: (content.videoPoster.focalPoint.y * 100) + '%'
        };
    }

    return new Template('experience/components/pd_assets/pdPlusVideoComponent').render(model).text;
};
