import { Fragment, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../../common";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  uploadButton: {
    display: "none",
  },

  customUploadButton: {
    display: "block",
    color: customTheme.color.background,
    background: "#6b7280",

    borderRadius: 5,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 16,
    "&:hover": {
      opacity: 0.9,
    },
  },
});

enum ImageFormat {
  JPEG = "jpeg",
  JPG = "jpg",
  PNG = "png",
}

interface IProps {
  onDone: (base64: string) => any;
}

const ImageBase: React.FC<IProps> = ({ onDone }: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      const fileType = file?.type.split("/")[1] as ImageFormat;

      if (!Object.values(ImageFormat).includes(fileType))
        reject("Invalid format, please upload a PNG, JPG or JPEG file");

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files) return;
    try {
      const base64 = await convertToBase64(files[0]);
      onDone(base64 as string);
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <Fragment>
      <label htmlFor="upload-button" className={classes.customUploadButton}>
        <CloudUpload sx={{ fontSize: 40 }} />
      </label>
      <input
        type="file"
        id="upload-button"
        name="upload-button"
        className={classes.uploadButton}
        onChange={handleFileRead}
      />
      {error && (
        <Typography component="p" color="error">
          {error}
        </Typography>
      )}
    </Fragment>
  );
};

export default ImageBase;
