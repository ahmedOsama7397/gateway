import axios from "axios";
class RequestHandler {
  constructor() {
    // Initialize any properties or variables
  }

  async sendRequests(modify: any) {
    try {
      const promises = modify.flat().map((obj: any) => this.sendRequest(obj));

      const responses = await Promise.allSettled(promises);

    } catch (error) {
    }
  }

  async sendRequest(obj: any) {
    try {
      const { method, url, body, query, header } = obj;
      // const formData = new FormData();
      // const zxppc = Object.entries(values).map(([attribute, value]) =>
      //   formData.append(attribute, value)
      // );

      // const zxc = typeof body === "object" ? body : zxppc;

      const startTime: any = new Date().getSeconds();

      const response = await axios.request({
        method,
        url,
        data: body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...header,
        },
        params: query,
      });
      const endTime: any = new Date().getSeconds();
      const requestTime: any = endTime - startTime;

      return response.data;
    } catch (error) {
      console.error(`Error sending request to ${obj.url}:`, error);
      throw error;
    }
  }
}

export default RequestHandler;
