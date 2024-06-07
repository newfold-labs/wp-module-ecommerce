import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	comingSoon,
	viewCompletedTasks,
	viewRemainingTasks
} from '../wp-module-support/utils.cy';
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
const hg_region = 'br';

describe( 'Commerce Home Page- Coming soon mode', () => {
	before( () => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		comingSoon( true );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify Congrats on your new site message, coming soon alert', () => {
		cy.get( '.nfd-gap-4 .nfd-title.nfd-title--2', {
			timeout: customCommandTimeout,
		} )
			.eq( 0 )
			.should( 'exist' );
		cy.get( '.nfd-alert.nfd-alert--warning', {
			timeout: customCommandTimeout,
		} )
			.as( 'comingsoonalert' )
			.should( 'exist' );
		cy.get( '@comingsoonalert' )
			.find( '.nfd-validation-icon' )
			.should( 'exist' );
		cy.get( '@comingsoonalert' )
			.find( '.nfd-validation-message' )
			.should( 'exist' );
	} );

	it( 'Verify Site Preview flex and View your site option', () => {
		cy.get( '.nfd-justify-start > .nfd-flex-col > .nfd-absolute', {
			timeout: customCommandTimeout,
		} )
			.as( 'sitePreviewFlex' )
			.should( 'exist' );
		cy.get( '@sitePreviewFlex' )
			.trigger( 'mouseover' )
			.find( '[data-cy="view-site"]' )
			.should( 'exist' )
			.invoke( 'removeAttr', 'target' )
			.click();
		cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
		cy.go( 'back' );
	} );

	it( 'Verify presense of Ready to go to live? canvas', () => {
		cy.get( '.nfd-px-4', { timeout: customCommandTimeout } )
			.as( 'readyToGoNextLevel' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
			.find( '.nfd-flex-1 h1' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel' )
			.find( '.nfd-flex-1 span' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
			.find( '#view-site' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel' )
			.find( '#launch-site' )
			.should( 'exist' );
	} );

	it( 'Verify Visit your site and Launch your site functionality', () => {
		cy.get( '.nfd-flex-none > .nfd-button--secondary', {
			timeout: customCommandTimeout,
		} )
			.invoke( 'removeAttr', 'target' )
			.click();
		cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
		cy.go( 'back' );
		cy.get( '.nfd-flex-none > .nfd-button--upsell' ).click();
		cy.get( '.nfd-notification--success' ).should( 'exist' );
	} );
} );

describe( 'Commerce Home Page- Live Mode', () => {
	before( () => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		comingSoon( false );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify presense of Ready to go to next level? canvas', () => {
		cy.get( '.nfd-flex.nfd-gap-4', { timeout: customCommandTimeout } )
			.eq( 2 )
			.as( 'readyToGoNextLevel' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
			.find( 'h1' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel' ).find( 'div span' ).should( 'exist' );
	} );

	it( 'Verify by default View Site option should be displayed', () => {
		cy.get( '.nfd-button--primary', {
			timeout: customCommandTimeout,
		} )
			.eq( 1 )
			.should( 'exist' )
			.invoke( 'removeAttr', 'target' )
			.click();
		cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
	} );
} );

describe( 'Commerce Home Page- Next Steps', () => {
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

	before( () => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce` , {
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
		if ( pluginId == 'crazy-domains' ) {
			cy.url().should(
				'equal',
				`https://my.yoast.com/signup?redirect_to=https://academy.yoast.com/courses/?utm_medium=crazydomains_plugin&utm_source=wp-home`
			);
		} else {
			cy.url().should(
				'equal',
				`https://my.yoast.com/signup?redirect_to=https://academy.yoast.com/courses/?utm_medium=${ pluginId }_plugin&utm_source=wp-home`
			);
		}
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
