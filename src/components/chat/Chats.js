import { useStyles } from "./ChatsStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, addRoom, setCurrentRoom } from "../../store/roomSlice";
import { useParams } from "react-router-dom";
import ChatApi from "../../helpers/api";
import { useEffect, useState } from "react";
import { Container, Divider, Typography } from "@material-ui/core";
import RoomList from "./RoomList";
import ChatRoom from "./ChatRoom";
import ChatAvatar from "./ChatAvatar";

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
          {currentRoom ? (
            <ChatRoom />
          ) : (
            <Typography
              component={"p"}
              align="center"
              className={classes.empty}
            >
              Select a user to start chatting.
            </Typography>
          )}
        </Container>
      </div>
    </Container>
  );
}

export default Chats;
