import axios from "axios";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import FormData from "form-data";

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const fileUploadMiddleware = upload.any();

export const includeFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const formData = new FormData();

    var fileFilds = [];
    for (const file of req.files as Express.Multer.File[]) {
      fileFilds.push(file.fieldname);
      formData.append("file", file.buffer, file.originalname);
    }

    try {
      const axiosResponse = await axios.post("http://Storage/files", formData, {
        headers: {
          ...formData.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      for (const key in fileFilds) {
        req.body[fileFilds[key]] = axiosResponse.data.file_uuid;
      }
      console.log("Files Uploaded Successfully:", axiosResponse.data);
    } catch (error) {
      console.log("Error uploading files:", error);
      return res.status(500).send("Failed to upload files to storage.");
    }

    next();
  } else {
    console.log("Request does not contain files");
    return res.status(400).send("No files in request.");
  }
};
