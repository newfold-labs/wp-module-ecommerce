import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
	viewCompletedTasks,
	viewRemainingTasks,
} from '../wp-module-support/utils.cy';
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
const hg_region = 'br';

describe( 'e-commerce Home Page- Next Steps', { testIsolation: true }, () => {
	const step_id = [
		'add-a-new-page-to-your-site',
		'upload-media-to-your-site',
		'enable-jetpack-to-connect-to-your-social-media-accounts',
	];

	const novice_step_id = [
		'sign-up-for-yoast-seo-academy',
		'add-a-new-page-to-your-site',
		'upload-media-to-your-site',
		'enable-jetpack-to-connect-to-your-social-media-accounts',
	];

	const novice_step_id_bh = [
		'sign-up-for-bluehost-wordpress-academy',
		...novice_step_id,
	];

	beforeEach( () => {
		wpLogin();
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );

		cy.exec( `npx wp-env run cli wp option set mm_brand ${ pluginId }` );

		if ( pluginId == 'hostgator' ) {
			cy.exec(
				`npx wp-env run cli wp option set hg_region ${ hg_region }`
			);
		}
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	after( () => {
		cy.exec(
			`npx wp-env run cli wp option delete nfd_module_onboarding_flow`
		);
		cy.reload();
		cy.visit(
			'/wp-admin/index.php?page=nfd-onboarding#/wp-setup/step/get-started/experience'
		);
		cy.get( 'button.nfd-nav-card-button.nfd-card-button' ).should(
			'be.disabled'
		);
	} );

	it( 'Verify Next steps for your site when woocommerce is not active', () => {
		cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
			.as( 'nextSteps' )
			.should( 'exist' );
		cy.get( '@nextSteps' ).find( 'h1' ).should( 'exist' );
		cy.get( '@nextSteps' ).find( 'p' ).should( 'exist' );
		cy.get( '@nextSteps' )
			.find( 'ul li' )
			.each( ( ele, index, list ) => {
				expect( list ).to.have.length( 3 );
				cy.get( ele )
					.invoke( 'attr', 'id' )
					.then( ( domId ) => {
						expect( domId ).to.eq( step_id[ index ] );
					} );
			} );
	} );

	it( 'Verify Next steps when experience level is novice', () => {
		cy.visit(
			'/wp-admin/index.php?page=nfd-onboarding#/wp-setup/step/get-started/experience'
		);
		cy.get( '#inspector-radio-control-0-0', {
			timeout: customCommandTimeout,
		} ).click( { force: true } );
		cy.get( '.navigation-buttons_next' ).click( { force: true } );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );
		cy.wait( 2000 );
		cy.reload();
		cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
			.as( 'nextSteps' )
			.should( 'exist' )
			.scrollIntoView();

		cy.get( '@nextSteps' )
			.find( 'ul li' )
			.each( ( ele, index, list ) => {
				if ( pluginId == 'bluehost' ) {
					expect( list ).to.have.length( 5 );
					cy.get( ele )
						.invoke( 'attr', 'id' )
						.then( ( domId ) => {
							expect( domId ).to.eq( novice_step_id_bh[ index ] );
						} );
				} else {
					expect( list ).to.have.length( 4 );
					cy.get( ele )
						.invoke( 'attr', 'id' )
						.then( ( domId ) => {
							expect( domId ).to.eq( novice_step_id[ index ] );
						} );
				}
			} );
	} );

	it( 'Verify Signup for Bluehost WordPress Academy step', () => {
		if ( pluginId == 'bluehost' ) {
			cy.intercept( APIList.bh_academy ).as( 'events' );
			cy.get( `#${ novice_step_id_bh[ 0 ] } a`, {
				timeout: customCommandTimeout,
			} )
				.as( 'nextSteps' )
				.should( 'exist' )
				.scrollIntoView()
				.invoke( 'removeAttr', 'target' )
				.click();
			cy.url().should(
				'equal',
				'https://academy.bluehost.com/?utm_source=wp-home&utm_medium=bluehost_plugin'
			);
			cy.go( 'back' );
			EventsAPI( APIList.bh_academy, pluginId );

			cy.get( '@nextSteps' ).should( 'not.exist' );
			viewCompletedTasks();
			cy.get( '@nextSteps' ).should( 'exist' );
			viewRemainingTasks();
		}
	} );

	it( 'Verify Signup for Wordpress SEO Academy step', () => {
		cy.intercept( APIList.yoast_seo_academy ).as( 'events' );
		cy.get( `#${ novice_step_id_bh[ 1 ] } a`, {
			timeout: customCommandTimeout,
		} )
			.as( 'nextSteps' )
			.should( 'exist' )
			.scrollIntoView()
			.invoke( 'removeAttr', 'target' )
			.click();
			cy.url()
				.should(
				'contain',
				'https://my.yoast.com/signup?redirect_to=https://academy.yoast.com/courses/'
			);
		cy.go( 'back' );
		EventsAPI( APIList.yoast_seo_academy, pluginId );

		cy.get( '@nextSteps' ).should( 'not.exist' );
		viewCompletedTasks();
		cy.get( '@nextSteps' ).should( 'exist' );
		viewRemainingTasks();
	} );

	it( 'Verify Add a new page to your site step', () => {
		cy.get( '.nfd-grid.nfd-gap-4 ul li', {
			timeout: customCommandTimeout,
		} );
		cy.get( `#${ novice_step_id_bh[ 2 ] } a`, {
			timeout: customCommandTimeout,
		} )
			.as( 'addPage' )
			.scrollIntoView()
			.click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl +
				'/wp-admin/post-new.php?post_type=page&return_to_nfd=%2Fhome'
		);
		cy.go( 'back' );
		cy.wait( 2000 );
		cy.get( '@addPage' ).should( 'not.exist' );
		viewCompletedTasks();
		cy.get( '@addPage' ).should( 'exist' );
		viewRemainingTasks();
	} );

	it( 'Verify Option Upload Media to your site', () => {
		cy.get( `#${ novice_step_id_bh[ 3 ] } a`, {
			timeout: customCommandTimeout,
		} )
			.as( 'uploadMedia' )
			.should( 'exist' );
		cy.get( '@uploadMedia' ).click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/wp-admin/media-new.php'
		);
		cy.go( 'back' );
	} );
} );
