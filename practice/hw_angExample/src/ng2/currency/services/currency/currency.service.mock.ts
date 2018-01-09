export const CurrencyServiceMock = <any> {
  getCurrencyByCode: sinon.stub()
};
CurrencyServiceMock.getCurrencyByCode.withArgs('USD').returns({
  'name': 'United States Dollar',
  'code': 'USD',
  'sign': '\u0024'
});
