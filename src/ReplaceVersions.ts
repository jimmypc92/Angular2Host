import URL = require('url');
import * as debug from 'debug';

export function replaceVersions(req, res, next): void {
    console.log('Before version replace: ' + req.url);
    let url = URL.parse(req.url);
    let parsed = url.pathname.replace(/v\d+\.\d+\.\d+\.js/g, 'js');
    req.url = url.pathname + (url.search || '') + (url.hash || '');
    console.log('After version replace: ' + req.url);

    next();
}