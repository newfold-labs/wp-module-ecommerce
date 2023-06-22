import {
	HiiveAnalytics,
	HiiveEvent,
} from '@newfold-labs/js-utility-ui-analytics';

export const trackHiiveEvent = ( action, value ) => {
	const data = {
		value,
		timestamp: Date.now(),
	};
    console.log(data)
	if ( 'pageview' === action ) {
		data.page = value;
	}
	const hiiveEvent = new HiiveEvent( 'commerce', action, data, 'commerce' );

	HiiveAnalytics.send( hiiveEvent );
};
