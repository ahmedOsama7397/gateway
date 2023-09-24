import config from "../config";
import LoggerTable from "../models/LoggerTable";
import { RequestMethods } from "../console/services/ServiceInterface";
import { v4 as uuidv4 } from "uuid";

class RequestLogger {
  async logger(
    response: Object,
    url: string,
    method: RequestMethods,
    headers: Object,
    body: Record<string, string>,
    responseTime: number,
    status: number,
    key: string
  ) {
    const loggerData: Record<string, string | number | Object> = {
      request: {
        url: url,
        method: method,
        headers: headers,
        body: body,
      },
      response: response,
      status: status,
      platform: process.platform,
      environment: config.dev.APP_URL as string,
      time: new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "Africa/Cairo",
          hour12: true,
        })
      ),
      responseTime: responseTime,
      key: key,
      uuid: uuidv4(),
    };

    console.log(loggerData);

    const logEntry = new LoggerTable({
      time: loggerData.time,
      request: loggerData.request,
      response: loggerData.response,
      status: loggerData.status,
      platform: loggerData.platform,
      environment: loggerData.environment,
      responseTime: responseTime,
      key: key,
      uuid: loggerData.uuid,
    });

    try {
      await logEntry.save();
    } catch (error) {
      console.error("Error saving log entry:", error);
    }
  }
}

export default RequestLogger;
