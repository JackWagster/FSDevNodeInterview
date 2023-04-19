import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BookUpdatePage from './book-update.page-object';

const expect = chai.expect;
export class BookDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('fsDevNodeInterviewApp.book.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-book'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BookComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('book-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('book');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBook() {
    await this.createButton.click();
    return new BookUpdatePage();
  }

  async deleteBook() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bookDeleteDialog = new BookDeleteDialog();
    await waitUntilDisplayed(bookDeleteDialog.deleteModal);
    expect(await bookDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/fsDevNodeInterviewApp.book.delete.question/);
    await bookDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bookDeleteDialog.deleteModal);

    expect(await isVisible(bookDeleteDialog.deleteModal)).to.be.false;
  }
}
