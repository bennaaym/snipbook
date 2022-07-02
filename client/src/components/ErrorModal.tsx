import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { customTheme } from "../common";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: customTheme.color.background,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  message: string;
  action: () => void;
}

const ErrorModal: React.FC<IProps> = ({ message, action }: IProps) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    action();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ErrorModal;
