const { parentPort, workerData } = require("worker_threads");
const axios = require("axios");
import { RabbitMQAbstract } from "./RabbitMQ/RabbitMQAbstract";


function sendRequest(obj: any) {
  return new Promise(async (resolve, reject) => {
    const rabbit = new RabbitMQAbstract()
    // try {
    // const { method, url, body, query, headers, key, file } = obj;
    // console.log(body, "body", headers);
    const { method, url, body, query, headers, key, file } = obj;
    console.log(body, "body", headers);

    const startTime = new Date().getSeconds();

    console.log("====================================");
    console.log(url, startTime);
    console.log("====================================");

    // let requestData;
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("file", file, "Jenkinsfile"); // Adjust the field name and filename as needed
    //   if (body) {
    //     formData.append("data", JSON.stringify(body));
    //   }
    //   requestData = formData;
    // } else {
    //   requestData = body;
    // }

    // await axios
    //   .request({
    //     method,
    //     url,
    //     data: requestData,
    //     headers: {
    //       Accept: "application/json",
    //       ...headers,
    //       ...(file ? formData.getHeaders() : {}), // Set the appropriate headers for FormData if file exists
    //     },
    //     params: query,
    //   })
    //   .then((response) => {
    //     console.log(response.data, "res");
    //     resolve({ [key]: response.data });
    //     return response.data;
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data, "error from axios");
    //     reject({ [key]: err.response.data });
    //     return err;
    //   });
    const message = {
      method: method,
      url: url,
      body: body,
      headers: headers,

    };
    await rabbit.send(key, message, 'osama');
    // const response = await axios.request({
    //   method,
    //   url,
    //   data: requestData,
    //   headers: {
    //     Accept: "application/json",
    //     ...headers,
    //     ...(file ? formData.getHeaders() : {}), // Set the appropriate headers for FormData if file exists
    //   },
    //   params: query,
    // });

    const endTime = new Date().getSeconds();
    const requestTime = endTime - startTime;

    console.log(url + " " + requestTime, "req time");
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
    console.log(error);
    parentPort.postMessage({ error });
  });
