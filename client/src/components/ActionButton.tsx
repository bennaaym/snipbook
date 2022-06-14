import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";

interface IActionButton {
  label: string;
  color: string;
  backgroundColor: string;
  borderRadius: number;
  styles?: { [property: string]: string | number };
  action: () => void;
}

const useStyles = makeStyles({
  button: {
    "&:hover": {
      opacity: 0.9,
    },
  },
});

const ActionButton: React.FC<IActionButton> = ({
  label,
  color,
  backgroundColor,
  borderRadius,
  styles,
  action,
}: IActionButton) => {
  const classes = useStyles();
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
          minWidth: 140,
          maxWidth: 300,
          ...styles,
        }}
        onClick={action}
        className={classes.button}
      >
        {label}
      </Button>
    </Fragment>
  );
};

export default ActionButton;
