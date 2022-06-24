import axios from "axios";
import apiClient from "../api/apiClient";

class AwsService {
  getS3Url = () => apiClient.get("/aws/s3");
  uploadFileToS3 = (signedUrl: string, file: File) =>
    axios.put(signedUrl, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export default new AwsService();
