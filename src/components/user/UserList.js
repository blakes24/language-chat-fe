import Container from "@material-ui/core/Container";
import { useStyles } from "./UserListStyles";
import UserCard from "./UserCard";

function UserList({ users, partner }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {users.map((user) => (
        <UserCard cardUser={user} key={user.id} partner={partner} />
      ))}
    </Container>
  );
}

export default UserList;
