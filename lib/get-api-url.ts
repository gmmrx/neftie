const getApiUrl = (): string => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  switch (environment) {
    case "DEV":
      return "http://localhost:3000/api";
    case "PROD":
      return "https://neftie.app/api";
    default:
      throw new Error("Unknown environment: " + environment);
  }
};

export default getApiUrl;
