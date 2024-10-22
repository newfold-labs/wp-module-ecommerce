import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@newfold/ui-component-library";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { myPluginsAndToolsPageLink, wpSolutionsPromotedPluginsList } from "../constants";
import { ReactComponent as RightArrow } from "../icons/right-arrow.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { NoExistingPlan } from "./NoExistingPlan";
import { Section } from "./Section";
import classNames from 'classnames';

export function WPSolutionsBanner() {
	const entitlementsEndPoint = NewfoldRuntime.createApiUrl("/newfold-solutions/v1/entitlements");
	const [ error, setError ] = useState(null);
	const [ apiResponse, setApiResponse ] = useState(null);
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ purchasedSolution, setPurchasedSolution] = useState(null);
	const [ availableSolutions, setAvailableSolutions] = useState([]);
	let currentSolution = [];
	const hasSolution = NewfoldRuntime.hasCapability("hasSolution");

	const routeChange = () => {
		location.href = myPluginsAndToolsPageLink;
	};

	useEffect( () => {
		apiFetch( { url: `${ entitlementsEndPoint }` } ).then(
			( result ) => {
				setIsLoaded(true);
				setApiResponse(result);
				result['solution'] && setPurchasedSolution(result['solution'])
				setAvailableSolutions(result['solutions'])
			},
			( error ) => {
				setIsLoaded( true );
				setError( error );
			}
		);
	}, [] );

	if ( error ) {
		return (
			<div className="nfd-flex nfd-p-6 nfd-bg-white nfd-w-full nfd-rounded-lg nfd-text-red-700">
			  <ExclamationTriangleIcon className="nfd-w-[24px] nfd-h-[24px]" />
			  <span className="nfd-ml-1.5">{__("Oops! something went wrong. Please try again later", "wp-module-ecommerce")}</span>
			</div>
		);
	}
	else if (!isLoaded){
		return (
			<div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-full">
			  <Spinner size="8" className="nfd-text-primary" />
			</div>
		  );
	}
	else if (apiResponse) {
		if (purchasedSolution === null) {
			return (<NoExistingPlan availableSolutions={availableSolutions} />);
		}
		else{
			currentSolution = 
				purchasedSolution === "WP_SOLUTION_CREATOR" ?
				wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_CREATOR'] :
				purchasedSolution === "WP_SOLUTION_SERVICE" ?
				wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_SERVICE'] :
				wpSolutionsPromotedPluginsList[0]['WP_SOLUTION_COMMERCE'];
			let solutionsCards = Object.values(currentSolution);
			return(
				hasSolution &&
				(<Section.Container className="nfd-container">
					<Section.Header
						title={__("Explore Your Plugins and Tools", "wp-module-ecommerce")}
						subTitle={__("Improve your site with the tools and services included in your plan.", "wp-module-ecommerce")}
						secondaryAction={{title : __( `View all your plugins and tools`, "wp-module-ecommerce" ), className: false, onClick: routeChange }}
					/>
					<Section.Content className="nfd-app-section-home">
						<div className={classNames('nfd-grid nfd-grid-flow-row-dense nfd-grid-cols-12 nfd-grid-rows-2 nfd-gap-6')}>
							{
								solutionsCards?.map((details, index) => {
									return (
										<div key={`card-${index}`} className={classNames("max-[950px]:nfd-col-span-12", "nfd-flex nfd-flex-col nfd-bg-[#F1F5F7] nfd-p-6 nfd-rounded-lg nfd-border nfd-border-[#E2E8F0] nfd-box-content", `${ index === 0 || index === 3 ? 'nfd-col-span-7': 'nfd-col-span-5'}`)}>
											<h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-semibold nfd-mb-4">
												{ __(`${details['title']}`,"wp-module-ecommerce") }
											</h2>
											<p className="nfd-text-[#0F172A] nfd-text-base nfd-leading-5 nfd-font-normal nfd-mb-10">
												{ __(`${details['description']}`,"wp-module-ecommerce") }
											</p>
											${ window.NewfoldRuntime.installer.renderInstallerButton( details, 'nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start', <RightArrow className="nfd-mt-2.5" /> ) }
										</div>)
								})
							}
						</div>
						<Button as="a" href={myPluginsAndToolsPageLink} className="nfd-button nfd-button--secondary nfd-flex nfd-w-56 nfd-mx-auto nfd-mt-6">
							{__(`View all your plugins and tools`, "wp-module-ecommerce")}
						</Button>
					</Section.Content>
				</Section.Container>)
			)
		}
	}
}
