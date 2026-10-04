'use strict';

$(document).ready(function () {
	$(".pdPlusAccordion .experience-component:first-child .inner").show();
	$(".pdPlusAccordion .experience-component .accordion-button").click(function () {
    	console.log("clicked");
      $(this).toggleClass("active").next(".inner").slideToggle().parent().siblings().find(".inner").slideUp().prev().removeClass("active");
	  $(".inner").not($(this).next()).slideUp(500);
    });
});
