const fs = require( 'fs' );
const semver = require( 'semver' );
const packagefile = './package.json';
const pluginfile = './bootstrap.php';

if ( fs.existsSync( packagefile ) && fs.existsSync( pluginfile ) ) {
	const packageData = require( packagefile );
	const currentVersion = packageData.version;
	let type = process.argv[ 2 ];
	if ( ! [ 'major', 'minor', 'patch' ].includes( type ) ) {
		type = 'patch';
	}

	const newVersion = semver.inc( packageData.version, type );
	packageData.version = newVersion;

	// update version in package file
	fs.writeFileSync( packagefile, JSON.stringify( packageData, null, 2 ) );

	fs.readFile( pluginfile, 'utf8', function ( err, data ) {
		if ( err ) {
			return console.log( err );
		}
		const result = data.replaceAll( currentVersion, newVersion );

		// update version in php file
		fs.writeFile( pluginfile, result, 'utf8', function ( err ) {
			if ( err ) {
				return console.log( err );
			}
		} );
	} );

	console.log( 'Version updated', currentVersion, '=>', newVersion );
}
