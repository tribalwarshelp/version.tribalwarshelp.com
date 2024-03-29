import * as NAMESPACES from 'config/namespaces';
import common from './common';
import indexPage from './index-page';
import searchPage from './search-page';
import notFoundPage from './not-found-page';
import serverPage from './server-page';
import datePicker from './date-picker';
import table from './table';
import lineChart from './line-chart';

const translations = {
  [NAMESPACES.COMMON]: common,
  [NAMESPACES.INDEX_PAGE]: indexPage,
  [NAMESPACES.SEARCH_PAGE]: searchPage,
  [NAMESPACES.NOT_FOUND_PAGE]: notFoundPage,
  [NAMESPACES.TABLE]: table,
  [NAMESPACES.DATE_PICKER]: datePicker,
  [NAMESPACES.LINE_CHART]: lineChart,
  ...serverPage,
};

export default translations;
