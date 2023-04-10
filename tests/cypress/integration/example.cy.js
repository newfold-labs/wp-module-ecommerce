const customCommandTimeout = 10000;
var homeUrl = '/wp-admin/admin.php?page=bluehost#/home/store/general';

describe('As a wp-admin user, I want to ', function () {
  beforeEach(() => {
    cy.visit(homeUrl);
    cy.injectAxe();
    cy.contains('Tax Info', { timeout: 30000 });
  });

  it('verify "WooCommerce is not installed!" model displaying when WooCommerce plugin is not install or active', () => {
    cy.deactivatePlugin('woocommerce');
    cy.reload();
    cy.contains('Uh-Oh! WooCommerce is not installed!', {
      timeout: customCommandTimeout,
    }).should('exist');
    cy.contains(
      'WooCommerce is required for this dashboard to work, install it now or contact our support team for more assistance.'
    ).should('exist');
    cy.contains('Install WooCommerce').should('exist');
    cy.contains('Contact Support').should('exist');
    const urlToVerify = 'https://www.bluehost.com/contact';
    cy.window().then((win) => {
      cy.stub(win, 'open')
        .as('windowOpen')
        .callsFake(() => {});
    });
    cy.contains('Contact Support').click();
    cy.get('@windowOpen').should('be.calledWith', urlToVerify, '_blank');
  });
});
