export const APIList = {
    'bh_academy' : '/index.php?rest_route=%2Fnewfold-data%2Fv1%2Fevents&_locale=user',
    'yoast_seo_academy' : '/index.php?rest_route=%2Fnewfold-data%2Fv1%2Fevents&_locale=user',
}

export const EventsAPI = (events_name, pluginId) => {
    cy.intercept(api_name).as('events');
    cy.wait('@events').then((requestObject) => {
        const responseBody = requestObject.request.body;
        const responseData = responseBody[0].data;
        if (events_name == 'bh_academy') {
            
            expect(responseBody.category).equal(
                'next_step'
            );
            expect(responseBody.action).equal(
                'next_step_bh_wp_academy_clicked'
            );

            expect(responseData.page).equal(
                cy.url()
            )
        }

        if (events_name == 'yoast_seo_academy') {
            
            expect(responseBody.category).equal(
                'next_step'
            );
            expect(responseBody.action).equal(
                'next_step_yoast_academy_clicked'
            );

            expect(responseData.page).equal(
                cy.url()
            )
        }
            
    });
}
