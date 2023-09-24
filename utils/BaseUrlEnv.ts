const handleBaseUrlEnvironment = (EnvUrl: string) => {
  const baseURL = EnvUrl?.includes("http://")
    ? EnvUrl
    : (("http://" + EnvUrl) as string);

  console.log(baseURL, "baseURL");

  return baseURL;
};

export default handleBaseUrlEnvironment;
