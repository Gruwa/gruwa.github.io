declare namespace cad {
  interface IFormController extends ng.IFormController {
    isModified?: boolean;
    restartChangesTracking?: Function;
  }
}
