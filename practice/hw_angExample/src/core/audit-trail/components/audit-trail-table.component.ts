export const auditTrailTableComponent: ng.IComponentOptions = {
  template: require(`./audit-trail-table.html`),
  controllerAs: 'vm',
  bindings: {
    logs: '<', // object with log information received from BE
    searchQuery: '<', // text that used in filtering (searching)
    detailsPageSize: '<' // number of elements to display for one log action, other elements are hidden
  }
};
