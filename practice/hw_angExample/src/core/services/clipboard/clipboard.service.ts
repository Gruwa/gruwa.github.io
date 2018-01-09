const KEY_CODES = {
  C: 67
};

export class ClipboardService {
  private text2copy = '';

  constructor(private $document: ng.IDocumentService,
              private $window: ng.IWindowService,
              private $translate: ng.translate.ITranslateService,
              private messageService: any) {
    'ngInject';
  }

  initClipboard() {
    //
    this.$document.on('mouseover', this.getClipboardText.bind(this));
    this.$document.on('keydown', this.selectClipboardText.bind(this));
    this.$document.on('keydown', this.showToaster.bind(this));
    this.$document.on('keyup', this.releaseClipboardText.bind(this));
  }

  private getClipboardText(event) {
    this.text2copy = '';
    let currentElement = angular.element(event.target);
    // traverse through dom to find copy2clipboard attribute
    while (!_.isEmpty(currentElement)) {
      let clipboardAttrValue = currentElement.attr('copy2clipboard');

      if (_.isString(clipboardAttrValue)) {
        if (clipboardAttrValue === '') {
          // In case attribute is defined in cad-smart-tooltip-enable - copy content of element
          this.text2copy = currentElement[0].innerText || currentElement[0].textContent || '';
        } else {
          // In case attribute is defined explicitly - copy it value
          this.text2copy = clipboardAttrValue;
        }

        break;
      }
      currentElement = <ng.IAugmentedJQuery> currentElement.parent();
    }
  }

  private selectClipboardText(event) {
    if (this.text2copy && event.ctrlKey || event.metaKey) {
      // Do not copy if some part of text input is selected
      if (_.includes(['TEXTAREA', 'INPUT'], event.target.nodeName)) {
        return;
      }

      // Do not copy if some text on the page is selected
      if (this.$window.getSelection() && this.$window.getSelection().toString()) {
        return;
      }

      let textarea = angular.element(this.$document[0].querySelector('#clipboard-content'));
      textarea.val(this.text2copy);
      textarea.show();
      textarea.focus();
      textarea.select();

    }
  }

  private releaseClipboardText(event) {
    if (event.target.id === 'clipboard-content') {
      angular.element(event.target).hide();
    }
  }

  private showToaster(event) {
    // Checking if ctrl+c/cmd+c was pressed
    if (this.text2copy && (event.ctrlKey || event.metaKey) && event.keyCode === KEY_CODES.C) {
      this.messageService.showSuccessMessage(this.$translate.instant('clipboard.text_copied'));
    }
  }

}
