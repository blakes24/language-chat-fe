import { useEffect, useState } from "react";
import UserList from "./UserList";
import Container from "@material-ui/core/Container";
import ChatApi from "../helpers/api";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
  }
});

function Dashboard() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await ChatApi.getAllUsers();
      setUsers(res);
    }
    getUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h6" component="h1" align='center' className={classes.root}>
        Find a partner and start chatting!
      </Typography>
      {users.length && <UserList users={users} />}
    </Container>
  );
}

export default Dashboard;
