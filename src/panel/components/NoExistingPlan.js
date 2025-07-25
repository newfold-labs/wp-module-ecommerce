import { Button } from '@newfold/ui-component-library';
import { __ } from '@wordpress/i18n';
import { ReactComponent as FiftyOff } from '../icons/fifty-off.svg';
import { ReactComponent as GreenTick } from '../icons/green-tick.svg';
import { Section } from './Section';

export function NoExistingPlan( props ) {
	const { availableSolutions } = props;

	availableSolutions?.sort( ( a, b ) => a.priority - b.priority );

	const HtmlContent = ( { htmlString } ) => {
		return <div dangerouslySetInnerHTML={ { __html: htmlString } } />;
	};

	return (
		<Section.Container className="nfd-container">
			<Section.Header
				title={ __(
					'Upgrade your plan for success.',
					'wp-module-ecommerce'
				) }
				subTitle={ __(
					"Choose the set of plugins and services that's right for your needs. You're covered by our no-quibble, 30 day money back guarantee.",
					'wp-module-ecommerce'
				) }
			/>
			<Section.Content className="nfd-app-section-home">
				{ availableSolutions?.map( ( solution ) => {
					return (
						<div className="nfd-border nfd-border-[#E2E8F0] nfd-p-6 nfd-rounded-lg nfd-mb-6 nfd-relative">
							<FiftyOff className="nfd-absolute nfd-top-0 nfd-right-0 nfd-hidden" />
							<h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-semibold nfd-mb-5">
								{ __(
									`${ solution.name.toUpperCase() }`,
									'wp-module-ecommerce'
								) }
							</h2>
							<div className="nfd-flex nfd-flex-row">
								<p className="nfd-text-[#0F172A] nfd-text-base nfd-mb-7 nfd-w-[480px]">
									{ __(
										`${ solution.description }`,
										'wp-module-ecommerce'
									) }
								</p>
								<p className="nfd-text-[#000000] nfd-text-4xl nfd-font-extrabold nfd-ml-auto nfd-mr-10">
									{ solution.price }
									<span className="nfd-text-2xl nfd-text-[#000000] nfd-font-semibold nfd-relative nfd--top-[5px]">
										{ __( '/mo', 'wp-module-ecommerce' ) }
									</span>
									<br />
									<span className="nfd-text-sm nfd-text-[#404040] nfd-font-normal nfd-relative nfd--top-9 nfd-hidden">
										<span>
											{ __(
												'Original price',
												'wp-module-ecommerce'
											) }
										</span>
										<span className="nfd-line-through">
											{ solution.fullPrice }
										</span>
										<span>
											{ __(
												'/mo',
												'wp-module-ecommerce'
											) }
										</span>
									</span>
								</p>
							</div>
							<div className="nfd-flex nfd-flex-row nfd--mt-8">
								<ul className="nfd-mr-6 nfd-grid nfd-grid-cols-2 nfd-gap-x-6 nfd-mt-6">
									{ solution?.features?.map(
										( feat, index ) => {
											return (
												<li
													key={ index }
													className={ classNames(
														'nfd-flex',
														'nfd-flex-row',
														'nfd-items-center',
														{
															'nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3':
																index === 0 ||
																index === 1,
														}
													) }
												>
													<GreenTick className="nfd-mt-1.5 nfd-mr-2" />
													<span className="nfd-text-[#404040] nfd-text-base">
														<HtmlContent
															htmlString={ __(
																`${ feat }`,
																'wp-module-ecommerce'
															) }
														/>
													</span>
												</li>
											);
										}
									) }
								</ul>
								<Button
									as="a"
									href={ solution.url }
									data-action="load-nfd-ctb"
									data-ctb-id={ solution.ctbId }
									className="nfd-button nfd-button--secondary nfd-self-end nfd-ml-auto"
								>
									{ __(
										'Learn more',
										'wp-module-ecommerce'
									) }
								</Button>
							</div>
						</div>
					);
				} ) }
			</Section.Content>
		</Section.Container>
	);
}
