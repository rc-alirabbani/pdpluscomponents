'use strict';

$(document).ready(function () {
    if (window.resetCampaignBannerSessionToken) {
        window.sessionStorage.removeItem('hide_campaign_banner');
    }

    var campaignBannerStatus = window.sessionStorage.getItem('hide_campaign_banner');
    $('.promo_campaign_wrapper .close').on('click', function () {
        $('.promo_campaign_wrapper').addClass('d-none');
        window.sessionStorage.setItem('hide_campaign_banner', '1');
    });

    if (!campaignBannerStatus || campaignBannerStatus < 0) {
        $('.promo_campaign_wrapper').removeClass('d-none');
    }
});
