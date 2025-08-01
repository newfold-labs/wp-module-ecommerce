import { forwardRef } from "react";
import { Button, Title } from "@newfold/ui-component-library";
import { _x } from "@wordpress/i18n";

export const StartScreen = forwardRef((props, ref) => {

	return (
		<>
			<div className="nfd-store-quick-start__start-screen-icons">
				<div className="nfd-store-quick-start__start-screen-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"/>
					</svg>
				</div>
				<div className="nfd-store-quick-start__start-screen-icon-sep">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="nfd-store-quick-start__start-screen-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
					</svg>

				</div>
				<div className="nfd-store-quick-start__start-screen-icon-sep">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="nfd-store-quick-start__start-screen-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
					</svg>
				</div>
			</div>
			<Title as="h2">{_x('Store Configuration', 'Store quick start title', 'wp-module-ecommerce')}</Title>
			<p>
				<strong>{_x('Building the store you\'ve always dreamed of starts here:', 'Store quick start description part', 'wp-module-ecommerce')}</strong><br/>
				{_x('just three simple steps and two minutes of your time to begin creating something great.', 'Store quick start description part', 'wp-module-ecommerce')}
			</p>
		</>
	)
});
