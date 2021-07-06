import Container from "@material-ui/core/Container";
import UserCard from "./UserCard";
import { useStyles } from "./UserListStyles";

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
