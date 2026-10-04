const fs = require('fs');
const path = require('path');

const outDir = path.join('page-designer-pages');
fs.mkdirSync(outDir, { recursive: true });

function image(file) {
    return { path: file, focal_point: { x: 0.5, y: 0.5 } };
}
function color(hex) {
    return { value: hex };
}
function cat(id) {
    return "$url('Search-Show','cgid','" + id + "')$";
}

const photos = {
    banner: 'images/homepage/homepage-4/large.jpg',
    wide: 'images/homepage/homepage-2/large.jpg',
    home: 'images/homepage/homepage-1/large.jpg',
    portrait: 'images/homepage/homepage-3/large.jpg',
    dress: 'images/homepage/homepage-5/large.jpg',
    jewel: 'images/homepage/homepage-6/large.jpg',
    m1: 'images/homepage/homepage-1/medium.jpg',
    m2: 'images/homepage/homepage-2/medium.jpg',
    m5: 'images/homepage/homepage-5/medium.jpg',
    m6: 'images/homepage/homepage-6/medium.jpg'
};

function links(items) {
    if (!items.length) return '';
    return '<content-links>\n' + items.map(function (item, index) {
        return '            <content-link content-id="' + item.id + '" type="' + item.type + '">\n                <position>' + index.toFixed(1) + '</position>\n            </content-link>';
    }).join('\n') + '\n        </content-links>';
}

function block(id, name, type, data, children) {
    return '    <content content-id="' + id + '">\n' +
        '        <display-name xml:lang="x-default">' + name + '</display-name>\n' +
        '        <online-flag>true</online-flag>\n' +
        '        <searchable-flag>false</searchable-flag>\n' +
        '        <page-attributes/>\n' +
        '        ' + links(children || []) + '\n' +
        '        <sitemap-included-flag>false</sitemap-included-flag>\n' +
        '        <type>' + type + '</type>\n' +
        '        <config>{"visibility":[]}</config>\n' +
        '        <data xml:lang="x-default"><![CDATA[' + JSON.stringify(data || {}) + ']]></data>\n' +
        '    </content>';
}

function library(entries) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<library xmlns="http://www.demandware.com/xml/impex/library/2006-10-31">\n' +
        entries.join('\n') + '\n</library>\n';
}

function page(id, name, children) {
    return block(id, name, 'page.pdPlusStorePage', {}, children.map(function (child) {
        return { id: child, type: 'page.pdPlusStorePage.main' };
    }));
}

function parallax(id, title, text, button, photo, align) {
    return block(id, title, 'component.pd_assets.pdPlusParallaxScrolling', {
        ParallaxScrTextSection: '<h2>' + title + '</h2><p>' + text + '</p>',
        ParallaxScrbtn: button,
        ParallaxScrimg: image(photo),
        textAlignment: align || 'center',
        textColor: color('#ffffff'),
        tileLink: cat('newarrivals'),
        parallaxSection: 'Parallax',
        sectionHeight: '70vh',
        btnbgColor: color('#ea580c'),
        btntextColor: color('#ffffff'),
        btnBorderColor: color('#ea580c')
    });
}

function textImage(id, title, copy, button, photo, side) {
    return block(id, title, 'component.pd_assets.pdPlusTextWithImage', {
        textXaxisAlignment: side,
        textAlignmentVertical: 'center',
        imgFile: image(photo),
        imgAlt: title,
        richText: '<h2>' + title + '</h2><p>' + copy + '</p>',
        buttonText: button,
        tileLink: cat('womens'),
        buttonBgColor: color('#003963'),
        buttonTextColor: color('#ffffff'),
        buttonBorderColor: color('#003963')
    });
}

function slide(id, number, title, photo) {
    return block(id, title, 'component.pd_assets.pdPlusCssSlider', {
        cssSliderNo: 'slide' + number,
        imgFile: image(photo),
        imageYPos: 'center',
        imageXPos: 'left',
        slideContent: '<h2>' + title + '</h2><p>A Page Designer Plus slide with sample merchandising copy.</p>',
        sliderTextColor: color('#ffffff'),
        buttontext: 'Shop now',
        tileLink: cat('newarrivals'),
        btnBgColor: color('#ea580c'),
        btnTextColor: color('#ffffff'),
        buttonBorderColor: color('#ea580c')
    });
}

const files = {};

files['onecolumnparallaxdemo.xml'] = library([
    page('onecolumnparallaxdemo', 'One Column Parallax Demo', ['onecolumnparallaxdemo-hero']),
    parallax('onecolumnparallaxdemo-hero', 'One column parallax', 'A full-width Page Designer Plus parallax section with a banner image, headline, and button.', 'Explore the edit', photos.banner, 'left')
]);

files['twoColumnParallaxDemo.xml'] = library([
    page('twoColumnParallaxDemo', 'Two Column Parallax Demo', ['twoColumnParallaxDemo-grid']),
    block('twoColumnParallaxDemo-grid', 'Two column grid', 'component.pd_layouts.pdPlusGrid2r1c', { isContainer: false }, [
        { id: 'twoColumnParallaxDemo-a', type: 'component.pd_layouts.pdPlusGrid2r1c.pdPlusColumn1' },
        { id: 'twoColumnParallaxDemo-b', type: 'component.pd_layouts.pdPlusGrid2r1c.pdPlusColumn2' }
    ]),
    parallax('twoColumnParallaxDemo-a', 'Womens', 'Parallax column for the womens edit.', 'Shop womens', photos.wide, 'center'),
    parallax('twoColumnParallaxDemo-b', 'Mens', 'Parallax column for the mens edit.', 'Shop mens', photos.portrait, 'center')
]);

files['threeColumnParallaxDemo.xml'] = library([
    page('threeColumnParallaxDemo', 'Three Column Parallax Demo', ['threeColumnParallaxDemo-grid']),
    block('threeColumnParallaxDemo-grid', 'Three column grid', 'component.pd_layouts.pdPlusGrid3r1c', { isContainer: false }, [
        { id: 'threeColumnParallaxDemo-a', type: 'component.pd_layouts.pdPlusGrid3r1c.column1' },
        { id: 'threeColumnParallaxDemo-b', type: 'component.pd_layouts.pdPlusGrid3r1c.column2' },
        { id: 'threeColumnParallaxDemo-c', type: 'component.pd_layouts.pdPlusGrid3r1c.column3' }
    ]),
    parallax('threeColumnParallaxDemo-a', 'New', 'Fresh arrivals in a parallax column.', 'Shop new', photos.home, 'center'),
    parallax('threeColumnParallaxDemo-b', 'Fashion', 'Dresses and layers.', 'Shop fashion', photos.dress, 'center'),
    parallax('threeColumnParallaxDemo-c', 'Jewelry', 'Finish the look.', 'Shop jewelry', photos.jewel, 'center')
]);

files['pdplus-flexible-row.xml'] = library([
    page('pdplus-flexible-row', 'PD Plus Flexible Row', ['pdplus-flexible-row-item']),
    block('pdplus-flexible-row-item', 'Flexible row', 'component.pd_assets.pdPlusFlexibleRow', {
        image1: image(photos.m1), title1: 'At home', text1: 'Comfortable pieces for every room.', link1: cat('womens'),
        image2: image(photos.m5), title2: 'Fashion', text2: 'Color, tailoring, and new layers.', link2: cat('newarrivals'),
        image3: image(photos.m6), title3: 'Accessories', text3: 'Jewelry and finishing details.', link3: cat('womens-jewelry')
    })
]);

files['pdplus-header-navigation.xml'] = library([
    page('pdplus-header-navigation', 'PD Plus Header Navigation', ['pdplus-header-navigation-item']),
    block('pdplus-header-navigation-item', 'Header navigation', 'component.pd_assets.pdPlusHeaderNavigation', {
        heading: 'Shop',
        label1: 'New Arrivals', link1: cat('newarrivals'),
        label2: 'Womens', link2: cat('womens'),
        label3: 'Mens', link3: cat('mens'),
        label4: 'Electronics', link4: cat('electronics'),
        label5: 'Top Sellers', link5: cat('womens-clothing')
    })
]);

files['pdplus-masonry.xml'] = library([
    page('pdplus-masonry', 'PD Plus Masonry', ['pdplus-masonry-item']),
    block('pdplus-masonry-item', 'Masonry', 'component.pd_assets.pdPlusMasonry', {
        heading: 'The lookbook',
        image1: image(photos.portrait), caption1: 'Tailoring',
        image2: image(photos.dress), caption2: 'Color',
        image3: image(photos.home), caption3: 'Home',
        image4: image(photos.jewel), caption4: 'Jewelry',
        image5: image(photos.wide), caption5: 'Campaign'
    })
]);

files['pdplus-media-gallery.xml'] = library([
    page('pdplus-media-gallery', 'PD Plus Media Gallery', ['pdplus-media-gallery-item']),
    block('pdplus-media-gallery-item', 'Media gallery', 'component.pd_assets.pdPlusMediaGallery', {
        heading: 'Media gallery',
        intro: 'A featured banner with supporting photos from the shared library.',
        feature: image(photos.banner),
        featureAlt: 'Campaign banner',
        image2: image(photos.m5),
        image3: image(photos.m6),
        image4: image(photos.m1)
    })
]);

files['pdplus-shopbyinterest.xml'] = library([
    page('pdplus-shopbyinterest', 'PD Plus Shop By Interest', ['pdplus-shopbyinterest-item']),
    block('pdplus-shopbyinterest-item', 'Shop by interest', 'component.pd_assets.pdPlusShopByInterest', {
        heading: 'Shop by interest',
        subheading: 'Start with the edit that fits the way you shop.',
        image1: image(photos.dress), title1: 'Fashion', link1: cat('womens'),
        image2: image(photos.portrait), title2: 'Mens', link2: cat('mens'),
        image3: image(photos.home), title3: 'Home', link3: cat('newarrivals'),
        image4: image(photos.jewel), title4: 'Jewelry', link4: cat('womens-jewelry')
    })
]);

files['photogallery.xml'] = library([
    page('photogallery', 'Photo Gallery', ['photogallery-item']),
    block('photogallery-item', 'Photo gallery', 'component.pd_assets.pdPlusPhotoGallery', {
        heading: 'Photo gallery',
        image1: image(photos.wide), caption1: 'Campaign',
        image2: image(photos.portrait), caption2: 'Portrait',
        image3: image(photos.dress), caption3: 'Dresses',
        image4: image(photos.jewel), caption4: 'Jewelry'
    })
]);

files['pdplustwocolumnboxitem.xml'] = library([
    page('pdplustwocolumnboxitem', 'PD Plus Two Column Box', ['pdplustwocolumnboxitem-item']),
    block('pdplustwocolumnboxitem-item', 'Two column box', 'component.pd_assets.pdPlusTwoColumnBox', {
        image1: image(photos.home),
        title1: 'Make your space yours',
        text1: '<p>Sample copy for a two-column content box. Swap the image and text in Page Designer.</p>',
        button1: 'Shop fashion',
        link1: cat('womens'),
        image2: image(photos.jewel),
        title2: 'Power up your everyday',
        text2: '<p>A second box for electronics, accessories, or a campaign story.</p>',
        button2: 'Explore electronics',
        link2: cat('electronics')
    })
]);

files['pdplustextandimage.xml'] = library([
    page('pdplustextandimage', 'PD Plus Text and Image', ['pdplustextandimage-layout']),
    block('pdplustextandimage-layout', 'Text and image layout', 'component.pd_layouts.pdPlusTextImageLayout', { isContainer: false }, [
        { id: 'pdplustextandimage-item', type: 'component.pd_layouts.pdPlusTextImageLayout.pdPlusTextWithImage' }
    ]),
    textImage('pdplustextandimage-item', 'Text with image', 'Headline and supporting copy sit beside a library photo. The button uses the navy storefront color.', 'View the edit', photos.portrait, 'text on left')
]);

files['pdplustextandimage_demo.xml'] = library([
    page('pdplustextandimage-demo', 'PD Plus Text and Image Demo', ['pdplustextandimage-demo-layout']),
    block('pdplustextandimage-demo-layout', 'Text and image demo layout', 'component.pd_layouts.pdPlusTextImageLayout', { isContainer: false }, [
        { id: 'pdplustextandimage-demo-item', type: 'component.pd_layouts.pdPlusTextImageLayout.pdPlusTextWithImage' }
    ]),
    textImage('pdplustextandimage-demo-item', 'Image on the left', 'The same component with the copy on the right, for a second story on the page.', 'Shop the look', photos.wide, 'text on right')
]);

function sliderPage(pageId, name, prefix, slides) {
    const slideIds = slides.map(function (item, index) { return prefix + '-slide-' + (index + 1); });
    return library([
        page(pageId, name, [prefix + '-layout']),
        block(prefix + '-layout', name + ' slider', 'component.pd_layouts.pdPluscssSliderLayout', {
            isContainer: false,
            slidercontols: 'arrows & pagination'
        }, slideIds.map(function (id) {
            return { id: id, type: 'component.pd_layouts.pdPluscssSliderLayout.cssSliderLayout' };
        })),
        slide(slideIds[0], 1, slides[0].title, slides[0].photo),
        slide(slideIds[1], 2, slides[1].title, slides[1].photo),
        slide(slideIds[2], 3, slides[2].title, slides[2].photo)
    ]);
}

files['pdpluscsssliderdemo.xml'] = sliderPage('pdpluscsssliderdemo', 'PD Plus CSS Slider Demo', 'pdpluscsssliderdemo', [
    { title: 'The studio sale', photo: photos.banner },
    { title: 'Light layers', photo: photos.wide },
    { title: 'New color', photo: photos.dress }
]);
files['pdplusslider.xml'] = sliderPage('pdplusslider', 'PD Plus Slider', 'pdplusslider', [
    { title: 'Spring edit', photo: photos.wide },
    { title: 'Tailoring', photo: photos.portrait },
    { title: 'Accessories', photo: photos.jewel }
]);
files['pdplusslider_demo.xml'] = sliderPage('pdplusslider-demo', 'PD Plus Slider Demo', 'pdplussliderdemo', [
    { title: 'Campaign one', photo: photos.banner },
    { title: 'Campaign two', photo: photos.home },
    { title: 'Campaign three', photo: photos.m5 }
]);

files['tabcomponents.xml'] = library([
    page('tabcomponents', 'Tab Components', ['tabcomponents-layout']),
    block('tabcomponents-layout', 'Tabs', 'component.pd_layouts.pdPlusTabsLayout', {
        isContainer: false,
        layoutTabs: 'horizontal'
    }, [
        { id: 'tabcomponents-women', type: 'component.pd_layouts.pdPlusTabsLayout.pdPlusTabsLayout' },
        { id: 'tabcomponents-men', type: 'component.pd_layouts.pdPlusTabsLayout.pdPlusTabsLayout' },
        { id: 'tabcomponents-home', type: 'component.pd_layouts.pdPlusTabsLayout.pdPlusTabsLayout' }
    ]),
    block('tabcomponents-women', 'Women', 'component.pd_assets.pdPlusTabs', {
        tabTitle: 'Women',
        tabDescription: '<p>Dresses, layers, and color for the new season.</p>',
        tabTextColor: color('#003963'),
        tabBorderColor: color('#ea580c')
    }),
    block('tabcomponents-men', 'Men', 'component.pd_assets.pdPlusTabs', {
        tabTitle: 'Men',
        tabDescription: '<p>Jackets with a cleaner shoulder and easy trousers.</p>',
        tabTextColor: color('#003963'),
        tabBorderColor: color('#ea580c')
    }),
    block('tabcomponents-home', 'Home', 'component.pd_assets.pdPlusTabs', {
        tabTitle: 'Home',
        tabDescription: '<p>Objects and textiles for a considered room.</p>',
        tabTextColor: color('#003963'),
        tabBorderColor: color('#ea580c')
    })
]);

Object.keys(files).forEach(function (name) {
    fs.writeFileSync(path.join(outDir, name), files[name]);
});
console.log('wrote ' + Object.keys(files).length + ' library files');
