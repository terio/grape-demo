import {renderToString} from 'grape/lib/dom/server';
import grape from 'grape';
import App from '../client/components/app';
import appTemplate from './templates/app';
import Koa from 'koa';
import KoaStaticMiddleware from 'koa-static';
import paths from '../webpack/paths.babel';
import {resolve} from 'path';
import compress from 'koa-compress';

const app = new Koa;

const EXTENSION_REGEX = /\.([a-z]+)$/;
function statsToAssets(stats) {
    return Object.entries(stats.assetsByChunkName)
        .reduce((assets, [key, value]) => {
            value = Array.isArray(value) ? value : [value];
            assets[key] = assets[key] || {};
            for(const fileName of value) {
                const extension = EXTENSION_REGEX.exec(fileName);
                if(extension) {
                    assets[key][extension[1]] = assets[key][extension[1]] || [];
                    assets[key][extension[1]].push(fileName);
                }
            }
            return assets;
        }, {});
}

const stats = __non_webpack_require__(resolve(paths.CLIENT_BUILD, 'stats.json'));
const assets = statsToAssets(stats);
const rootComponent = <App/>;

app.use(compress());
app.use(KoaStaticMiddleware(paths.CLIENT_BUILD));

app.use(async ctx => {
    ctx.body = appTemplate({
        renderedAppString: renderToString(rootComponent, true),
        assets
    });
});

app.listen(8080);
