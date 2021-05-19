import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, addRoom, setCurrentRoom } from "../store/roomSlice";
import { useParams } from "react-router-dom";
import ChatApi from "../helpers/api";
import { useEffect, useState } from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import UserContext from "../helpers/UserContext";
import { useContext } from "react";
import RoomList from "./RoomList";
import ChatRoom from "./ChatRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    height: "calc(100% - 56px)",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
    },
  },
  list: {
    width: 69,
    paddingBottom: 0,
    marginBottom: 0,
    overflowX: "hidden",
    overflowY: "scroll",
    borderRight: "1px solid lightGray",
    height: "100%",
    maxHeight: "calc(100vh - 56px)",
    flexFlow: "column",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: "250px",
      maxHeight: "calc(100vh - 64px)",
    },
  },
  chat: {
    height: "100%",
    display: "flex",
    width: "100%",
  },
  title: {
    padding: ".5rem 0",
  },
  chatContainer: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
}));

function Chats() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.rooms.current);
  const rooms = useSelector((state) => state.rooms.items);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let ids;
      let partnerId;
      try {
        dispatch(fetchRooms({ userId: user.id }));
        if (roomId) {
          ids = roomId.split("-");
          partnerId = +ids[0] === user.id ? +ids[1] : +ids[0];
          let res = await ChatApi.getRooms({ userId: user.id, partnerId });
          dispatch(setCurrentRoom(res.rooms[0]));
        }
      } catch (err) {
        try {
          await ChatApi.createRoom({ user1: user.id, user2: partnerId });
          let res = await ChatApi.getRooms({ userId: user.id, partnerId });
          dispatch(addRoom(res.rooms[0]));
          dispatch(setCurrentRoom(res.rooms[0]));
        } catch {
          setError(err);
        }
      }
    }
    getData();
  }, [user, roomId, dispatch]);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.chat}>
        <div className={classes.list}>
          {rooms.length > 0 && <RoomList rooms={rooms} />}
        </div>
        <Container className={classes.chatContainer}>
          <Typography
            className={classes.title}
            component={"h1"}
            variant="h4"
            align="center"
          >
            {currentRoom ? currentRoom.partner.name : "Chat"}
          </Typography>{" "}
          <Divider />
          {error && Array.isArray(error) && error.map((err) => <p>{err}</p>)}
          {currentRoom && <ChatRoom />}
        </Container>
      </div>
    </Container>
  );
}

export default Chats;
