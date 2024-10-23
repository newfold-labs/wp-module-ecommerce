import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button, Spinner } from '@newfold/ui-component-library';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import {
	myPluginsAndToolsPageLink,
	solutionButtonTextObject,
	wpSolutionsPromotedPluginsList,
} from '../constants';
import { ReactComponent as RightArrow } from '../icons/right-arrow.svg';
import { NewfoldRuntime } from '../sdk/NewfoldRuntime';
import { PluginsSdk } from '../sdk/plugins';
import { NoExistingPlan } from './NoExistingPlan';
import { Section } from './Section';
import classNames from 'classnames';

export function WPSolutionsBanner() {
	const entitlementsEndPoint = NewfoldRuntime.createApiUrl(
		'/newfold-solutions/v1/entitlements'
	);
	const [ error, setError ] = useState( null );
	const [ apiResponse, setApiResponse ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ purchasedSolution, setPurchasedSolution ] = useState( null );
	const [ availableSolutions, setAvailableSolutions ] = useState( [] );
	const [ pluginActiveStatusArray, setPluginActiveStatusArray ] = useState(
		[]
	);
	let currentSolution = [];
	const hasSolution = NewfoldRuntime.hasCapability( 'hasSolution' );
	const canSolution = NewfoldRuntime.hasCapability(
		'abTestSolutionsLaunched'
	);

	const premiumPluginStatus = useSWR(
		'nfd_slug_wonder_cart',
		() =>
			PluginsSdk.queries
				.status(
					'nfd_slug_wonder_cart',
					'sensei-lms',
					'wp-seo',
					'yith-woocommerce-affiliates',
					'yith-woocommerce-booking',
					'yith-woocommerce-points-and-rewards',
					'yith-woocommerce-wishlist',
					'yith-woocommerce-advanced-reviews',
					'yith-woocommerce-dynamic-pricing-and-discounts'
				)
				.then( ( res ) => {
					setPluginActiveStatusArray( res?.details );
				} ),
		{ refreshInterval: 30 * 1000 }
	);

	const routeChange = () => {
		location.href = myPluginsAndToolsPageLink;
	};

	useEffect( () => {
		apiFetch( { url: `${ entitlementsEndPoint }` } ).then(
			( result ) => {
				setIsLoaded( true );
				setApiResponse( result );
				result.solution && setPurchasedSolution( result.solution );
				setAvailableSolutions( result.solutions );
			},
			( e ) => {
				setIsLoaded( true );
				setError( e );
			}
		);
	}, [] );

	if ( ! canSolution ) {
		return;
	}
	if ( error ) {
		return (
			<div className="nfd-flex nfd-p-6 nfd-bg-white nfd-w-full nfd-rounded-lg nfd-text-red-700">
				<ExclamationTriangleIcon className="nfd-w-[24px] nfd-h-[24px]" />
				<span className="nfd-ml-1.5">
					{ __(
						'Oops! something went wrong. Please try again later',
						'wp-module-ecommerce'
					) }
				</span>
			</div>
		);
	} else if ( ! isLoaded ) {
		return (
			<div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-full">
				<Spinner size="8" className="nfd-text-primary" />
			</div>
		);
	} else if ( apiResponse ) {
		if ( purchasedSolution === null || ! hasSolution ) {
			return <NoExistingPlan availableSolutions={ availableSolutions } />;
		}

		switch ( purchasedSolution ) {
			case 'WP_SOLUTION_CREATOR':
				currentSolution =
					wpSolutionsPromotedPluginsList[ 0 ].WP_SOLUTION_CREATOR;
				break;
			case 'WP_SOLUTION_SERVICE':
				currentSolution =
					wpSolutionsPromotedPluginsList[ 0 ].WP_SOLUTION_SERVICE;
				break;
			case 'WP_SOLUTION_COMMERCE':
			default:
				currentSolution =
					wpSolutionsPromotedPluginsList[ 0 ].WP_SOLUTION_COMMERCE;
		}
		const solutionsCards = Object.values( currentSolution );
		return (
			hasSolution && (
				<Section.Container className="nfd-container">
					<Section.Header
						title={ __(
							'Explore Your Plugins and Tools',
							'wp-module-ecommerce'
						) }
						subTitle={ __(
							'Improve your site with the tools and services included in your plan.',
							'wp-module-ecommerce'
						) }
						secondaryAction={ {
							title: __(
								`View all your plugins and tools`,
								'wp-module-ecommerce'
							),
							className: false,
							onClick: routeChange,
						} }
					/>
					<Section.Content className="nfd-app-section-home">
						<div
							className={ classNames(
								'nfd-grid nfd-grid-flow-row-dense nfd-grid-cols-12 nfd-grid-rows-2 nfd-gap-6'
							) }
						>
							{ solutionsCards?.map( ( details, index ) => {
								return (
									<div
										key={ `card-${ index }` }
										className={ classNames(
											'max-[950px]:nfd-col-span-12',
											'nfd-flex nfd-flex-col nfd-bg-[#F1F5F7] nfd-p-6 nfd-rounded-lg nfd-border nfd-border-[#E2E8F0] nfd-box-content',
											`${
												index === 0 || index === 3
													? 'nfd-col-span-7'
													: 'nfd-col-span-5'
											}`
										) }
									>
										<h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-leading-5 nfd-font-semibold nfd-mb-4">
											{ details.title }
										</h2>
										<p className="nfd-text-[#0F172A] nfd-text-base nfd-leading-5 nfd-font-normal nfd-mb-10">
											{ details.description }
										</p>
										{
											//For type plugin
											details.plsSlug !== '' ? (
												Object.entries(
													pluginActiveStatusArray
												).map(
													( [
														slug,
														{ status, url },
													] ) =>
														details.plsSlug ===
														slug ? (
															//installed & active
															status ===
															'active' ? (
																<Button
																	key={ `btn-${ index }` }
																	className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start"
																	as="a"
																	href={ url }
																>
																	{ details.cta.text }
																	<RightArrow className="nfd-mt-2.5" />
																</Button>
															) : //installed but not active
															status ===
															  'need_to_activate' ? (
																<Button
																	key={ `btn-${ index }` }
																	className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start"
																	as="button"
																	data-nfd-installer-plugin-activate={
																		true
																	}
																	data-nfd-installer-pls-slug={
																		slug
																	}
																	data-nfd-installer-pls-provider={
																		details.plsProviderName
																	}
																	data-nfd-installer-plugin-name={
																		details.name
																	}
																	data-nfd-installer-plugin-url={
																		url
																	}
																>
																	{ details.cta.text }
																	<RightArrow className="nfd-mt-2.5" />
																</Button>
															) : //need to install
															status ===
															  'need_to_install' ? (
																//premium
																details.plsProviderName &&
																details.plsSlug &&
																! details.download ? (
																	<Button
																		key={ `btn-${ index }` }
																		className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start"
																		as="button"
																		data-nfd-installer-plugin-activate={
																			true
																		}
																		data-nfd-installer-pls-slug={
																			slug
																		}
																		data-nfd-installer-pls-provider={
																			details.plsProviderName
																		}
																		data-nfd-installer-plugin-name={
																			details.name
																		}
																		data-nfd-installer-plugin-url={
																			url
																		}
																		isLoading={
																			status ===
																			'installing'
																		}
																	>
																		{ details.cta.text }
																		<RightArrow className="nfd-mt-2.5" />
																	</Button>
																) : //free
																details.download ? (
																	<Button
																		key={ `btn-${ index }` }
																		className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start"
																		as="button"
																		data-nfd-installer-plugin-activate={
																			true
																		}
																		data-nfd-installer-plugin-name={
																			details.name
																		}
																		data-nfd-installer-download-url={
																			details.download
																		}
																		data-nfd-installer-plugin-url={
																			url
																		}
																		isLoading={
																			status ===
																			'installing'
																		}
																	>
																		{ details.cta.text }
																		<RightArrow className="nfd-mt-2.5" />
																	</Button>
																) : null
															) : null
														) : null
												)
											) : (
												//For type not plugin
												<Button
													key={ `btn-${ index }` }
													className="nfd-button nfd-button--primary nfd-mt-9 nfd-mt-auto nfd-self-start"
													as="a"
													href={ details.cta.url }
												>
													{ details.cta.text }
													<RightArrow className="nfd-mt-2.5" />
												</Button>
											)
										}
									</div>
								);
							} ) }
						</div>

						<Button
							as="a"
							href={ myPluginsAndToolsPageLink }
							className="nfd-button nfd-button--secondary nfd-flex nfd-w-56 nfd-mx-auto nfd-mt-6"
						>
							{ __(
								`View all your plugins and tools`,
								'wp-module-ecommerce'
							) }
						</Button>
					</Section.Content>
				</Section.Container>
			)
		);
	}
}
