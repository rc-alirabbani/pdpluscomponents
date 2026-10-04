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
    model.image1 = fileUrl(content.image1);
    model.caption1 = content.caption1 || '';
    model.image2 = fileUrl(content.image2);
    model.caption2 = content.caption2 || '';
    model.image3 = fileUrl(content.image3);
    model.caption3 = content.caption3 || '';
    model.image4 = fileUrl(content.image4);
    model.caption4 = content.caption4 || '';
    return new Template('experience/components/pd_assets/pdPlusPhotoGallery').render(model).text;
};
