import { useEffect, useState } from "react";
import UserList from "../user/UserList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../store/usersSlice";
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

function Dashboard() {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const users = useSelector((state) => state.users.items);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  const languages = [
    { label: "Any", value: "" },
    { label: "Arabic", value: "ar" },
    { label: "Chinese", value: "zh" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hindi", value: "hi" },
    { label: "Indonesian", value: "id" },
    { label: "Italian", value: "it" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Spanish", value: "es" },
  ];

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    function getUsers() {
      try {
        dispatch(fetchAllUsers(filter));
      } catch (err) {
        console.error(err);
      }
    }
    getUsers();
  }, [filter, dispatch]);

  return (
    <Container>
      <Typography
        variant="h6"
        component="h1"
        align="center"
        className={classes.root}
      >
        Find a partner and start chatting!
      </Typography>
      <Container className={classes.formContainer}>
        <FormControl
          variant="outlined"
          margin="dense"
          className={classes.formControl}
        >
          <InputLabel id="language">Show users who speak...</InputLabel>
          <Select
            labelId="language"
            id="language"
            value={filter}
            onChange={handleChange}
            label="Show users who speak..."
          >
            {languages.map((lang) => (
              <MenuItem value={lang.value} key={lang.value || 1}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      {loading === "pending" && <Loading solid />}
      {error &&
        error.map((err, idx) => (
          <p className={classes.err} key={idx}>
            {err}
          </p>
        ))}
      {users.length > 0 && <UserList users={users} />}
    </Container>
  );
}

export default Dashboard;
