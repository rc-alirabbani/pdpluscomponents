'use strict';

var fs = require('fs');
var http = require('http');
var path = require('url');
var nodePath = require('path');
var renderPage = require('./render').render;

var projectRoot = nodePath.resolve(__dirname, '..');
var port = Number(process.env.PORT) || 4173;
var cartridges = ['app_page_designer_plus', 'app_storefront_base'];

var vendorRoots = {
    '/vendor/jquery/': nodePath.join(projectRoot, 'node_modules/jquery/dist'),
    '/vendor/bootstrap/': nodePath.join(projectRoot, 'node_modules/bootstrap/dist'),
    '/vendor/font-awesome/': nodePath.join(projectRoot, 'node_modules/font-awesome')
};

var types = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

function safeJoin(root, requestPath) {
    var decoded = decodeURIComponent(requestPath.split('?')[0]);
    var file = nodePath.normalize(nodePath.join(root, decoded));
    if (file !== root && file.indexOf(root + nodePath.sep) !== 0) {
        return null;
    }
    return file;
}

function cartridgeFile(urlPath) {
    var relative = urlPath.replace(/^\//, '');
    for (var i = 0; i < cartridges.length; i++) {
        var root = nodePath.join(projectRoot, 'cartridges', cartridges[i], 'cartridge', 'static', 'default');
        var file = safeJoin(root, relative);
        if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
            return file;
        }
    }
    return null;
}

function send(res, status, body, type) {
    res.writeHead(status, {
        'Content-Type': type || 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache'
    });
    res.end(body);
}

function sendFile(res, file) {
    var type = types[nodePath.extname(file).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-cache'
    });
    fs.createReadStream(file).pipe(res);
}

function storefrontHtml() {
    var page = JSON.parse(fs.readFileSync(nodePath.join(__dirname, 'page.json'), 'utf8'));
    var rendered = renderPage(page);
    var template = fs.readFileSync(nodePath.join(__dirname, 'storefront.html'), 'utf8');
    return template
        .replace('<!--HEADERBANNER-->', rendered.headerbanner)
        .replace('<!--MAIN-->', rendered.main)
        .replace('<!--CONFIG-->', rendered.config)
        .split('<!--PAGETITLE-->').join(page.name || 'Storefront');
}

var server = http.createServer(function (req, res) {
    var urlPath = path.parse(req.url).pathname;

    if (urlPath === '/' || urlPath === '/storefront') {
        send(res, 200, storefrontHtml(), 'text/html; charset=utf-8');
        return;
    }

    if (urlPath === '/page.json') {
        sendFile(res, nodePath.join(__dirname, 'page.json'));
        return;
    }

    if (urlPath.indexOf('/preview-assets/') === 0) {
        var asset = safeJoin(nodePath.join(__dirname, 'assets'), urlPath.replace('/preview-assets/', ''));
        if (asset && fs.existsSync(asset) && fs.statSync(asset).isFile()) {
            sendFile(res, asset);
            return;
        }
        send(res, 404, 'Not found');
        return;
    }

    var vendorPrefix = Object.keys(vendorRoots).filter(function (prefix) {
        return urlPath.indexOf(prefix) === 0;
    })[0];
    if (vendorPrefix) {
        var vendorFile = safeJoin(vendorRoots[vendorPrefix], urlPath.slice(vendorPrefix.length));
        if (vendorFile && fs.existsSync(vendorFile) && fs.statSync(vendorFile).isFile()) {
            sendFile(res, vendorFile);
            return;
        }
        send(res, 404, 'Not found');
        return;
    }

    var fromCartridge = cartridgeFile(urlPath);
    if (fromCartridge) {
        sendFile(res, fromCartridge);
        return;
    }

    send(res, 404, 'Not found');
});

server.listen(port, '127.0.0.1', function () {
    console.log('Storefront preview at http://127.0.0.1:' + port + '/');
});
