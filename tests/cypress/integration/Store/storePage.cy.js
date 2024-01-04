import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Store Page- WooCommerce is deactivated/uninstalled', () => {
	before(() => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
        });
        cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
        comingSoon(false)
	} );

	beforeEach(() => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
	} );

	it( 'Verify that Payments tab is not displayed', () => {
		const subNavTexts = ['Products & Services', 'Store Details'];
		const subNavTextsOther = [ 'Products', 'Store Details' ];

		cy.contains( '.nfd-mb-0', 'Store' )
			.find( `.${ appId }-app-subnavitem` )
			.each( ( item, index, list ) => {
				expect(list).to.have.length(2);
				if (pluginId !== 'bluehost') {
					expect(Cypress.$(item).text()).to.eq(
						subNavTextsOther[index]
					);
				} else {
					expect(Cypress.$(item).text()).to.eq(
						subNavTexts[index]
					);
				}
			} );
	} );

	it( 'Verify Store page title and sub titles', () => {
		cy.get( '.nfd-app-section-header h2' )
			.should( 'exist' )
			.and( 'have.text', 'Store' );
		cy.contains( '.nfd-app-section-content', 'Add a store to your site' )
			.as( 'storeFlex' )
			.should( 'exist' );
		cy.get( '@storeFlex' )
			.find( 'span' )
			.should(
				'have.text',
				'Adding a store to your website is quick and easy!\nJust install WooCommerce and get ready to start making money!'
			);
	} );

	it( 'Verify Store and its sub tabs should have Install WooCommerce buttons', () => {
		const buttonTexts = [
			'Install WooCommerce',
			'Install WooCommerce to unlock',
		];

		cy.get( '.nfd-app-section-container .nfd-button--upsell' )
			.as( 'upsellButtons' )
			.each( ( item, index, list ) => {
				expect( Cypress.$( item ).text() ).to.eq(
					buttonTexts[ index ]
				);
			} );

		cy.get( `.${ appId }-app-subnavitem-Products` ).click();
		cy.get( '@upsellButtons' ).each( ( item, index ) => {
			expect( Cypress.$( item ).text() ).to.eq( buttonTexts[ index ] );
		} );

		cy.get( `.${ appId }-app-subnavitem-Store ` ).click();
		cy.get( '@upsellButtons' ).each( ( item, index ) => {
			expect( Cypress.$( item ).text() ).to.eq( buttonTexts[ index ] );
		} );
	} );
} );
