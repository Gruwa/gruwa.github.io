export default (ngModule) => {
  let directive = () => {
    return {
      restrict: 'E',
      template: require('./items-selector.html'),
      scope: {
        items: '=',
        selectedItems: '=',
        details: '=',
        selectedHeader: '@',
        labelField: '@?',
        minLength: '@?',
        preSelectedInfo: '@?'
      },
      controller: itemsSelectorController,
      controllerAs: 'vm',
      bindToController: true
    };
  };

  function itemsSelectorController() {
    let vm = this;
    vm.toggleItemSelection = toggleItemSelection;

    function toggleItemSelection(selectedItem, selectionState) {
      if (selectionState && !_.find(vm.selectedItems, { id: selectedItem.id, name: selectedItem.name })) {
        vm.selectedItems.push(selectedItem);
      } else if (!selectionState) {
        vm.selectedItems = removeItem(vm.selectedItems, selectedItem);
      }
    }

    function removeItem(items, removedItem) {
      return _.reject(items, (item: any) => {
        return item.id === removedItem.id && item.name === removedItem.name;
      });
    }
  }

  ngModule.directive('cadItemsSelector', directive);
};
