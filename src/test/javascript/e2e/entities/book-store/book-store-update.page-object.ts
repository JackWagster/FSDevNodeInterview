import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BookStoreUpdatePage {
  pageTitle: ElementFinder = element(by.id('fsDevNodeInterviewApp.bookStore.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bookStoreNameInput: ElementFinder = element(by.css('input#book-store-bookStoreName'));
  postalCodeInput: ElementFinder = element(by.css('input#book-store-postalCode'));
  cityInput: ElementFinder = element(by.css('input#book-store-city'));
  stateProvinceInput: ElementFinder = element(by.css('input#book-store-stateProvince'));
  bookSelect: ElementFinder = element(by.css('select#book-store-book'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBookStoreNameInput(bookStoreName) {
    await this.bookStoreNameInput.sendKeys(bookStoreName);
  }

  async getBookStoreNameInput() {
    return this.bookStoreNameInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStateProvinceInput(stateProvince) {
    await this.stateProvinceInput.sendKeys(stateProvince);
  }

  async getStateProvinceInput() {
    return this.stateProvinceInput.getAttribute('value');
  }

  async bookSelectLastOption() {
    await this.bookSelect.all(by.tagName('option')).last().click();
  }

  async bookSelectOption(option) {
    await this.bookSelect.sendKeys(option);
  }

  getBookSelect() {
    return this.bookSelect;
  }

  async getBookSelectedOption() {
    return this.bookSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setBookStoreNameInput('bookStoreName');
    expect(await this.getBookStoreNameInput()).to.match(/bookStoreName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPostalCodeInput('postalCode');
    expect(await this.getPostalCodeInput()).to.match(/postalCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    expect(await this.getCityInput()).to.match(/city/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStateProvinceInput('stateProvince');
    expect(await this.getStateProvinceInput()).to.match(/stateProvince/);
    // this.bookSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
