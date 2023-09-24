const { parentPort, workerData } = require("worker_threads");
const axios = require("axios");

function sendRequest(obj) {
  return new Promise(async (resolve, reject) => {
    // try {
    const { method, url, body, query, headers, key, file } = obj;

    const startTime = new Date().getSeconds();

    console.log("====================================");
    console.log(headers);
    console.log("====================================");

    // let requestData;
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("file", file, "Jenkinsfile");
    //   if (body) {
    //     formData.append("data", JSON.stringify(body));
    //   }
    //   requestData = formData;
    // } else {
    //   requestData = body;
    // }

    await axios
      .request({
        method,
        url,
        data: body,
        headers: {
          Accept: "application/json",
          ...headers,
          host: "central.suiiz.test",
          // ...(file ? formData.getHeaders() : {}),
        },
        params: query,
      })
      .then((response) => {
        // console.log(response.data, "res");
        resolve({ [key]: response.data });
        return response.data;
      })
      .catch((err) => {
        // console.log(err.response, "error from axios");
        reject({ [key]: err.response.data });
        return err;
      });

    const endTime = new Date().getSeconds();
    const requestTime = endTime - startTime;

    // console.log(url + " " + requestTime, "req time");
    //   console.log({ [key]: response.data });
    //   resolve(response.data);
    //   return { [key]: response.data };
    //   } catch (error) {
    //   console.log(error.response.data.message, "error");
    //   parentPort.postMessage({ error });
    //   reject(error);
    //   return error;
    //   }
  });
}

sendRequest(workerData)
  .then((response) => {
    parentPort.postMessage(response);
  })
  .catch((error) => {
    // console.log(error);
    parentPort.postMessage({ error });
  });
