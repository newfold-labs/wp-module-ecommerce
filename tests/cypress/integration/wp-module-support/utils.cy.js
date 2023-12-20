const customCommandTimeout = 30000
export const comingSoon = (shouldBeComingSoon) => {
    cy.get('#wp-admin-bar-site-status', { timeout: customCommandTimeout }).find('a').click()

    cy.get('[data-id="coming-soon-toggle"]', { timeout: customCommandTimeout }).as('comingSoonToggle')

    if (shouldBeComingSoon) {
        cy.get('@comingSoonToggle').invoke('attr', 'aria-checked').then(area_checked => {
            if (area_checked == 'false') {
                cy.get('@comingSoonToggle').click()
                cy.get('.nfd-notification--success', { timeout: customCommandTimeout }).should('exist')

            }

        })

    } else {
        cy.get('@comingSoonToggle').invoke('attr', 'aria-checked').then(area_checked => {
            if (area_checked == 'true') {
                cy.get('@comingSoonToggle').click()
                cy.get('.nfd-notification--success', { timeout: customCommandTimeout }).should('exist')

            }

        })

    }

}

export const installWoo = () => {
    cy.contains('.nfd-button--upsell', 'Install WooCommerce', { timeout: 90000 }).click()
    cy.get('.nfd-button--upsell.nfd-cursor-wait').should('exist')
    cy.get('.nfd-notifications--bottom-left .nfd-notification--success', {timeout: customCommandTimeout}).should('exist')
    cy.get('.nfd-w-0  p').should('have.text', 'WooCommerce has been installed successfully')

}