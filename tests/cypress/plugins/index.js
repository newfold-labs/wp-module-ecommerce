'use strict';

const mysql = require( 'mysql' );

function queryTestDb( query, config ) {
	const connection = mysql.createConnection( config.env.db );
	connection.connect();
	return new Promise( ( resolve, reject ) => {
		connection.query( query, ( error, results ) => {
			if ( error ) reject( error );
			else {
				connection.end();
				return resolve( results );
			}
		} );
	} );
}

module.exports = ( on, config ) => {
	on( 'task', {
		queryDb: ( query ) => {
			return queryTestDb( query, config );
		},
	} );

	if ( config.env && config.env.baseUrl ) {
		config.baseUrl = config.env.baseUrl;
	}

	return config;
};
