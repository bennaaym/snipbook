import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
} from "@mui/material";
import { customTheme } from "../../common";

interface IProps {
  label: string;
  icon: JSX.Element;
  action: () => void;
}

const ProfileBarItem: React.FC<IProps> = ({ label, icon, action }: IProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={action}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: 600,
            color: customTheme.color.paragraph,
            textTransform: "capitalize",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ProfileBarItem;
