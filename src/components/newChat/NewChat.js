import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
export class ChatMessageDto {
  constructor(user, message){
    this.user = user;
    this.message = message;
  }
}
export default function NewChat(){

  const ENTER_KEY_CODE = 13;

  const scrollBottomRef = useRef(null);
  const webSocket = useRef(null);
  const [chatMessages, setChatMessages] = useState([
    new ChatMessageDto('Admin', 'Hi')
  ]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Opening WebSocket');
    webSocket.current = new WebSocket('ws://localhost:3000/markets/ethereum');
    const openWebSocket = () => {
      webSocket.current.onopen = (event) => {
        console.log('Open:', event);
      }
      webSocket.current.onclose = (event) => {
        console.log('Close:', event);
      }
    }
    openWebSocket();
    return () => {
      console.log('Closing WebSocket');
      webSocket.current.close();
    }
  }, []);

  useEffect(() => {
    webSocket.current.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      console.log('Message:', chatMessageDto);
      setChatMessages([...chatMessages, {
        user: chatMessageDto.user,
        message: chatMessageDto.message
      }]);
      if(scrollBottomRef.current) {
        scrollBottomRef.current.scrollIntoView({ behavior: 'smooth'});
      }
    }
  }, [chatMessages]);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleEnterKey = (event) => {
    if(event.keyCode === ENTER_KEY_CODE){
      sendMessage();
    }
  }

  const sendMessage = () => {
    if(user && message) {
      console.log('Send!');
      webSocket.current.send(
        JSON.stringify(new ChatMessageDto(user, message))
      );
      setMessage('');
    }
  };

  const listChatMessages = chatMessages.map((chatMessageDto, index) =>
    <ListItem key={index}>
      <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}/>
    </ListItem>
  );

  return (
    <Box m={2}>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Chat!
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List sx={{ height: 60, overflow: 'auto'}}>
                  {listChatMessages}
                  <ListItem ref={scrollBottomRef}></ListItem>
                </List>
              </Grid>
              <Grid xs={2} item>
                <FormControl fullWidth>
                  <TextField onChange={handleUserChange}
                             value={user}
                             label="Nickname"
                             variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField onChange={handleMessageChange} onKeyDown={handleEnterKey}
                             value={message}
                             label="Type your message..."
                             variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton onClick={sendMessage}
                            aria-label="send"
                            color="primary">
                  <SendIcon />
                </IconButton>
              </Grid>

            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}