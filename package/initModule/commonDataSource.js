import HttpFactory from '../methods/httpFactory';
import {getCookiesItem} from '../methods/utils/methods';

const apiService = new HttpFactory();
const appName = '/' + (getCookiesItem('appName') || 'djsupplier').toLowerCase();

const MENU_CACHE = apiService.get(appName+'/firstPage/getWebFirstPageAll.do');
const PERSONAL_INF_CACHE = apiService.get(appName+'/personalCenter/getPersonalInformation.do');


export default {
  MENU_CACHE,
  PERSONAL_INF_CACHE,
};
