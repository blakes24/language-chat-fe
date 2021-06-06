import { useEffect } from "react";
import UserList from "../user/UserList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../store/partnerSlice";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const useStyles = makeStyles({
  root: {
    marginTop: "1.5rem",
    marginBottom: ".5rem",
  },
  formControl: {
    marginBottom: ".5rem",
    minWidth: 240,
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
  },
  err: {
    textAlign: "center",
  },
});

function Partners() {
  const classes = useStyles();
  const partners = useSelector((state) => state.partners.items);
  const user = useSelector((state) => state.users.current);
  const loading = useSelector((state) => state.partners.loading);
  const error = useSelector((state) => state.partners.error);
  const dispatch = useDispatch();
  
  useEffect(() => {
    function getPartners() {
      try {
        dispatch(fetchPartners(user.id));
      } catch (err) {
        console.error(err);
      }
    }
    getPartners();
  }, [user, dispatch]);

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.root}
      >
        Partners
      </Typography>

      {!partners.length && loading === "pending" && <Loading solid />}
      {error &&
        (Array.isArray(error) ? (
          error.map((err) => <p className={classes.err}>{err}</p>)
        ) : (
          <p className={classes.err}>{error.message}</p>
        ))}
      {partners.length > 0 ? (
        <UserList users={partners} partner={true} />
      ) : (
        <Typography align="center" className={classes.root}>
          No partners yet. Find users to chat with <Link to="/">here</Link>.
        </Typography>
      )}
    </Container>
  );
}
export default Partners;
