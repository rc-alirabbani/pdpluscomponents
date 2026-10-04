'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

function fileUrl(image) {
    return image && image.file ? image.file.url : '';
}

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    model.heading = content.heading || '';
    model.intro = content.intro || '';
    model.feature = fileUrl(content.feature);
    model.featureAlt = content.featureAlt || '';
    model.image2 = fileUrl(content.image2);
    model.image3 = fileUrl(content.image3);
    model.image4 = fileUrl(content.image4);
    return new Template('experience/components/pd_assets/pdPlusMediaGallery').render(model).text;
};
