'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('sgmf-scripts').webpack;
var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
var jsFiles = require('sgmf-scripts').createJsPath();
var scssFiles = require('sgmf-scripts').createScssPath();

var bootstrapPackages = {
    Alert: 'exports-loader?Alert!bootstrap/js/src/alert',
    // Button: 'exports-loader?Button!bootstrap/js/src/button',
    Carousel: 'exports-loader?Carousel!bootstrap/js/src/carousel',
    Collapse: 'exports-loader?Collapse!bootstrap/js/src/collapse',
    // Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown',
    Modal: 'exports-loader?Modal!bootstrap/js/src/modal',
    // Popover: 'exports-loader?Popover!bootstrap/js/src/popover',
    Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/src/scrollspy',
    Tab: 'exports-loader?Tab!bootstrap/js/src/tab',
    // Tooltip: 'exports-loader?Tooltip!bootstrap/js/src/tooltip',
    Util: 'exports-loader?Util!bootstrap/js/src/util'
};

var plusCartridge = 'app_page_designer_plus';
var baseScss = path.resolve(__dirname, 'cartridges/app_storefront_base/cartridge/client/default/scss');
var baseJs = path.resolve(__dirname, 'cartridges/app_storefront_base/cartridge/client/default/js');

/**
 * Collect files under a directory.
 * @param {string} dir Directory to walk
 * @param {string[]} files Accumulator
 * @returns {string[]} File paths
 */
function walk(dir, files) {
    if (!fs.existsSync(dir)) {
        return files;
    }

    fs.readdirSync(dir).forEach(function (name) {
        var full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
            walk(full, files);
        } else {
            files.push(full);
        }
    });

    return files;
}

/**
 * Webpack entries for a cartridge's client JS.
 * Output names match SFRA static URLs: default/js/<file>.js
 * @param {string} cartridge Cartridge folder name
 * @returns {Object} Entry map
 */
function cartridgeJsEntries(cartridge) {
    var clientDir = path.resolve(__dirname, 'cartridges', cartridge, 'cartridge', 'client');
    var entries = {};

    walk(clientDir, []).forEach(function (file) {
        if (path.extname(file) !== '.js') {
            return;
        }

        var rel = path.relative(clientDir, file).split(path.sep).join('/');
        entries[rel.replace(/\.js$/, '')] = file;
    });

    return entries;
}

/**
 * Webpack entries for a cartridge's client SCSS, skipping partials.
 * Output names match SFRA static URLs: default/css/<file>.css
 * @param {string} cartridge Cartridge folder name
 * @returns {Object} Entry map
 */
function cartridgeScssEntries(cartridge) {
    var clientDir = path.resolve(__dirname, 'cartridges', cartridge, 'cartridge', 'client');
    var entries = {};

    walk(clientDir, []).forEach(function (file) {
        if (path.extname(file) !== '.scss' || path.basename(file).charAt(0) === '_') {
            return;
        }

        var rel = path.relative(clientDir, file).split(path.sep).join('/');
        entries[rel.replace('/scss/', '/css/').replace(/\.scss$/, '')] = file;
    });

    return entries;
}

/**
 * Shared SCSS loader chain. `~base/...` resolves to the storefront base SCSS tree.
 * @returns {Object[]} Webpack loader chain
 */
function scssUse() {
    return ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader',
            options: {
                url: false,
                minimize: true
            }
        }, {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer')()
                ]
            }
        }, {
            loader: 'sass-loader',
            options: {
                implementation: require('sass'),
                includePaths: [
                    path.resolve('node_modules'),
                    path.resolve('node_modules/flag-icon-css/sass')
                ]
            }
        }]
    });
}

module.exports = [{
    mode: 'production',
    name: 'js',
    entry: jsFiles,
    output: {
        path: path.resolve('./cartridges/app_storefront_base/cartridge/static'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /bootstrap(.)*\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [new webpack.ProvidePlugin(bootstrapPackages)]
}, {
    mode: 'none',
    name: 'scss',
    entry: scssFiles,
    output: {
        path: path.resolve('./cartridges/app_storefront_base/cartridge/static'),
        filename: '[name].css'
    },
    resolve: {
        alias: {
            base: baseScss
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: scssUse()
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' })
    ]
}, {
    mode: 'none',
    name: 'js',
    entry: cartridgeJsEntries(plusCartridge),
    output: {
        path: path.resolve('./cartridges/' + plusCartridge + '/cartridge/static'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            base: baseJs
        }
    }
}, {
    mode: 'none',
    name: 'scss',
    entry: cartridgeScssEntries(plusCartridge),
    output: {
        path: path.resolve('./cartridges/' + plusCartridge + '/cartridge/static'),
        filename: '[name].css'
    },
    resolve: {
        alias: {
            base: baseScss
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: scssUse()
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' })
    ]
}];
