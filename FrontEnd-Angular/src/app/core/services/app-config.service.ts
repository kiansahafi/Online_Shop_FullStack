import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppConfigService {
  // endpoints
  apiVersion: number;

  // captcha settings
  captchaApi: string;

  // snackbar settings
  hasSnackbar: boolean;
  snackbarDefaultMessage: string;
  snackbarInfoMessage: string;
  snackbarSuccessMessage: string;
  snackbarDangerMessage: string;
  snackbarWarningMessage: string;
  // tslint:disable-next-line:member-ordering
  static snackbarDuration = 2500;
  // tslint:disable-next-line:member-ordering
  static snackbarClass = 'alert-default';

  // pagination settings
  pageSize: number;
  pageSizes: number[];
  // tslint:disable-next-line:member-ordering
  static itemsPerPageLabel = 'items in the page';
  // tslint:disable-next-line:member-ordering
  static lastPageLabel = 'go to the last page';
  // tslint:disable-next-line:member-ordering
  static firstPageLabel = 'go to the first page';
  // tslint:disable-next-line:member-ordering
  static nextPageLabel = 'next page';
  // tslint:disable-next-line:member-ordering
  static previousPageLabel = 'previous page';

  // CRUD
  operations: string;
  editItem: string;
  deleteItem: string;
  detailItem: string;
  addItem: string;

  // window
  close: string;
  back: string;

  // map setting
  lat: number;
  lng: number;
  zoom: number;
  showZoomControl: boolean;
  streetViewControl: boolean;
  infoWindowCloseAfter: number; // set 0 to unclose

  // image uploader settings
  maxImageFileSize: number;
  maxImageFileSizeErrorMessage: string;
  imagePreview: boolean;
  imageUploadSuccessMessage: string;

  // image gallery settings
  galleryWidth: string;
  galleryHeight: string;
  galleryThumbnailsColumns: number;
  galleryImageAnimation: any;
  imageUrl: string;
  iconUrl: string;

  // Comment and Score settings
  commentsPageSize: number;

  // no image
  noImageUrl: string;
  noAvatar: string;

  // filter settings
  filterFieldMaxCount: number;

  constructor() {
    // endpoints
    this.apiVersion = 2;

    // captcha settings

    // snackbar settings
    this.hasSnackbar = true;
    this.snackbarDefaultMessage = 'this is a default alert message!';
    this.snackbarInfoMessage = 'this is an info messae';
    this.snackbarSuccessMessage = 'operation was successful!';
    this.snackbarDangerMessage = 'operation had an error!';
    this.snackbarWarningMessage = 'this is a warning!';

    // pagination settings
    this.pageSize = 5;
    this.pageSizes = [5, 10, 25, 50, 100];

    // CRUD
    this.operations = 'operations';
    this.editItem = 'edit Item';
    this.deleteItem = 'delete Item';
    this.detailItem = 'detail Item';
    this.addItem = 'add Item';

    // window
    this.close = 'Close';
    this.back = 'back';

    // map setting
    this.lat = 36.679781;
    this.lng = 48.491512;
    this.zoom = 14;
    this.showZoomControl = true;
    this.streetViewControl = false;
    this.infoWindowCloseAfter = 8000;

    // image uploader settings
    this.maxImageFileSize = 2000000;
    this.maxImageFileSizeErrorMessage = 'the image is too large!';
    this.imagePreview = true;
    this.imageUploadSuccessMessage = 'image upload Success!';

    // image gallery settings
    this.galleryWidth = '100%';
    this.galleryHeight = '400px';
    this.galleryThumbnailsColumns = 4;

    // Comment and Score settings
    this.commentsPageSize = 5;

    // no image
    this.noImageUrl = './assets/images/no-image/emptyImg.jpg';
    this.noAvatar = './assets/svg/unknown-user.svg';

    // filter settings
    this.filterFieldMaxCount = 3;
  }
}
