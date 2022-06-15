import { Fragment, useState } from "react";
import { HighlightOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../../common";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
  },

  tagInput: {
    width: 150,
    padding: "10px 10px",
    border: `1px solid ${customTheme.color.paragraph}`,
    borderRadius: 5,
    color: customTheme.color.paragraph,
    fontSize: 16,
  },

  tag: {
    display: "flex",
    alignItems: "center",
    color: customTheme.color.background,
    backgroundColor: customTheme.color.primary,
    padding: "10px 20px",
    borderRadius: 20,
    textTransform: "uppercase",
  },

  removeTagButton: {
    marginRight: 1,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
});

interface IProps {
  tags: string[];
  maxTags: number;
  onChange: (tags: string[]) => any;
}

const Tags: React.FC<IProps> = ({ tags, maxTags, onChange }) => {
  const classes = useStyles();
  const [tag, setTag] = useState("");
  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((el) => el !== tag);
    onChange(updatedTags);
  };

  const handleSubmit = (event: any) => {
    if (event.key !== "Enter") return;
    if (!tag) return;
    if (tags.length >= maxTags) return;
    if (tags.includes(tag)) return;
    onChange([...tags, tag]);
    setTag("");
  };
  console.log(tags.length <= 0);
  return (
    <Fragment>
      <Box className={classes.root}>
        {tags.map((tag) => {
          return (
            <Box key={tag} className={classes.tag}>
              <HighlightOff
                className={classes.removeTagButton}
                sx={{ marginRight: 1 }}
                onClick={() => removeTag(tag)}
              />
              <span>{tag}</span>
            </Box>
          );
        })}
        {tags.length < maxTags && (
          <input
            id="tag"
            name="tag"
            type="text"
            placeholder="TAG..."
            className={classes.tagInput}
            onKeyDown={handleSubmit}
            onChange={(event) => setTag(event.target.value)}
            value={tag}
          />
        )}
      </Box>
    </Fragment>
  );
};

export default Tags;
