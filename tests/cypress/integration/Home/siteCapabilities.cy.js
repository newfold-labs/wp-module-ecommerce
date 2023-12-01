import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';

const customCommandTimeout = 30000;

const appId = getAppId();


describe(
    'Verify Wondercart as per capabilities',
    () => {
        const cTBAndYithTrue = ' a:7:{s:11:"canAccessAI";b:1;s:18:"canAccessGlobalCTB";b:1;s:19:"canAccessHelpCenter";b:1;s:11:"hasEcomdash";b:0;s:15:"hasYithExtended";b:1;s:11:"isEcommerce";b:1;s:8:"isJarvis";b:1;} '
        const cTBFalseYithTrue = ' a:7:{s:11:"canAccessAI";b:1;s:18:"canAccessGlobalCTB";b:0;s:19:"canAccessHelpCenter";b:1;s:11:"hasEcomdash";b:0;s:15:"hasYithExtended";b:1;s:11:"isEcommerce";b:1;s:8:"isJarvis";b:1;} '
        const cTBTrueYithFalse = ' a:7:{s:11:"canAccessAI";b:1;s:18:"canAccessGlobalCTB";b:1;s:19:"canAccessHelpCenter";b:1;s:11:"hasEcomdash";b:0;s:15:"hasYithExtended";b:0;s:11:"isEcommerce";b:1;s:8:"isJarvis";b:1;} '

        before(() => {
            // cy.visit('/wp-admin/admin.php?page=' + GetPluginId() + '#/store')
            // cy.get('.nfd-app-section-content .nfd-button--upsell').eq(0).invoke('text').then((btnText) => {
            //     if (btnText == 'Install WooCommerce') {
            //         cy.get('.nfd-app-section-content .nfd-button--upsell').contains(btnText).click();
            //         cy.get('.nfd-notification--success', { timeout: customCommandTimeout }).contains('WooCommerce has been installed successfully').should('exist')
            //     }
            // })
        })

        beforeEach(() => {
            cy.visit('/wp-admin/admin.php?page=' + GetPluginId() + '#/home')
        })
        it('Verify Install Now is shown when canAccessGlobalCTB and hasYithExtended set to true', () => {
            // cy.exec( `npx wp-env run cli wp option get _transient_nfd_site_capabilities` )
            // cy.exec( `npx wp-env run cli wp option delete transient_nfd_site_capabilities` )
            cy.exec(`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${cTBAndYithTrue}'`, { timeout: customCommandTimeout }).then((result) => {
                cy.log(result.stdout);
                cy.log(result.stderr);
            })
            cy.reload();
            cy.get(`.${appId}-app-navitem-Store`, {timeout: customCommandTimeout}).click()
            cy.get(`.${appId}-app-subnavitem`, {timeout: customCommandTimeout}).contains('Sales & Discounts').as('salesTab').should('exist')
            cy.get('@salesTab').click();
            cy.get('.nfd-button--upsell', {timeout: customCommandTimeout}).contains('Install now').should('exist')  
            
        })

        it.skip('Verify Install Now is shown when canAccessGlobalCTB is false and hasYithExtended set to true', () => {
            // cy.exec( `npx wp-env run cli wp option delete _transient_nfd_site_capabilities`, { timeout: customCommandTimeout } )
            cy.exec(`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${cTBFalseYithTrue}'`, { timeout: customCommandTimeout }).then((result) => {
                cy.log(result.stdout);
                cy.log(result.stderr);
            })
            cy.reload();
            cy.get(`.${appId}-app-navitem-Store`).click()
            cy.get(`.${appId}-app-subnavitem`).contains('Sales & Discounts').as('salesTab').should('exist')
            cy.get('@salesTab').click();
            cy.get('.nfd-button--upsell').contains('Install now').should('exist')
        })

        it.skip('Verify Install Now is shown when canAccessGlobalCTB is true and hasYithExtended set to false', () => {
            // cy.exec( `npx wp-env run cli wp option delete _transient_nfd_site_capabilities` , { timeout: customCommandTimeout })
            cy.exec(`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${cTBTrueYithFalse}'`, { timeout: customCommandTimeout }).then((result) => {
                cy.log(result.stdout);
                cy.log(result.stderr);
            })
            cy.reload();
            cy.get(`.${appId}-app-navitem-Store`).click()
            cy.get(`.${appId}-app-subnavitem`).contains('Sales & Discounts').as('salesTab').should('exist')
            cy.get('@salesTab').click();
            cy.get('.nfd-button--upsell').contains('Buy now').should('exist')
        })
        
    });