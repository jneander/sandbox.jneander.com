import { bundle } from 'js/bundlers/StaticBundler';
import Spreadsheet from 'js/apps/spreadsheet';

bundle({
  render ($container) {
    Spreadsheet.render($container);
  }
});
