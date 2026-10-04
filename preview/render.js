'use strict';

/**
 * Renders a pdPlus storefront page from a Page Designer-style configuration.
 * Markup follows the cartridge ISML templates so compiled component CSS applies.
 */

function esc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function raw(value) {
    return value == null ? '' : String(value);
}

function wrap(typeId, inner) {
    var className = 'experience-component experience-' + typeId.replace(/\./g, '-');
    return '<div class="' + className + '">' + inner + '</div>';
}

function region(className, inner) {
    return '<div class="experience-region ' + className + '">' + inner + '</div>';
}

function bannerY(value) {
    if (value === 'top') return 'bnr--xstart';
    if (value === 'bottom') return 'bnr--xbottom';
    return 'bnr--xcenter';
}

function bannerX(value) {
    if (value === 'right') return 'bnr--ystart';
    if (value === 'center') return 'bnr--ycenter';
    return 'bnr--yright';
}

function textOrder(value) {
    return value === 'text on right' ? 'order-text-right' : 'order-text-left';
}

function sliderControls(value) {
    if (value === 'arrows & pagination') return 'arrows-pagination';
    return 'only-pagination';
}

function containerClass(isFluid) {
    return isFluid ? 'container-fluid' : 'container';
}

var renderers = {
    'commerce_assets.campaignBanner': function (component) {
        return wrap(component.type,
            '<div class="campaign-banner d-none">' +
                '<div class="container">' +
                    '<div class="campaign-banner-container d-flex justify-content-between">' +
                        '<div></div>' +
                        '<div class="campaign-banner-message pt-3">' + raw(component.bannerMessage) + '</div>' +
                        '<div class="close-button">' +
                            '<button class="close pt-3" aria-label="Close">' +
                                '<img src="/images/close-icon.svg" alt="" />' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPlusImageBanner': function (component) {
        var captionStyle = component.captionColor ? 'color:' + component.captionColor + ';' : '';
        return wrap(component.type,
            '<div class="tile-link imageBanner">' +
                '<figure class="bnr custom-caption ' + bannerY(component.imageYPos) + ' ' + bannerX(component.imageXPos) + '">' +
                    '<picture class="bnr-img image-container">' +
                        '<source srcset="' + esc(component.image) + '" media="(min-width: 768px)" />' +
                        '<img class="img-fluid" src="' + esc(component.image) + '" alt="' + esc(component.imgAlt) + '" />' +
                    '</picture>' +
                    '<figcaption class="bnr-caption">' +
                        '<div class="bnr-caption-bg" style="' + esc(captionStyle) + '">' +
                            '<div class="image-banner-detail">' + raw(component.detail) + '</div>' +
                            '<button class="btn btn-primary category-link banner-btn">' +
                                '<a class="tile-link" href="' + esc(component.tileLink) + '">' + esc(component.buttontext) + '</a>' +
                            '</button>' +
                        '</div>' +
                    '</figcaption>' +
                '</figure>' +
            '</div>');
    },

    'pd_assets.pdPludEditorialRichText': function (component) {
        return wrap(component.type,
            '<div class="editorialRichText-component-container">' +
                '<div class="row">' +
                    '<div class="col-12 align-self-center text-center text-lg-left">' +
                        raw(component.richText) +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPlusTextWithImage': function (component) {
        var buttonStyle = '';
        if (component.buttonColor) buttonStyle += 'background-color:' + component.buttonColor + ';';
        if (component.buttonTextColor) buttonStyle += 'color:' + component.buttonTextColor + ';';
        return wrap(component.type,
            '<div class="text-image-container ' + textOrder(component.textXaxisAlignment) + '">' +
                '<div class="row align-items-' + esc(component.textAlignmentVertical || 'center') + '">' +
                    '<div class="col-12 col-md-6 text-column">' +
                        '<div class="text-container">' +
                            '<div class="text-editor">' + raw(component.richText) + '</div>' +
                            '<div class="btn-wrapper">' +
                                '<button class="btn" style="' + esc(buttonStyle) + '">' +
                                    '<a class="tile-link" href="' + esc(component.tileLink) + '">' + esc(component.buttonText) + '</a>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-12 col-md-6 photo-column">' +
                        '<div class="photo-tile-container">' +
                            '<figure class="bnr mb-0 photo-tile-figure">' +
                                '<picture class="bnr-img image-container">' +
                                    '<img class="photo-tile-image img-fluid" src="' + esc(component.image) + '" alt="' + esc(component.imgAlt) + '" />' +
                                '</picture>' +
                            '</figure>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_layouts.pdPlusTextImageLayout': function (component) {
        return wrap(component.type,
            '<div class="pdplus-component">' +
                '<div class="textWithImageWrapper">' +
                    '<div class="' + containerClass(component.isContainer) + '">' +
                        region('content-holder', renderList(component.components)) +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPludImageAndText': function (component) {
        var overlay = 'style="';
        if (component.backgroundColor) overlay += 'background-color:' + component.backgroundColor + ';';
        if (component.backgroundColorAlpha != null) overlay += 'opacity:' + component.backgroundColorAlpha + '%;';
        overlay += '"';
        return wrap(component.type,
            '<div class="ITC-container">' +
                '<div class="row ITC-row">' +
                    '<div class="col-12">' +
                        '<figure class="ITC-figure image-component">' +
                            '<picture>' +
                                '<a href="#">' +
                                    '<img class="ITC-image image-fluid common-image-component" src="' + esc(component.image) + '" alt="' + esc(component.alt) + '" />' +
                                    '<div class="image-heading-container common-image-height">' +
                                        '<div class="row ITC-image-heading-text text-direction ' + esc(component.podTextDirection || 'center') + '">' +
                                            '<div class="col-12"><div class="bnr-text3 heading-font">' + raw(component.heading) + '</div></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="img-overlay ' + esc(component.podHoverDirection || 'left') + '" ' + overlay + '></div>' +
                                '</a>' +
                            '</picture>' +
                            '<figcaption><div class="col-12 ITC-text-underneath"><span>' + raw(component.ITCText) + '</span></div></figcaption>' +
                        '</figure>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_layouts.pdPlusGrid2r1c': function (component) {
        var kids = component.components || [];
        function column(child) {
            return '<div class="experience-region region col-12 col-sm-6">' + (child ? renderComponent(child) : '') + '</div>';
        }
        return wrap(component.type,
            '<div class="pdplus-component pdplus-2r-1c">' +
                '<div class="' + containerClass(component.isContainer) + '">' +
                    '<div class="row">' + column(kids[0]) + column(kids[1]) + '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPlusAccordion': function (component) {
        return wrap(component.type,
            '<div class="accordion-item ' + esc(component.accrBorderRadius || '') + '">' +
                '<button class="accordion-button" type="button">' +
                    '<div class="according-heading">' + esc(component.accodionItem) + '</div>' +
                    '<i class="fa fa-angle-down"></i>' +
                '</button>' +
                '<div class="inner">' +
                    '<div class="accordion-body"><div class="accordion-detail">' + raw(component.accordionDetail) + '</div></div>' +
                '</div>' +
            '</div>');
    },

    'pd_layouts.pdPlusAccordionLayout': function (component) {
        return wrap(component.type,
            '<div class="pdplus-component">' +
                '<div class="accordion-inner">' +
                    '<div class="' + containerClass(component.isContainer) + '">' +
                        '<div class="pdPlusAccordion">' +
                            region('experience-accordionlayout', renderList(component.components)) +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPlusTabs': function (component) {
        return wrap(component.type,
            '<div class="tabItem">' +
                '<button class="nav-link" type="button" data-bs-toggle="tab" data-bs-target="' + esc(component.tabTitle) + '" role="tab">' +
                    esc(component.tabTitle) +
                '</button>' +
                '<div class="tab-description d-none">' + raw(component.tabDescription) + '</div>' +
            '</div>');
    },

    'pd_layouts.pdPlusTabsLayout': function (component) {
        return wrap(component.type,
            '<div class="pdplus-component">' +
                '<div class="tab-inner">' +
                    '<div class="' + containerClass(component.isContainer) + '">' +
                        '<div class="tabs-wrapper ' + esc(component.layoutTabs || '') + '">' +
                            region('tab-container', renderList(component.components)) +
                            '<div class="tab-content"><div class="tab-pane fade"></div></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_assets.pdPlusCssSlider': function (component) {
        var checked = component.cssSliderNo === 'trigger1' ? ' checked' : '';
        var captionStyle = '';
        if (component.captionColor) captionStyle += 'color:' + component.captionColor + ';';
        if (component.captionBackground) captionStyle += 'background-color:' + component.captionBackground + ';';
        return wrap(component.type,
            '<input type="radio" id="' + esc(component.cssSliderNo) + '" name="slider"' + checked + ' />' +
            '<label for="' + esc(component.cssSliderNo) + '"><span class="sr-only">CSS Slider.</span></label>' +
            '<div class="slide" style="background-image:url(\'' + esc(component.image) + '\')">' +
                '<div class="slide-wrapper">' +
                    '<div class="slideCaption" style="' + esc(captionStyle) + '">' +
                        '<div class="slideContent">' + raw(component.slideContent) + '</div>' +
                        '<button class="btn"><a href="' + esc(component.tileLink) + '">' + esc(component.buttontext) + '</a></button>' +
                    '</div>' +
                '</div>' +
            '</div>');
    },

    'pd_layouts.pdPluscssSliderLayout': function (component) {
        return wrap(component.type,
            '<div class="pdPluscssSlider ' + sliderControls(component.slidercontols) + '">' +
                '<div class="' + containerClass(component.isContainer) + '">' +
                    region('experience-cssSliderLayout', renderList(component.components)) +
                '</div>' +
            '</div>');
    }
};

function renderComponent(component) {
    var render = renderers[component.type];
    if (!render) {
        return '<div class="experience-component">Unsupported component ' + esc(component.type) + '</div>';
    }
    return render(component);
}

function renderList(components) {
    return (components || []).map(renderComponent).join('');
}

function configRows(components, depth) {
    return (components || []).map(function (component) {
        var attrs = Object.keys(component).filter(function (key) {
            return key !== 'type' && key !== 'name' && key !== 'components';
        }).map(function (key) {
            return '<li><code>' + esc(key) + '</code> ' + esc(component[key]) + '</li>';
        }).join('');
        var children = component.components ? configRows(component.components, depth + 1) : '';
        return '<section class="pd-config-item" style="margin-left:' + (depth * 16) + 'px">' +
            '<h3>' + esc(component.name || component.type) + '</h3>' +
            '<p><code>' + esc(component.type) + '</code></p>' +
            '<ul>' + attrs + '</ul>' +
            children +
        '</section>';
    }).join('');
}

function renderStorefrontNext(page) {
    var hero = page.hero || {};
    var categories = page.categories || {};
    var categoryCards = (categories.items || []).map(function (item) {
        return '<a class="rc-cat" href="#' + esc(String(item.label || '').toLowerCase().replace(/\s+/g, '-')) + '">' +
            '<img src="' + esc(item.image) + '" alt="' + esc(item.label) + '" />' +
            '<span>' + esc(item.label) + '</span>' +
        '</a>';
    }).join('');
    var stories = (page.stories || []).map(function (item) {
        return '<article class="rc-story">' +
            '<div class="rc-story-media"><img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" /></div>' +
            '<h3>' + esc(item.title) + '</h3>' +
            '<p>' + esc(item.text) + '</p>' +
        '</article>';
    }).join('');
    var campaign = page.campaign || {};
    var promos = (page.promos || []).map(function (item) {
        return '<article class="rc-promo">' +
            '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" />' +
            '<div class="rc-promo-copy">' +
                '<p>' + esc(item.text) + '</p>' +
                '<h3>' + esc(item.title) + '</h3>' +
                '<a class="rc-btn rc-btn-navy" href="' + esc(item.href || '#') + '">' + esc(item.button) + '</a>' +
            '</div>' +
        '</article>';
    }).join('');
    var editorial = page.editorial || {};

    return '<section class="rc-hero">' +
            '<div class="rc-hero-copy">' +
                '<h1>' + esc(hero.title) + '</h1>' +
                '<p>' + esc(hero.text) + '</p>' +
                '<a class="rc-btn rc-btn-accent" href="' + esc(hero.href || '#') + '">' + esc(hero.button) + '</a>' +
            '</div>' +
            '<div class="rc-hero-media" style="background-image:url(\'' + esc(hero.image) + '\')"></div>' +
        '</section>' +
        '<section class="rc-section" id="categories">' +
            '<div class="rc-section-head">' +
                '<h2>' + esc(categories.title) + '</h2>' +
                '<p>' + esc(categories.subtitle) + '</p>' +
            '</div>' +
            '<div class="rc-carousel">' +
                '<button class="rc-carousel-btn" type="button" data-dir="-1" aria-label="Previous slide">&#8249;</button>' +
                '<div class="rc-carousel-track">' + categoryCards + '</div>' +
                '<button class="rc-carousel-btn" type="button" data-dir="1" aria-label="Next slide">&#8250;</button>' +
            '</div>' +
        '</section>' +
        '<section class="rc-section rc-stories">' + stories + '</section>' +
        '<section class="rc-campaign" style="background-image:url(\'' + esc(campaign.image) + '\')">' +
            '<div class="rc-campaign-copy">' +
                '<p class="rc-kicker">' + esc(campaign.kicker) + '</p>' +
                '<h2>' + esc(campaign.title) + '</h2>' +
            '</div>' +
        '</section>' +
        '<section class="rc-section rc-promos">' + promos + '</section>' +
        '<section class="rc-editorial">' +
            '<p class="rc-kicker">' + esc(editorial.kicker) + '</p>' +
            '<h2>' + esc(editorial.title) + '</h2>' +
            '<p>' + esc(editorial.text) + '</p>' +
        '</section>';
}

function render(page) {
    if (page.design === 'storefront-next') {
        return {
            headerbanner: '',
            main: renderStorefrontNext(page),
            config: ''
        };
    }

    var headerComponents = (page.regions && page.regions.headerbanner) || [];
    var mainComponents = (page.regions && page.regions.main) || [];

    return {
        headerbanner: region('experience-headerbanner', renderList(headerComponents)),
        main: region('experience-main', renderList(mainComponents)),
        config: '<div class="container">' +
            '<p class="pd-config-kicker">Page Designer configuration</p>' +
            '<h2>' + esc(page.name) + '</h2>' +
            '<p>Page type <code>' + esc(page.pageType) + '</code> (<code>' + esc(page.pageTypeId) + '</code>). ' +
            'Cartridge path <code>app_page_designer_plus:app_storefront_base</code>.</p>' +
            '<h3>Header banner region</h3>' +
            configRows(headerComponents, 0) +
            '<h3>Main region</h3>' +
            configRows(mainComponents, 0) +
        '</div>'
    };
}

module.exports = {
    render: render
};
