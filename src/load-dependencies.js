import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import { createApiUrl } from './sdk/createApiUrl';
import domReady from '@wordpress/dom-ready';
console.log("Loaded WP Dependencies For NFD-Ecommerce");
let singleUrl = createApiUrl('/newfold-data/v1/events');
let batchUrl = createApiUrl('newfold-data/v1/events/batch');

domReady(()=>{
     HiiveAnalytics.initialize( {
          namespace: 'commerce',
          urls: {
                single: singleUrl,
                batch: batchUrl
           },
           settings: {
                debounce: {
                     time: 1000,
                }
           },
      } );
})
