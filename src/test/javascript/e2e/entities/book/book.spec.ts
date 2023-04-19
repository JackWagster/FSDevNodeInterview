import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BookComponentsPage from './book.page-object';
import BookUpdatePage from './book-update.page-object';
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

describe('Book e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookComponentsPage: BookComponentsPage;
  let bookUpdatePage: BookUpdatePage;
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
    bookComponentsPage = new BookComponentsPage();
    bookComponentsPage = await bookComponentsPage.goToPage(navBarPage);
  });

  it('should load Books', async () => {
    expect(await bookComponentsPage.title.getText()).to.match(/Books/);
    expect(await bookComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Books', async () => {
    const beforeRecordsCount = (await isVisible(bookComponentsPage.noRecords)) ? 0 : await getRecordsCount(bookComponentsPage.table);
    bookUpdatePage = await bookComponentsPage.goToCreateBook();
    await bookUpdatePage.enterData();

    expect(await bookComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bookComponentsPage.table);
    await waitUntilCount(bookComponentsPage.records, beforeRecordsCount + 1);
    expect(await bookComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bookComponentsPage.deleteBook();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bookComponentsPage.records, beforeRecordsCount);
      expect(await bookComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bookComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
