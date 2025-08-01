import { StepsContext } from "./StepsContext";
import { steps } from "./steps";

export const StepsProvider = ({ children }) => (
	<StepsContext.Provider value={steps}>
		{children}
	</StepsContext.Provider>
);