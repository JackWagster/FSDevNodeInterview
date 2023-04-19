import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BookStoreComponentsPage from './book-store.page-object';
import BookStoreUpdatePage from './book-store-update.page-object';
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

describe('BookStore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookStoreComponentsPage: BookStoreComponentsPage;
  let bookStoreUpdatePage: BookStoreUpdatePage;
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
    bookStoreComponentsPage = new BookStoreComponentsPage();
    bookStoreComponentsPage = await bookStoreComponentsPage.goToPage(navBarPage);
  });

  it('should load BookStores', async () => {
    expect(await bookStoreComponentsPage.title.getText()).to.match(/Book Stores/);
    expect(await bookStoreComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BookStores', async () => {
    const beforeRecordsCount = (await isVisible(bookStoreComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bookStoreComponentsPage.table);
    bookStoreUpdatePage = await bookStoreComponentsPage.goToCreateBookStore();
    await bookStoreUpdatePage.enterData();

    expect(await bookStoreComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bookStoreComponentsPage.table);
    await waitUntilCount(bookStoreComponentsPage.records, beforeRecordsCount + 1);
    expect(await bookStoreComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bookStoreComponentsPage.deleteBookStore();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bookStoreComponentsPage.records, beforeRecordsCount);
      expect(await bookStoreComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bookStoreComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
