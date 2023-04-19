import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AuthorComponentsPage from './author.page-object';
import AuthorUpdatePage from './author-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Author e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let authorComponentsPage: AuthorComponentsPage;
  let authorUpdatePage: AuthorUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    authorComponentsPage = new AuthorComponentsPage();
    authorComponentsPage = await authorComponentsPage.goToPage(navBarPage);
  });

  it('should load Authors', async () => {
    expect(await authorComponentsPage.title.getText()).to.match(/Authors/);
    expect(await authorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Authors', async () => {
    const beforeRecordsCount = (await isVisible(authorComponentsPage.noRecords)) ? 0 : await getRecordsCount(authorComponentsPage.table);
    authorUpdatePage = await authorComponentsPage.goToCreateAuthor();
    await authorUpdatePage.enterData();

    expect(await authorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(authorComponentsPage.table);
    await waitUntilCount(authorComponentsPage.records, beforeRecordsCount + 1);
    expect(await authorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await authorComponentsPage.deleteAuthor();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(authorComponentsPage.records, beforeRecordsCount);
      expect(await authorComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(authorComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
