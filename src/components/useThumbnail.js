const REACT_APP_THUMBNAIL_URL =
  'https://thumbnail.uapi.newfold.com/v1/thumbnail/get-screenshot';

const REACT_APP_THUMBNAIL_JWT =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6InRodW1ibmFpbCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1cm46amFydmlzOmJsdWVob3N0Iiwic2NvcGUiOiJ1c2VyLWZlIiwiYWN0Ijp7InN1YiI6ImphcnZpczpibHVlaG9zdDp1c2VyOnRlc3R1c2VyIiwicm9sZSI6ImFkbWluIn0sImF1ZCI6IlFBIiwiZXhwIjoxOTk2MTY4NDM2LCJpYXQiOjE2ODA1OTI0MzZ9.RDo_m2PP18ZAduFbCM1FVfDFpAh41785DtTkxRotN8qLcce95FZN8JkMiZdY7FOVzYLpAoY8bX6I8jcD7Libz1Q1Q02Qxy1vLX5-CUuwQ9VOioqs6637gBDspmO9ZjKj7Qy4DNnSzVW_e6qQQye9ZGDmeI1HsSm9LYhtTM6sPI7maSqMtCfCnJNJGHW0nO3AI1s4m11f6cxYHATypol6mNcVb1Jw7ex9e4-azWWOdESPotGxTJaA4kWDMrxIRR1Sg_0RLuurjvXMDLqCKarYGCH-JhDBIjyNS8j1ikTYY9rhPzim438u1Cp-txfPzMlopOSIW5zBuc5X7B9g2y8-TQ';

const fetchThumbnail = async (siteUrl, override) => {
  const result = await fetch(
    `${REACT_APP_THUMBNAIL_URL}?site_url=${siteUrl}&force_override=${override}`,
    {
      headers: {
        Authorization: `Bearer ${REACT_APP_THUMBNAIL_JWT}`,
      },
    }
  );
  return await result.json();
};

const useThumbnail = async (siteUrl, override = false) => {
  const result = await fetchThumbnail(siteUrl, override);
  return result;
};

export default useThumbnail;
