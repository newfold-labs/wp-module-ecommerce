import { useState } from "@wordpress/element";
import FetchDataDependencies from "./FetchdataDependencies";

const CardManagement = ({ config: configList, setIsLoading, setHasError }) => {
  const [allResponses, setAllResponses] = useState(null);
  const requiredConfigs = configList.filter((config) => config.shouldRender());
  let allResponsesTemp = {};

  const updateAllResponses = (title, responses) => {
    allResponsesTemp[title] = responses;
    if (Object.keys(allResponsesTemp).length == requiredConfigs.length) {
      setIsLoading(false);
      setAllResponses(allResponsesTemp);
    }
  };

  if (allResponses) {
    return requiredConfigs.map((config) => (
      <config.Card {...config} responses={allResponses[config.title]} />
    ));
  }

  return (
    <>
      {requiredConfigs.map((config) => (
        <FetchCardData
          config={config}
          updateAllResponses={updateAllResponses}
          setHasError={setHasError}
          setIsLoading={setIsLoading}
        />
      ))}
    </>
  );
};
export default CardManagement;

const FetchCardData = ({
  config,
  updateAllResponses,
  setHasError,
  setIsLoading,
}) => {
  let responses = {};
  const onLoadsLength = config.dataDependencies.length;
  const updateCardData = (res) => {
    responses[res[0]] = res[1];
    const callsCompleted = Object.keys(responses).length;
    if (res[1]?.error) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    if (onLoadsLength == callsCompleted) {
      updateAllResponses(config.title, responses);
    }
  };

  return (
    <>
      {config.dataDependencies.map((onLoad) => (
        <FetchDataDependencies
          onLoad={onLoad}
          updateResponse={updateCardData}
        />
      ))}
    </>
  );
};
