// <reference types="Cypress" />
export const GetPluginId = () => {
    return Cypress.env('pluginId');
}

export const getAppId = () => {
    return Cypress.env('appId')
}