/// <reference types="cypress" />

const SELECTOR = {
  ADD_PRODUCTS_CARD: "Add Products",
  IMPORT_PRODUCT_CARD: "Import Products",
  PRODUCT_CARDS: "Add Products",
  Add_NEW_PRODUCT: "Add a product",
  CATEGORY: "Categories",
  TAGS: "Tags",
  MANAGE_PRODUCT: "Manage products",
  CARDS_AFTER_ADDING_PROJECT: "button[data-variant=minimal]",
};

class AddProductPage {
  addProductCard() {
    return cy.findAllByText(SELECTOR.ADD_PRODUCTS_CARD);
  }

  importProduct() {
    return cy.findAllByText(SELECTOR.IMPORT_PRODUCT_CARD);
  }

  productCards() {
    return cy
      .get("h1")
      .findByText(SELECTOR.PRODUCT_CARDS)
      .parent()
      .find("button");
  }

  cardsTitle() {
    return this.productCards().find("span>span");
  }

  addNewProductCard() {
    return cy.findByText(SELECTOR.Add_NEW_PRODUCT);
  }

  categoryCard() {
    return cy.findByText(SELECTOR.CATEGORY);
  }

  tagCard() {
    return cy.findByText(SELECTOR.TAGS);
  }

  manageProductCard() {
    return cy.findByText(SELECTOR.MANAGE_PRODUCT);
  }

  cardsAfterAddingProject() {
    return cy.get(SELECTOR.CARDS_AFTER_ADDING_PROJECT);
  }
}

export default new AddProductPage();
