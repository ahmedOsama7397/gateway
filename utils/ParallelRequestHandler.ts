import { Worker } from "worker_threads";
import { GETRequestParameters } from "../services/ServiceInterface";
import tsNode from "ts-node";
import ts from "typescript";
import fs from "fs";

export interface RequestParameters {
  method: "POST" | "GET" | "PUT" | "DELETE" | string;
  url: string;
  body?: any;
  query?: any;
  header?: any;
  file?: Buffer;
}

class ParallelRequestHandler {
  private runningThreads: number;
  private maxThreads: number;

  constructor(maxThreads: number = 10) {
    this.runningThreads = 0;
    this.maxThreads = maxThreads;
  }

  async sendRequests(requests: GETRequestParameters[]) {
    try {
      const workerPromises: any = requests
        .flat()
        .map((request: GETRequestParameters) => {
          const key = request.key;
          return this.sendRequestWithWorker(request);
        });

      const responses = await Promise.all(workerPromises);

      return responses;
    } catch (error: any) {
      console.error(error.message);
      return error;
    }
  }

  sendRequestWithWorker(request: GETRequestParameters) {
    const tsCode = fs.readFileSync("./utils/requestWorker.ts", "utf-8");

    // Transpile the TypeScript code into JavaScript
    const jsCode = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2018, // Set the target ECMAScript version
        module: ts.ModuleKind.CommonJS, // Set the module system
      },
    }).outputText;
    return new Promise((resolve, reject) => {
      const worker = new Worker(jsCode, {
        workerData: request,
      });

      // Increment the running thread count
      this.runningThreads++;

      worker.on("message", (response) => {
        // Decrement the running thread count
        this.runningThreads--;
        resolve(response);
      });

      worker.on("error", (error) => {
        // Decrement the running thread count
        this.runningThreads--;
        reject(error);
        return error;
      });

      worker.on("exit", (code) => {
        // Decrement the running thread count
        this.runningThreads--;

        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });

      // Limit the number of threads
      if (this.runningThreads >= this.maxThreads) {
        worker.terminate();
        reject(new Error("Maximum thread limit reached."));
      }
    });
  }
}

export default ParallelRequestHandler;