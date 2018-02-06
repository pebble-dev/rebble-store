import BrowserSprite from 'svg-baker-runtime/browser-sprite';
import domready from 'domready'

const sprite = new BrowserSprite();
domready(() => sprite.mount('#svgContainer'))

export default sprite;