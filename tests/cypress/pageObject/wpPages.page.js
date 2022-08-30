const SELECTOR = {
  SELECT_ALL_CHECKBOX: "thead [type=checkbox]",
  SELECT_BULK_ACTION: ".top div.bulkactions select",
  APPLY_BUTTON: ".top div.bulkactions input",
};

class WPPages {
  selectAllProductButton() {
    return cy.get(SELECTOR.SELECT_ALL_CHECKBOX);
  }

  selectActionOnProduct() {
    return cy.get(SELECTOR.SELECT_BULK_ACTION);
  }

  applyButton() {
    return cy.get(SELECTOR.APPLY_BUTTON);
  }
}

export default new WPPages();
