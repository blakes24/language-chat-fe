import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Container, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { addMessage, fetchMessages } from "../../store/messageSlice";
import ChatBubble from "./ChatBubble";
import { BASE_URL } from "../../config";
import Loading from "../Loading";
import { useStyles } from "./ChatRoomStyles";

function ChatRoom() {
  const classes = useStyles();
  const messages = useSelector((state) => state.messages.items);
  const currentRoom = useSelector((state) => state.rooms.current);
  const loading = useSelector((state) => state.rooms.loading);
  const user = useSelector((state) => state.users.current);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const partner = currentRoom && currentRoom.partner;
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    if (currentRoom && focus) {
      // get messages and connect to socket if window is in focus
      dispatch(fetchMessages(currentRoom.id));

      socketRef.current = io(BASE_URL);
      socketRef.current.emit("join", currentRoom.id);
      socketRef.current.on("message", (msg) => {
        dispatch(addMessage(msg));
      });
      // disconnect when the connection is closed
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [currentRoom, dispatch, focus]);

  function sendMessage(e) {
    e.preventDefault();
    if (message.trim()) {
      const messageObject = {
        body: message,
        to: partner.id,
        from: user.id,
        roomId: currentRoom.id,
      };
      setMessage("");
      socketRef.current.emit("send message", messageObject);
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    // add listener to check when window comes back ito focus so data and socket connection can be refreshed
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <Container className={classes.root}>
      <Paper
        square
        variant="outlined"
        elevation={0}
        className={classes.messages}
      >
        {loading === "pending" ? <Loading solid /> :
        (messages.map((msg) => {
          if (msg.from === partner.id) {
            return <ChatBubble msg={msg} user={partner} key={msg.id} />;
          } else {
            return <ChatBubble msg={msg} user={user} key={msg.id} />;
          }
        }))}
        <div ref={messagesEndRef} />
      </Paper>
      <form onSubmit={sendMessage} className={classes.send}>
        <TextField
          id="message"
          placeholder="Type here..."
          variant="outlined"
          value={message}
          onChange={handleChange}
          className={classes.input}
        />
        <IconButton
          type="submit"
          className={classes.btn}
          disabled={!message.trim()}
          aria-label="send"
        >
          <SendIcon />
        </IconButton>
      </form>
    </Container>
  );
}

export default ChatRoom;
