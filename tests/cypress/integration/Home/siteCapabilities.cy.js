import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';

const customCommandTimeout = 60000;


describe(
    'Commerce Home Page- Coming soon mode',
    () => {
        const ecomArr = {
            "canAccessHelpCEnter" : false,
            "hasEcomdash" : false,
            "hasYithExtended" : true,
            "isEcommerce": true,
            "isJarvis" : true
        }
        const optionsString = JSON.stringify(ecomArr);
        const stringVal = '["canAccessAI" => false, "canAccessHelpCenter" => false,"canAccessGlobalCTB"  => true,"hasEcomdash" => false,"hasYithExtended" => false,"isEcommerce" => false,"isJarvis" => false]'

        const ecomTrue = 'a:7:{s:11:"canAccessAI";b:1;s:18:"canAccessGlobalCTB";b:0;s:19:"canAccessHelpCenter";b:1;s:11:"hasEcomdash";b:0;s:15:"hasYithExtended";b:0;s:11:"isEcommerce";b:1;s:8:"isJarvis";b:1;}'
        before(() => {
            cy.visit('/wp-admin/admin.php?page=' + GetPluginId() + '#/home')
        })

        it('Default test', () => {

            cy.exec( 'npx wp-env run cli wp option delete _transient_nfd_site_capabilities' )
            // cy.exec(`wp-env run cli wp option set _transient_nfd_site_capabilities '${ecomTrue}'`).then((result) => {
            //     cy.log(result.stdout);
            //     cy.log(result.stderr);
            // })

            // cy.exec(`wp-env run cli wp option update _transient_nfd_site_capabilities '${ecomTrue}' --path c/Users/sangeetha.n1/Local Sites/bhlatest/app/public`, { timeout: 20000 }).then((result) => {
                // cy.exec(`npx wp-env run cli wp option set mm_brand Bluehost`, { timeout: 20000 }).then((result) => {
            // cy.exec(`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${ecomTrue}'`, { timeout: 20000, log: true }).then((result) => {
            //     cy.log(result.stdout);
            //     cy.log(result.stderr);
            // })

            // cy.exec('npx wp-env run cli wp option update _transient_nfd_site_capabilities \'a:7:{s:11:"canAccessAI";b:1;s:18:"canAccessGlobalCTB";b:0;s:19:"canAccessHelpCenter";b:1;s:11:"hasEcomdash";b:0;s:15:"hasYithExtended";b:0;s:11:"isEcommerce";b:1;s:8:"isJarvis";b:1;}\'', {log: true})

            // cy.get(`.${getAppId()}-app-navitem-Store`).click()
            // cy.contains('Sales and Discounts').should('exist')
            
        })
        
    });