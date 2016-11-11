import { DsOutletPage } from './app.po';

describe('ds-outlet App', function() {
  let page: DsOutletPage;

  beforeEach(() => {
    page = new DsOutletPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
