'use strict';

/**
 * Compiles every webpack config of a given name.
 * sgmf-scripts only uses the first matching config, which skips app_page_designer_plus.
 *
 * Usage: node bin/compile-cartridges.js js|scss
 */

var webpack = require('webpack');
var configs = require('../webpack.config.js');
var configType = process.argv[2];

if (configType !== 'js' && configType !== 'scss') {
    console.error('Usage: node bin/compile-cartridges.js js|scss');
    process.exit(1);
}

var selected = configs.filter(function (config) {
    return config.name === configType;
});

if (!selected.length) {
    console.error('No webpack config named "' + configType + '"');
    process.exit(1);
}

selected.forEach(function (config) {
    if (config.mode === 'production') {
        config.optimization = Object.assign({}, config.optimization, { minimize: false });
    }
});

webpack(selected, function (err, stats) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(stats.toString({
        colors: false,
        chunks: false,
        modules: false,
        assets: false
    }));

    if (stats.hasErrors()) {
        process.exit(1);
    }
});
