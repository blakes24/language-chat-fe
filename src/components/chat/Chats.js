import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, addRoom, setCurrentRoom } from "../../store/roomSlice";
import { useParams } from "react-router-dom";
import ChatApi from "../../helpers/api";
import { useEffect, useState } from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import RoomList from "./RoomList";
import ChatRoom from "./ChatRoom";
import ChatAvatar from "./ChatAvatar";

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
    marginLeft: ".5rem",
  },
  chatContainer: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  partner: {
    marginTop: ".5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "4rem",
  },
}));

function Chats() {
  const classes = useStyles();
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.current);
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
          {currentRoom ? (
            <div className={classes.partner}>
              <ChatAvatar partner={currentRoom.partner} size="large" />
              <Typography
                className={classes.title}
                component={"h1"}
                variant="h6"
                align="center"
              >
                {currentRoom.partner.name}
              </Typography>
            </div>
          ) : (
            <Typography
              className={classes.title}
              component={"h1"}
              variant="h3"
              align="center"
            >
              Chat
            </Typography>
          )}

          <Divider />
          {error &&
            Array.isArray(error) &&
            error.map((err, idx) => <p key={idx}>{err}</p>)}
          {currentRoom && <ChatRoom />}
        </Container>
      </div>
    </Container>
  );
}

export default Chats;
