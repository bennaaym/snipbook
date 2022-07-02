import { Fragment, useState } from "react";
import { DriveFolderUpload } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { alpha, Typography } from "@mui/material";
import { customTheme } from "../common";

const useStyles = makeStyles({
  uploadButton: {
    display: "none",
  },

  customUploadButton: {
    display: "block",
    color: customTheme.color.background,
    background: alpha(customTheme.color.primary, 0.8),

    borderRadius: 5,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 16,
    "&:hover": {
      opacity: 0.9,
    },
  },
});

interface IProps {
  allowedExtensions?: string[];
  onChange: (file: File) => any;
}

const UploadFile: React.FC<IProps> = ({
  allowedExtensions,
  onChange,
}: IProps) => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const handleFileRead = (event: any) => {
    const file = event.target.files[0];
    const fileType = file?.type.split("/")[1];
    if (allowedExtensions && !allowedExtensions?.includes(fileType)) {
      setError(
        `Invalid format, please upload a file with a valid extension (${allowedExtensions.join(
          ", "
        )})`
      );
      return;
    }
    if (error) setError("");
    onChange(file);
  };

  return (
    <Fragment>
      <label htmlFor="upload-button" className={classes.customUploadButton}>
        <DriveFolderUpload sx={{ fontSize: 40 }} />
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

export default UploadFile;
