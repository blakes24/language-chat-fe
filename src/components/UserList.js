import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import UserCard from "./UserCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: "0 auto",
    maxWidth: "700px",
  },
});

function UserList({ users }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {users.map((user) => (
        <UserCard cardUser={user} key={user.id} />
      ))}
    </Container>
  );
}

export default UserList;
