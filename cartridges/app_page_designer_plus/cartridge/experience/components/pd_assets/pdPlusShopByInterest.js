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
    model.subheading = content.subheading || '';
    model.image1 = fileUrl(content.image1);
    model.title1 = content.title1 || '';
    model.link1 = content.link1 || '#';
    model.image2 = fileUrl(content.image2);
    model.title2 = content.title2 || '';
    model.link2 = content.link2 || '#';
    model.image3 = fileUrl(content.image3);
    model.title3 = content.title3 || '';
    model.link3 = content.link3 || '#';
    model.image4 = fileUrl(content.image4);
    model.title4 = content.title4 || '';
    model.link4 = content.link4 || '#';
    return new Template('experience/components/pd_assets/pdPlusShopByInterest').render(model).text;
};
