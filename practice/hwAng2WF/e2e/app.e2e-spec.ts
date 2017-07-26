import { HwAng2WFPage } from './app.po';

describe('hw-ang2-wf App', () => {
  let page: HwAng2WFPage;

  beforeEach(() => {
    page = new HwAng2WFPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
