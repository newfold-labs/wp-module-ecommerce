import BluehostHomePage from "../pageObject/bluehostHome.page";
import ProductPage from "../pageObject/dashboard/addProduct.page";
import AddNewProductPage from "../pageObject/productPage.page";
import wooCommercePage from "../pageObject/wooCommerce.page";

const data = require("../fixtures/dashboard.json");

export function verifyCardsExists(cards) {
  BluehostHomePage.addProductTab().click();
  cards.forEach((element) => {
    cy.contains(element);
  });
}

export function addAProduct() {
  BluehostHomePage.addProductTab().click();
  ProductPage.addProductCard().eq(1).click();

  AddNewProductPage.productName().type(data.simple_product_details.name);

  AddNewProductPage.productData().select("Simple product");
  AddNewProductPage.generalRegularPrice().type(
    data.simple_product_details.regular_price
  );
  AddNewProductPage.generalSalesPrice().type(
    data.simple_product_details.sale_price
  );
  AddNewProductPage.generalTaxStatus().select(
    data.simple_product_details.tax_status
  );
  AddNewProductPage.generalTaxClass().select(
    data.simple_product_details.tax_class
  );

  AddNewProductPage.inventoryTab().click();
  AddNewProductPage.inventorySku().type(data.simple_product_details.sku);
  AddNewProductPage.manageStock().click();
  AddNewProductPage.stockQuanity().type(
    data.simple_product_details.stock_quantity
  );
  AddNewProductPage.lowStockThreshold().type(
    data.simple_product_details.low_stock_threshold
  );

  AddNewProductPage.addNewCategoryButton().click();
  AddNewProductPage.addNewCategories()
    .eq(0)
    .type(data.simple_product_details.category);
  AddNewProductPage.addNewCategoryButtonNextButton().eq(0).click();
  AddNewProductPage.categoriesChecklist()
    .contains(data.simple_product_details.category.toString())
    .find("input")
    .then(($element) => {
      if ($element.prop("checked") == false) {
        cy.wrap($element).check();
      }
    });

  AddNewProductPage.productTagsBox().type(data.simple_product_details.tags);
  AddNewProductPage.productTagAddButton().click();

  AddNewProductPage.publish().click();
  cy.go("back");
  cy.go("back");

  ProductPage.addNewProductCard().should("exist");
}

export function ImportProducts() {
  BluehostHomePage.addProductTab().click();
  ProductPage.importProduct().click();
  AddNewProductPage.importButton().selectFile(
    "./tests/cypress/fixtures/wc-products-list.csv"
  );
  AddNewProductPage.continueToImport().click();
  AddNewProductPage.runTheImporter().click();
  AddNewProductPage.viewProduct().click();
  AddNewProductPage.productList().should("have.length.gte", 8);
}

export function verifyAddaProductCardNavigatedToRightPage() {
  BluehostHomePage.addProductTab().click();
  ProductPage.cardsAfterAddingProject().eq(0).click();
  wooCommercePage.addProductManually().should("exist");
  wooCommercePage.backButton().click();
}

export function verifyManageaProductCardNavigatedToRightPage() {
  ProductPage.cardsAfterAddingProject().eq(1).click();
  AddNewProductPage.addNewButton().should("exist");
  cy.go("back");
}

export function verifyCategoriesCardNavigatedToRightPage() {
  ProductPage.cardsAfterAddingProject().eq(2).click();
  AddNewProductPage.addNewCategoryButtonNextButton().should("exist");
  wooCommercePage.backButton().click();
}

export function verifyTagsCardNavigatedToRightPage() {
  ProductPage.cardsAfterAddingProject().eq(3).click();
  AddNewProductPage.addNewTag().should("exist");
  wooCommercePage.backButton().click();
}

export function verifyHowToAddProductCardExist() {
  let urlToVerify = "https://woocommerce.com/document/managing-products/";

  BluehostHomePage.addProductTab().click();
  ProductPage.cardsAfterAddingProject().eq(4).should("exist");

  let newUrl = "";
  cy.window().then((win) => {
    cy.stub(win, "open")
      .as("windowOpen")
      .callsFake((url) => {
        newUrl = url;
      });
  });

  ProductPage.cardsAfterAddingProject().eq(4).click();
  cy.get("@windowOpen").should("be.calledWith", urlToVerify, "_blank");
}

const myObject = {
  value: "",
};

export function deleteAllProduct() {
  BluehostHomePage.addProductTab().click();
  ProductPage.manageProductCard().click();
  try {
    cy.get("div.top span.total-pages").then(($element) => {
      var count = parseInt($element.text());
      for (let index = 0; index < count; index++) {
        deleteAllRow();
      }
    });
  } catch (error) {
    deleteAllRow();
  }
}

function deleteAllRow() {
  AddNewProductPage.selectAllProductButton().check();
  AddNewProductPage.selectActionOnProduct().select("Move to Trash");
  AddNewProductPage.applyButton().click();
}
