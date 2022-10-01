import { useEffect, useState, useRef } from "react";
import { Button, TextField } from "@mui/material";
import "./Chat.css";
import * as io from "socket.io-client";
import { account } from "../../appwrite/appwriteConfig";
import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";

const socket = io.connect("http://localhost:3001");

function Chat() {
  const [state, setState] = useState({ message: "", roomId: "" });
  const [chats, setChats] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const fetchChatData = async (roomId) => {
    try {
      const data = await databases.listDocuments(
        "6337e829059bbcd5b18f",
        "6337fec44cb1d6528acb",
        [Query.equal("roomId", [roomId])]
      );
      setChats(data.documents);
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(chats);
    const user = await account.get();
    const name = user.name;
    const message = state.message;
    if (message === "") return;
    const roomId = state.roomId;
    try {
      const response = await databases.createDocument(
        "6337e829059bbcd5b18f",
        "6337fec44cb1d6528acb",
        uuidv4(),
        {
          name,
          message,
          roomId,
        }
      );
    } catch (e) {
      console.log(e);
    }
    // console.log("form submission");
    socket.emit("send_message", { name, message, roomId });
    fetchChatData(roomId);
    setState({ message: "", roomId });
    // console.log(chats);
  };

  const OnTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      console.log(data);
      fetchChatData(data.roomId);
      try {
        const response = await databases.createDocument(
          "6337e829059bbcd5b18f",
          "6337e83251bb7b9f7081",
          uuidv4(),
          {
            name: data.name,
            message: data.message,
            roomId: data.roomId,
          }
        );
      } catch (e) {
        console.log(e);
      }

      // console.log(chats)
    });
    console.log(chats);
  }, [chats]);

  return (
    <div className="card">
      <form onSubmit={submitHandler}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="roomId"
            onChange={(e) => OnTextChange(e)}
            value={state.roomId}
            label="Room ID"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => OnTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <Button type="submit" variant="contained" sx={{ margin: "30px" }}>
          Send Message
        </Button>
        <Button variant="contained" sx={{ margin: "30px" }}>
          Initiate Payment
        </Button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {chats &&
          chats.map((data, index) => {
            console.log("sjbuf", data);
            return (
              <div key={index}>
                <h3>
                  {data.name} : <span>{data.message}</span>
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Chat;
