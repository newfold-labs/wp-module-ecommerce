import HomePage from "../pageObject/bluehostHome.page";

export function getVerticleTab(name) {
  HomePage.verticleTabs().contains(name).click();
}
