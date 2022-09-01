const SELECTOR = {
  PRODUCT_NAME: "[name=post_title]",
  PRODUCT_DATA_DROPDOWN: "select#product-type",
  VIRTUAL: "Virtual",
  GENERAL_REGULAR_PRICE: "[name=_regular_price]",
  GENERAL_SALES_PRICE: "[name=_sale_price]",
  GENERAL_TAX_STATUS: "Tax status",
  GENERAL_TAX_CLASS: "Tax class",
  INVENTORY_TAB: "Inventory",
  INVENTORY_SKU: "[name=_sku]",
  MANAGE_STOCK: "[name=_manage_stock]",
  STOCK_QUANTITY: "[name=_stock]",
  LOW_STOCK_QUANTITY: "[name=_low_stock_amount]",
  STOCK_STATUS: "[name=_stock_status]",
  SET_PRODUCT_IMAGE_LINK: "Set product image",
  ADD_NEW_CATEGORY_LINK: "a[href='#product_cat-add']",
  PRODUCT_CATEGORY_BOX: "[value='New category name']",
  ADD_NEW_CATEGORY_BUTTON: "[value='Add new category']",
  CATEGORY_CHECKLIST: "#product_catchecklist",
  PRODUCT_TAGS_BOX: "input#new-tag-product_tag",
  ADD_TAG_BUTTON: "[value=Add]",
  PUBLISH: "[name=publish]",

  ADD_NEW_BUTTON: "Add New",
  ADD_NEW_TAG: "[value='Add new tag']",

  // Export Card
  IMPORT_BUTTON: "[name=import]",
  CONTINUE_TO_IMPORT_BUTTON: "Continue",
  RUN_THE_IMPORTER: "Run the importer",
  VIEW_PRODUCT_BUTTON: "View products",
  PRODUCT_LIST: "tbody>tr",
};

class AddNewProductPage {
  productName() {
    return cy.get(SELECTOR.PRODUCT_NAME);
  }

  productData() {
    return cy.get(SELECTOR.PRODUCT_DATA_DROPDOWN);
  }
  virtual() {
    return cy.findByText(SELECTOR.VIRTUAL);
  }
  generalRegularPrice() {
    return cy.get(SELECTOR.GENERAL_REGULAR_PRICE);
  }
  generalSalesPrice() {
    return cy.get(SELECTOR.GENERAL_SALES_PRICE);
  }
  generalTaxStatus() {
    return cy
      .findByLabelText(SELECTOR.GENERAL_TAX_STATUS)
      .parent()
      .find("select");
  }

  generalTaxClass() {
    return cy
      .findByLabelText(SELECTOR.GENERAL_TAX_CLASS)
      .parent()
      .find("select");
  }

  inventoryTab() {
    return cy.findByText(SELECTOR.INVENTORY_TAB).parent();
  }
  inventorySku() {
    return cy.get(SELECTOR.INVENTORY_SKU);
  }
  manageStock() {
    return cy.get(SELECTOR.MANAGE_STOCK);
  }
  stockQuanity() {
    return cy.get(SELECTOR.STOCK_QUANTITY);
  }
  lowStockThreshold() {
    return cy.get(SELECTOR.LOW_STOCK_QUANTITY);
  }
  stockStatus() {
    return cy.get(SELECTOR.STOCK_STATUS);
  }
  setProductImageLink() {
    return cy.findByText(SELECTOR.SET_PRODUCT_IMAGE_LINK);
  }
  addNewCategoryButton() {
    return cy.get(SELECTOR.ADD_NEW_CATEGORY_LINK);
  }

  addNewCategoryButtonNextButton() {
    return cy.get(SELECTOR.ADD_NEW_CATEGORY_BUTTON);
  }

  addNewCategories() {
    return cy.get(SELECTOR.PRODUCT_CATEGORY_BOX);
  }

  categoriesChecklist() {
    return cy.get(SELECTOR.CATEGORY_CHECKLIST);
  }

  productTagsBox() {
    return cy.get(SELECTOR.PRODUCT_TAGS_BOX);
  }

  productTagAddButton() {
    return cy.get(SELECTOR.ADD_TAG_BUTTON);
  }

  publish() {
    return cy.get(SELECTOR.PUBLISH);
  }

  addNewButton() {
    return cy.contains(SELECTOR.ADD_NEW_BUTTON);
  }

  addNewTag() {
    return cy.get(SELECTOR.ADD_NEW_TAG);
  }

  importButton() {
    return cy.get(SELECTOR.IMPORT_BUTTON);
  }

  continueToImport() {
    return cy.findByText(SELECTOR.CONTINUE_TO_IMPORT_BUTTON);
  }

  runTheImporter() {
    return cy.findByText(SELECTOR.RUN_THE_IMPORTER);
  }

  viewProduct() {
    return cy.findByText(SELECTOR.VIEW_PRODUCT_BUTTON, { timeout: 15000 });
  }

  productList() {
    return cy.get(SELECTOR.PRODUCT_LIST, { timeout: 3000 });
  }
}

export default new AddNewProductPage();
