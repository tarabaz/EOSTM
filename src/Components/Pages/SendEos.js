import React from "react";

import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  Paper,
  Grid,
  Divider,
  TextField,
  Table,
  Input
} from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/Face";
import { avatarStore } from "../Data/FAvatar";
import {sendEOS} from '../Data/Core'


const styles = {
  Bottoni: {
    background: "linear-gradient(45deg, #043b0a 30%, #1e770a 90%)",
    borderRadius: 10,
    border: 1,
    color: "white",
 //   height: 200,
  },
  BottoniCancel: {
    background: 'linear-gradient(45deg, #420c0c 30%, #800808 90%)',
    borderRadius: 10,
    border: 1,
    color: "white",
    //   height: 200,
  }
}
export default class AvatarFriendPage extends React.Component {
  constructor() {
    super();
    this.state = {
      destinatario: "",
      quantita: "",
      messaggio: ""
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(event.target.value);
  };


  handleChangeAccount = prop => event => {
    this.setState({ [prop]: event.target.value.substr(0, 12)});
    console.log(event.target.value);
  };
  handleChangeMemo = prop => event => {
    this.setState({ [prop]: event.target.value.substr(0, 150) });
    console.log(event.target.value);
  };

  inviaTX(){
    
    var isnum = /^\d+$/.test(this.state.quantita);
    if (isnum) {
      sendEOS(this.state.destinatario, this.state.quantita, this.state.messaggio)
    }else{
      alert(isnum)
      sendEOS(this.state.destinatario, this.state.quantita, this.state.messaggio)

    }

  }

  render() {
    return (
      <Paper
        elevation={4}
        style={{
          borderRadius: 15,
          marginLeft: "2%",
          marginRight: "2%",
          marginTop: -150,
          padding: "15px 15px",
          textAlign: "center",
          //height: 120
          
        }}
      >     
        <div style={{
          display: "inline-block",
}}>
        <TextField
          //fullWidth
          label="Send EOS"
          value={this.state.quantita}
          onChange={this.handleChange("quantita").bind(this)}
          margin="normal"
          variant="outlined"
          defaultValue="number"
            style={{
              display: "inline-block",
              
            }}
        />
        <TextField
          //fullWidth
          label="to ACCOUNT"
          value={this.state.destinatario}
          onChange={this.handleChangeAccount("destinatario").bind(this)}
          margin="normal"
          variant="outlined"
            style={{
              display: "inline-block",
              marginLeft:15,
            }}
          /><br />
        <TextField
          fullWidth
          label="Memo"
          value={this.state.messaggio}
          onChange={this.handleChangeMemo("messaggio").bind(this)}
          margin="normal"
          variant="outlined"
            style={{
              display: "inline-block",

            }}
        />
       
        </div>
        <div style={{textAlign:"center"}}>
        <Button
          variant="outlined"
          color="primary"
          style={{
            ...styles.Bottoni
          }}
          onClick={() => {
            this.inviaTX();
          }}
        >Send EOS</Button>
        <Button
          variant="outlined"
          color="primary"
          style={{
            ...styles.Bottoni,
            ...styles.BottoniCancel,
            marginLeft: 50,
          }}
          onClick={() => {
this.state.destinatario=""
            this.state.quantita = ""
            this.state.messaggio = ""
          }}
        >Clear</Button>
        </div>
      </Paper>
    );
  }
}
