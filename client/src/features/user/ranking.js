import React, { useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { ContractContext } from "../../contractContext";

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
  const [rankingList, setRankingList] = useState([]);
  const contractAPI = useContext(ContractContext);

  useEffect(async () => {
    if (contractAPI) {
      const res = await contractAPI.getUsers();
      const tmp = [];
      res.map((r) => {
        if (r.userAddress !== "0x0000000000000000000000000000000000000000")
          tmp.push({
            userAddress: r.userAddress,
            votes: parseInt(r.totalUpVotes) - parseInt(r.totalDownVotes),
          });
      });
      tmp.sort((a, b) => (a.votes < b.votes ? 1 : -1)).slice(0, 10);
      setRankingList(tmp);
    }
  }, [contractAPI]);
  return (
    <div>
      <Typography variant="h2">Most Voted</Typography>
      <List>
        {rankingList.map(({ userAddress, votes }, idx) => (
          <div key={idx}>
            <ListItem
              button
              component={Link}
              to={`/user/${userAddress}`}
              style={{ paddingRight: 0, paddingLeft: 0 }}
            >
              <div className={classes.ranking}>
                <Typography style={{ margin: 8 }} variant="h3" color="initial">
                  <strong>{`${idx + 1}`}</strong>
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ flexGrow: 1 }}
                  noWrap
                >
                  {userAddress}...
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {votes}
                </Typography>
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
