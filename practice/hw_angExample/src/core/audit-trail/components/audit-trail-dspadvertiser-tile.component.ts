export const auditTrailDspadvertiserTileComponent: ng.IComponentOptions = {
  template: require(`./audit-trail-dspadvertiser-tile.html`),
  controllerAs: 'vm',
  bindings: {
    title: '<',
    value: '<',
    searchQuery: '<' // text that used in filtering (searching)
  }
};
