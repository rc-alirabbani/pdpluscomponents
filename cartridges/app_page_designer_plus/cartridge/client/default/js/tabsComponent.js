'use strict';

$(document).ready(function () {
   let firstTabDescription = $('.tab-container .experience-pd_assets-pdPlusTabs:first-child').find('.tab-description').html();
   $('.tabs-wrapper .tab-content').find('.tab-pane').html(firstTabDescription);
   $('.tabs-wrapper .tab-content').find('.tab-pane').addClass('active in show');
   $('.tab-container .experience-pd_assets-pdPlusTabs:first-child').find('[data-bs-toggle="tab"]').addClass('active');

   $('.experience-pd_assets-pdPlusTabs').find('[data-bs-toggle="tab"]').click(function(){
      let tabId = $(this).attr('data-bs-target');
      let tabDescription = $(this).parents('.tabItem').find('.tab-description').html();

      $('.tabs-wrapper [data-bs-toggle="tab"]').removeClass('active');
      $('.tabs-wrapper .tab-pane').removeClass('active in show');
         
      $(this).tab('show');
      $(this).parents('.tabs-wrapper').find('.tab-pane').attr('id', tabId).addClass('active in show');
      $(this).parents('.tabs-wrapper').find('.tab-pane').html(tabDescription);
   });   
});
