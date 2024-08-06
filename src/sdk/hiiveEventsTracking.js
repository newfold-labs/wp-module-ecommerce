import apiFetch from "@wordpress/api-fetch";
import { NewfoldRuntime } from "./NewfoldRuntime";

/**
 * Send events to the WP REST API
 *
 * @param {Object} event The event data to be tracked.
 */
const sendEvent = ( event ) => {
    event.data = event.data || {};
    event.data.page = window.location.href;
    apiFetch( {
        url: NewfoldRuntime.createApiUrl( '/newfold-data/v1/events/' ),
        method: 'POST',
        data: event,
    } );
};

/**
	 * Handle button clicks
	 * @param Event event
	 * @param event
	 * @return
	 */
export const onButtonNavigate = ( event ) => {
    if ( event.keycode && ENTER !== event.keycode ) {
        return;
    }
    sendEvent( {
        action: event.target.getAttribute("data-event-action"),
        data: {
            element: 'button',
            label: event.target.innerText,
            provider: event.target.getAttribute("data-provider"),
        },
    } );
};

/**
 * Handle link clicks
 * @param Event event
 * @param event
 * @return
 */
export const onAnchorNavigate = ( event ) => {
    if ( event.keycode && ENTER !== event.keycode ) {
        return;
    }
    sendEvent( {
        action: event.target.getAttribute("data-event-action"),
        data: {
            element: 'a',
            href: event.target.getAttribute( 'href' ),
            label: event.target.innerText,
            provider: event.target.getAttribute("data-provider"),
        },
    } );
};