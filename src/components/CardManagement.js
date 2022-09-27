import { useState } from "@wordpress/element";
import FetchDataDependencies from "./FetchdataDependencies";

const CardManagement = ({ config: configList, setIsLoading, setHasError }) => {
  const [allResponses, setAllResponses] = useState({});
  const requiredConfigs = configList.filter((config) => config.shouldRender());
  let globalData = allResponses;

  const updateAllResponses = (title, responses) => {
    if (globalData?.title) {
      const value = globalData[title];
      globalData[title] = { ...value, responses };
    } else {
      globalData[title] = responses;
    }
    if (Object.keys(globalData).length == requiredConfigs.length) {
      setIsLoading(false);
      setAllResponses(globalData);
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
        <FetchDataDependencies
          key={index}
          onLoad={onLoad}
          updateResponse={updateCardData}
        />
      ))}
    </>
  );
};
