import { PolicePage } from './app.po';

describe('police App', () => {
  let page: PolicePage;

  beforeEach(() => {
    page = new PolicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
