/**
 * Use PopupComponentController as base controller class for specific popup instance
 */
export abstract class PopupComponentController<T, G> {
  protected readonly resolve: T;
  private readonly modalInstance: ng.ui.bootstrap.IModalServiceInstance;

  protected close(result?: G): void {
    this.modalInstance.close(result);
  }

  protected dismiss(reason?: string): void {
    this.modalInstance.dismiss(reason);
  }
}
