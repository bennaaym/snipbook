import { useState } from "react";
import { AwsService } from "../services";

export const useS3 = () => {
  const [data, setData] = useState({
    url: "",
    loading: false,
    error: null,
  });

  const upload = async (file: File) => {
    // request a signed S3 upload url
    try {
      setData((prev) => ({ ...prev, isLoading: true }));
      const {
        data: {
          data: { s3Url },
        },
      } = await AwsService.getS3Url();

      // upload file to cloud
      await AwsService.uploadFileToS3(s3Url, file);

      const url = s3Url.split("?")[0];
      setData((prev) => ({ ...prev, url }));
    } catch (err) {
      console.log(err);
    }
  };

  return [data, upload];
};

export default useS3;
