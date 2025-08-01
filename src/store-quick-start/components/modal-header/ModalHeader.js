import {_x, sprintf} from "@wordpress/i18n";
import {useContext} from "react";
import {StepsContext} from "../../StepsContext";

export const ModalHeader = ({currentStep}) => {
	const steps = useContext(StepsContext);

	return (
		<div className="nfd-store-quick-start__step-header">
			{sprintf(_x('Step %1$s of %2$s', '%1$s is the current step number, %2$s is the number of steps', 'wp-module-ecommerce'), currentStep, steps.length - 1)}
		</div>
	)
}