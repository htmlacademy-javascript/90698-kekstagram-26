import {renderPictureList} from'./small-picture.js';
import './form-upload.js';
import { getData} from './api.js';
import {showAlert} from './util.js';
import { showFilters } from './filter.js';
import{setFileFormSubmit} from './form-upload.js';
const onGetDataSuccess=(data)=>{
  renderPictureList(data);
  showFilters(data);
};
setFileFormSubmit();
getData(onGetDataSuccess, showAlert);

