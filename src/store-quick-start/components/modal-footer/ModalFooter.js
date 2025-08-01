import {Button} from "@newfold/ui-component-library";
import {_x} from "@wordpress/i18n";
import {useContext} from "react";
import {StepsContext} from "../../StepsContext";

export const ModalFooter = ({onNextClick, onBackClick, currentStep}) => {
	const steps = useContext(StepsContext);
	const step  = steps[currentStep];

	return (
		<div className="nfd-store-quick-start__step-navigation">
			{currentStep > 1 && <Button onClick={onBackClick} variant="secondary" size="large">{
				step.backButtonLabel || _x('Back', 'Store quick start nav button label', 'wp-module-ecommerce')
			}</Button>}
			<Button onClick={onNextClick} size="large">{
				step.nextButtonLabel || _x('Next', 'Store quick start nav button label', 'wp-module-ecommerce')
			}</Button>
		</div>
	)
}