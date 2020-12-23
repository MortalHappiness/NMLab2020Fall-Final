import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const rankingList = [
  {
    id: "0xA621ac2553470963c155475001D1d4fff36eeD68",
    token: 999999,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 888888,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 777773,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 885555,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 435348,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 234888,
  },
  {
    id: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
    token: 188888,
  },
];

const useStyles = makeStyles((theme) => ({
  ranking: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const Ranking = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2">Ranking</Typography>
      <List>
        {rankingList.map(({ id, token }, idx) => (
          <div>
            <ListItem style={{ paddingRight: 0, paddingLeft: 0 }}>
              <div className={classes.ranking}>
                <Typography style={{ margin: 8 }} variant="h3" color="initial">
                  <strong>{`${idx + 1}`}</strong>
                </Typography>
                <div style={{ flexGrow: 1 }}>{id.substring(0, 10)}...</div>
                {token}
              </div>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default Ranking;
