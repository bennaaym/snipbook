import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";

interface IActionButton {
  label: string;
  color: string;
  backgroundColor: string;
  borderRadius: number;
  action: () => void;
}

const ActionButton: React.FC<IActionButton> = ({
  label,
  color,
  backgroundColor,
  borderRadius,
  action,
}: IActionButton) => {
  return (
    <Fragment>
      <Button
        variant="contained"
        disableElevation
        style={{
          color,
          backgroundColor,
          borderRadius,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: 600,
          width: 140,
        }}
        onClick={action}
      >
        {label}
      </Button>
    </Fragment>
  );
};

export default ActionButton;
