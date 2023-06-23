import { HiiveAnalytics, HiiveEvent } from '@newfold-labs/js-utility-ui-analytics';

export const trackHiiveEvent = ( action, value ) => {
	const hiiveEvent = new HiiveEvent( 'wp-module-ecommerce', action, {
		value,
		timestamp: Date.now(),
	}, 'commerce' );
     HiiveAnalytics.send( hiiveEvent );
};
