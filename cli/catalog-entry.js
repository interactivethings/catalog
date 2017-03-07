import {render} from '../src/index';
import config from './catalog.config.js'; // will be replaced by webpack

render(config, document.getElementById('root'));
