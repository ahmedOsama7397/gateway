import axios from "axios";
import RequestLogger from "./RequestLogger";

const apiHandler = (obj: any) => {
  const requestLogger = new RequestLogger();
  const requestTime = new Date().getTime();

  return new Promise(async (resolve, reject) => {
    const { method, url, body, query, headers, key, file } = obj;

    const response = await axios
      .request({
        method,
        url,
        data: body,
        headers: {
          Accept: "application/json",
          ...headers,
          // host: "central.suiiz.test",
        },
        params: query,
      })
      .then((response) => {
        resolve({ [key]: response.data });

        return response;
      })
      .catch((err) => {
        reject({ [key]: err.response.data });

        return err.response;
      });
    const endTime = new Date().getTime();
    const responseTime = endTime - requestTime;

    requestLogger.logger(
      response.data,
      url,
      method,
      response.headers,
      body,
      responseTime,
      response.status,
      key
    );

    return response;
  });
};

export default apiHandler;
