import { GetPluginId } from "../wp-module-support/pluginID.cy";
import { comingSoon } from "../wp-module-support/utils.cy";

const customCommandTimeout = 15000;

describe("Commerce Home Page- Coming soon mode", () => {
  before(() => {
    cy.exec(`npx wp-env run cli wp plugin deactivate woocommerce`, {
      failOnNonZeroExit: false,
    });
    cy.visit("/wp-admin/admin.php?page=" + GetPluginId() + "#/home");
    comingSoon(true);
  });

  beforeEach(() => {
    cy.visit("/wp-admin/admin.php?page=" + GetPluginId() + "#/home");
  });

  it("Verify Congrats on your new site message, coming soon alert", () => {
    cy.contains("Congrats on your new site!", {
      timeout: customCommandTimeout,
    }).should("exist");
    cy.get(".nfd-alert.nfd-alert--warning", { timeout: customCommandTimeout })
      .as("comingsoonalert")
      .should("exist");
    cy.get("@comingsoonalert").find(".nfd-validation-icon").should("exist");
    cy.get("@comingsoonalert")
      .find(".nfd-validation-message")
      .should("exist")
      .and(
        "have.text",
        'Your site is currently displaying a "Coming Soon" page.'
      );
  });

  it("Verify Site Preview flex and View your site option", () => {
    cy.get(".nfd-justify-start > .nfd-flex-col > .nfd-absolute", {
      timeout: customCommandTimeout,
    })
      .as("sitePreviewFlex")
      .should("exist");
    cy.get("@sitePreviewFlex")
      .trigger("mouseover")
      .find("a.nfd-button")
      .should("have.text", "View your site")
      .invoke("removeAttr", "target")
      .click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.go("back");
  });

  it("Verify presense of Ready to go to live? canvas", () => {
    cy.get(".nfd-px-4", { timeout: customCommandTimeout })
      .as("readyToGoNextLevel")
      .should("exist");
    cy.get("@readyToGoNextLevel", { timeout: customCommandTimeout })
      .find(".nfd-flex-1 h1")
      .should("have.text", "Ready to go live?");
    cy.get("@readyToGoNextLevel")
      .find(".nfd-flex-1 span")
      .should("exist")
      .and(
        "have.text",
        "Preview your Site before setting it live to make sure everything is how you want it.\nOnce you're ready, set your site live!"
      );
    cy.get("@readyToGoNextLevel", { timeout: customCommandTimeout })
      .find(".nfd-flex-none > .nfd-button--secondary")
      .should("exist")
      .and("have.text", "View your site");
    cy.get("@readyToGoNextLevel")
      .find(".nfd-flex-none .nfd-button--upsell")
      .should("exist")
      .and("have.text", "Launch your site");
  });

  it("Verify Visit your site and Launch your site functionality", () => {
    cy.get(".nfd-flex-none > .nfd-button--secondary", {
      timeout: customCommandTimeout,
    })
      .invoke("removeAttr", "target")
      .click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.go("back");
    cy.get(".nfd-flex-none > .nfd-button--upsell").click();
    cy.get(".nfd-notification--success")
      .should("exist")
      .and("contain.text", "Your site is online now!");
    cy.contains("Ready to go to the next level?", {
      timeout: customCommandTimeout,
    }).should("exist");
  });

  it("Verify Option Upload Media to your site", () => {
    cy.contains("Upload media to your site").as("uploadMedia").should("exist");
    cy.get("@uploadMedia").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/wp-admin/media-new.php");
    cy.go("back");
  });

  it("Verify Option Enable Jetpack to connect to your social media accounts", () => {
    cy.contains("Enable Jetpack to connect to your social media accounts", {
      timeout: customCommandTimeout,
    })
      .should("exist")
      .click();
    cy.contains("Plugin installation is in progress", {
      timeout: customCommandTimeout,
    }).should("exist");
    cy.wait(2000);
    cy.reload();
    cy.contains("View completed tasks", {
      timeout: customCommandTimeout,
    })
      .should("exist")
      .click();
    cy.contains("Connect to your social media accounts")
      .as("enableJetpack")
      .should("exist");
    cy.get("@enableJetpack").invoke("removeAttr", "target").click();
    cy.url().should(
      "eq",
      Cypress.config().baseUrl + "/wp-admin/admin.php?page=jetpack#/sharing"
    );
    cy.go("back");
  });
});
