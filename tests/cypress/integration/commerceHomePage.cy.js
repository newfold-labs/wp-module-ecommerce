import 'cypress-iframe'

const customCommandTimeout = 40000;


describe(
	'Bluehost WP Admin Home Page',
	() => {
		before(()=>{
			cy.activatePlugin('all');
		})

		beforeEach(()=> {
			cy.visit('/wp-admin/admin.php?page=bluehost#/home')
		})

		it('Test Next steps for your site exists', ()=> {
			cy.contains('Next steps for your site', {timeout: customCommandTimeout}).should('exist')
		})

		it('Test Ready to go next level ', ()=> {
			cy.contains('Ready to go to the next level?', {timeout: customCommandTimeout}).should('exist')
		})
	
	}
);
