import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  AppBar,
} from "@mui/material";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SendIcon from '@mui/icons-material/Send';
import {KeyboardEventHandler, useEffect, useRef, useState} from "react";
import { IChatMessage, Message} from "@/components/Chat/type";
import Toolbar from "@mui/material/Toolbar";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

export const Chat = () => {
  const [ chatMessages, setChatMessages ] = useState<IChatMessage[]>([]);
  const [ user, setUser] = useState('');
  const [ message, setMessage] = useState<Message>('');
  const scrollBottomRef = useRef(null);
  const webSocket = useRef(new WebSocket(`${process.env.NEXT_PUBLIC_WS_LOCALHOST}`));
  const ENTER_KEY_CODE = 13;

  useEffect(() => {
    console.log('Opening WebSocket');
    const openWebSocket = () => {
      webSocket.current.onopen = (event) => {
        console.log('Open:', event);
      }
      webSocket.current.onclose = (event) => {
        console.log('Close:', event);
      }
    }
    openWebSocket();
      webSocket.current.onmessage = ( { data }) => {
        setChatMessages((messages) => {
          return [ JSON.parse(data), ...messages ];
        });
        // console.log(chatMessages);
      };

    return () => {
      console.log('Closing WebSocket');
      if (webSocket.current.readyState === 1) {
        webSocket.current.close();
      }
    }
  }, []);

  const handleUserChange:StandardInputProps['onChange'] = (event) => {
    setUser(event.target.value);
  }

  const handleMessageChange:StandardInputProps['onChange'] = (event) => {
    setMessage(event.target.value);
  }

  const handleEnterKey: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if(event.keyCode === ENTER_KEY_CODE){
      sendMessage(event);
    }
  }
  const sendMessage = (event:   any) => {
    if(user && message) {
      console.log(event, chatMessages);
      webSocket.current.send(JSON.stringify({
        user,
        message
      }));
    }
  };

  return (
    <Box width={1200} height={400} mt={2}>

      <AppBar position="static">
        <Toolbar>
          <LiveHelpIcon fontSize={'large'}/>
          <Typography variant="h6" align='center'>
            Chat with personal assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={4}>
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            I am your personal assistant. How can I help you?
          </Typography>
          <Grid container spacing={2} alignItems='center'>

            <Grid xs={2} item>
              <FormControl fullWidth>
                <TextField onChange={handleUserChange}
                 value={user}
                 label="Nickname"
                 variant="outlined"/>
              </FormControl>
            </Grid>
            <Grid xs={8} item>
              <FormControl fullWidth>
                <TextField
                  value={message}
                  label="Type your message..."
                  variant="outlined"
                  onChange={handleMessageChange}
                  onKeyDown={handleEnterKey}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="send"
                color="primary"
                onClick={sendMessage}
              >
                <SendIcon/>
              </IconButton>
            </Grid>
          </Grid>

          <List ref={scrollBottomRef}>
            {chatMessages.map((chatMessage, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${chatMessage.user}: ${chatMessage.message}`}/>
              </ListItem>
            ))}
          </List>

        </Box>
      </Paper>
    </Box>
  );
}
