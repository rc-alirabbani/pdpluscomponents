'use strict';

module.exports = function () {
    var $videoSrc;

    $('.video-modal-outer > a').on('click', function () {
        $videoSrc = $(this).data('src');
    });

    $('[id*=popupID_]').on('shown.bs.modal', function () {
        $(this).find('.embed-responsive-item').attr('src', $videoSrc);
    });

    $('[id*=popupID_]').on('hide.bs.modal', function () {
        $(this).find('.embed-responsive-item').removeAttr('src');
    });
};
