'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

function fileUrl(image) {
    return image && image.file ? image.file.url : '';
}

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    model.image1 = fileUrl(content.image1);
    model.title1 = content.title1 || '';
    model.text1 = content.text1 || '';
    model.button1 = content.button1 || '';
    model.link1 = content.link1 || '#';
    model.image2 = fileUrl(content.image2);
    model.title2 = content.title2 || '';
    model.text2 = content.text2 || '';
    model.button2 = content.button2 || '';
    model.link2 = content.link2 || '#';
    return new Template('experience/components/pd_assets/pdPlusTwoColumnBox').render(model).text;
};
