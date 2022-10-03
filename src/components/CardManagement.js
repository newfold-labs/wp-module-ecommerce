import { useState } from "@wordpress/element";
import FetchDependency from "./FetchDependency";

const CardManagement = ({ config: configList, setIsLoading, setHasError }) => {
  const [allResponses, setAllResponses] = useState({});
  const requiredConfigs = configList.filter((config) => config.shouldRender());
  let allResponsesTemp = allResponses;

  const updateAllResponses = (title, responses) => {
    if (allResponsesTemp?.title) {
      const value = allResponsesTemp[title];
      allResponsesTemp[title] = { ...value, responses };
    } else {
      allResponsesTemp[title] = responses;
    }
    if (Object.keys(allResponsesTemp).length == requiredConfigs.length) {
      setIsLoading(false);
      setAllResponses(allResponsesTemp);
    }
  };

  return (
    <>
      {requiredConfigs.map((config) => (
        <FetchCardData
          key={config.title}
          config={config}
          updateAllResponses={updateAllResponses}
          setHasError={setHasError}
          setIsLoading={setIsLoading}
        />
      ))}
      {Object.keys(allResponses).length > 0 &&
        requiredConfigs.map((config) => (
          <config.Card {...config} responses={allResponses[config.title]} />
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
  const updateCardData = (res) => {
    responses[res[0]] = res[1];
    if (res[1]?.error) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    updateAllResponses(config.title, responses);
  };

  return (
    <>
      {config.dataDependencies.map((onLoad, index) => (
        <FetchDependency
          key={index}
          onLoad={onLoad}
          updateResponse={updateCardData}
        />
      ))}
    </>
  );
};
