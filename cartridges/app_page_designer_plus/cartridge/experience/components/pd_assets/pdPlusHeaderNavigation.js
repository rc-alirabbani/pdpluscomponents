'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    model.heading = content.heading || '';
    model.label1 = content.label1 || '';
    model.link1 = content.link1 || '#';
    model.label2 = content.label2 || '';
    model.link2 = content.link2 || '#';
    model.label3 = content.label3 || '';
    model.link3 = content.link3 || '#';
    model.label4 = content.label4 || '';
    model.link4 = content.link4 || '#';
    model.label5 = content.label5 || '';
    model.link5 = content.link5 || '#';
    return new Template('experience/components/pd_assets/pdPlusHeaderNavigation').render(model).text;
};
