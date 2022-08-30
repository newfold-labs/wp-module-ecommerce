// / <reference types="cypress" />

import * as GeneralSetting from "../../pageAction/generalSetting.action";
import * as AddProducts from "../../pageAction/addNewProduct.action";
import * as CustomizeYourStore from "../../pageAction/customizeStore.action";
import * as AdvancedFeature from "../../pageAction/advancedFeature.action";
import * as LaunchYourStore from "../../pageAction/launchYourStore.action";

const homePageUrl = "/wp-admin/admin.php?page=bluehost#/home/store/general";

describe("As a customer, I want to ", function () {
  before(() => {
    cy.fixture("dashboard").then((data) => {
      this.data = data;
    });
  });

  beforeEach(() => {
    cy.login(Cypress.env("wpUsername"), Cypress.env("wpPassword"));
    cy.visit("/wp-admin/admin.php?page=bluehost#/home/store/general");
  });

  it("see the launch pad banner on top of the home page when site status is not live", () => {
    GeneralSetting.verifyLaunchPadBannerContains(
      "Congrats on your new store! Let's get it ready to launch!"
    );
  });

  it("see all 5 verticle tabs on Home Page", () => {
    GeneralSetting.verifyVerticleTabsHave([
      "General Settings",
      "Add products",
      "Customize your store",
      "Advanced features",
      "Launch Your Store/Site Status",
    ]);
  });

  it("see Store Info, Payments, Shipping and Tax info cards in General Setting tab", () => {
    GeneralSetting.verifyGeneralSettingTabHaveCard([
      "Store Info",
      "Payments",
      "Shipping",
      "Tax Info",
    ]);
    GeneralSetting.checkLinkTextIsPresentOnGeneralSettingCardsOnHover();
  });

  it('add my Store address from "General Setting" "Store Info" card', () => {
    GeneralSetting.addStoreAddress();
    GeneralSetting.verifyStoreInfoCardIsInDoneState();
    GeneralSetting.verifyEnteredStoreAddressIsSameOnWooCommerceSetting();
  });

  it.skip("link my existing payment method in General Setting", () => {
    GeneralSetting.linkExistingPaymentAccount();
    GeneralSetting.verifyPaymentCardsInDoneSection();
  });

  it("link my existing shippo account in General Setting", () => {
    GeneralSetting.linkExistingShippoAccount();
    GeneralSetting.verifyShippingCardIsInDoneState();
    GeneralSetting.verifyFilledShippingInformationSavedInYith();
  });

  it('configure "Yes, enable tax rates and calculations" from "General setting" "Tax Info" card', () => {
    GeneralSetting.selectTaxOption(0);
    GeneralSetting.verifyTaxInfoCardInDoneState();
    GeneralSetting.verifyTaxOptionIsEnableInWooCommerce();
    GeneralSetting.setStandardRate();
  });

  it.skip("verify all general setting cards are in done state", () => {
    GeneralSetting.verifyAllCardAreInDoneState();
  });

  it('see "Add a product" and "Import Product" cards in Your Product tab', () => {
    AddProducts.verifyCardsExists(["Add Products", "Import Products"]);
  });

  it('add a product from "Your product" tabs', () => {
    AddProducts.addAProduct();

    AddProducts.deleteAllProduct();
    cy.visit(homePageUrl);

    AddProducts.ImportProducts();
  });

  it("Verify Add a Product, Manage a Product, Categories, Tags cards is visible after adding a product", () => {
    AddProducts.verifyCardsExists([
      "Add a product",
      "Manage products",
      "Categories",
      "Tags",
    ]);
  });

  it("verify 'Add a Product', 'Manage a Product', 'Categories', 'Tags' redirecting to right page after click", () => {
    AddProducts.verifyAddaProductCardNavigatedToRightPage();
    AddProducts.verifyManageaProductCardNavigatedToRightPage();
    AddProducts.verifyCategoriesCardNavigatedToRightPage();
    AddProducts.verifyTagsCardNavigatedToRightPage();
  });

  it("verify 'How to add product' card exist", () => {
    AddProducts.verifyHowToAddProductCardExist();
  });

  it("verify 'customize Your Store' cards exist", () => {
    CustomizeYourStore.verifyCard([
      "Home Page",
      "About Page",
      "Contact Page",
      "Store Layout",
      "Customer Account Page",
    ]);
  });

  it("create home page, about page, contat page", () => {
    CustomizeYourStore.createPages();
  });

  it("change my store layout", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      // Error: Cannot read properties of null (reading 'addEventListener')
      return false;
    });
    CustomizeYourStore.storeLayout();
  });

  it("go to 'WooCommerce Customize My Account Page'", () => {
    CustomizeYourStore.customerAccount();
  });

  it("install all free adons of advanced feature tab", () => {
    AdvancedFeature.installAndEnableFreeAddons();
  });

  it("Luanch My Store", () => {
    LaunchYourStore.launchYourStore();
  });
});
