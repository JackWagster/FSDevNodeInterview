import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AuthorUpdatePage {
  pageTitle: ElementFinder = element(by.id('fsDevNodeInterviewApp.author.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fistNameInput: ElementFinder = element(by.css('input#author-fistName'));
  lastNameInput: ElementFinder = element(by.css('input#author-lastName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFistNameInput(fistName) {
    await this.fistNameInput.sendKeys(fistName);
  }

  async getFistNameInput() {
    return this.fistNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
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
    await this.setFistNameInput('fistName');
    expect(await this.getFistNameInput()).to.match(/fistName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
