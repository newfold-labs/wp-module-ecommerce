import BluehostHomePage from "../pageObject/bluehostHome.page";
import AdvancedFeaturePage from "../pageObject/dashboard/advancedFeature.page";

var myList = [];

export function installAndEnableFreeAddons() {
  BluehostHomePage.advancedFeature().click();
  AdvancedFeaturePage.uninstalledAddOns().each(($element) => {
    myList.push($element.text().substring(0, 34));
    cy.log($element.text());
  });
  AdvancedFeaturePage.addonsListToEnable().each(($element) => {
    cy.wrap($element).click();
  });
  myList.forEach((element) => {
    AdvancedFeaturePage.installedAddons().contains(element);
  });
}
