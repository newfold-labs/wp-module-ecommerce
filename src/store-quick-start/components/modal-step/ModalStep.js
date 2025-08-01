import {useState, useContext, useRef} from "react";
import {StepsContext} from "../../StepsContext";
import {ModalHeader} from "../modal-header";
import {ModalFooter} from "../modal-footer";
import {Spinner} from "@newfold/ui-component-library";


export const ModalStep = () => {
	const ref = useRef();
	const steps = useContext(StepsContext);
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);

	const step = steps[currentStep];
	const StepComponent = step.component;

	const nextStep = async () => {
		setLoading(true);

		// If a formSubmit function is available, call it and wait for execution and results. Otherwise, proceed.
		if ( ref?.current?.formSubmit ? await ref?.current?.formSubmit() : true ) {
			setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
		}

		setLoading(false);
	}
	const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

	return (
		<>
			{ currentStep > 0 && <ModalHeader currentStep={currentStep} /> }
			<div className={`nfd-store-quick-start__step-wrapper nfd-store-quick-start__${step.key}`}>
				<StepComponent ref={ref} {...step?.componentParams} />
			</div>
			<ModalFooter currentStep={currentStep} onBackClick={prevStep} onNextClick={nextStep} />
			{loading && <div className="nfd-store-quick-start__loading"><Spinner size="8" variant="primary"/></div>}
		</>
	)
}