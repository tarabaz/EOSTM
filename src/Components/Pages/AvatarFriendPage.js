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

export default class AvatarFriendPage extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: ""
    };
  }

  handleChangeAvatar = prop => event => {
    this.setState({ [prop]: event.target.value.substr(0, 12) });
    //console.log("https://robohash.org/" + this.state.friendName);
  };

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
          textAlign: "right",
          height: 120
        }}
      >
        <TextField
          //autoFocus={true}
          label="Insert the name of your frined Account"
          //className={classes.textField}
          value={this.state.friendName}
          //value
          onChange={this.handleChangeAvatar("friendName").bind(this)}
          margin="normal"
          variant="outlined"
          fullWidth
        />

        {this.state.friendName.length === 12 ? (
          <img
            //src="https://eosimpera.io/LogoI_256.jpg"
            src={"https://robohash.org/" + this.state.friendName}
            style={{
              //marginTop: -180,
              //marginLeft: '60%',
              //marginRight: -100,
              right: "10px",
              bottom: "175px",
              position: "relative",
              width: "230px",
              height: "230px",
              borderRadius: 15

              //display: "inline-block"
            }}
          />
        ) : (
          <img
            //src="https://eosimpera.io/LogoI_256.jpg"
            //  src={"https://robohash.org/" + "valeriotarabella"}
              src='/img/valeriotarabella.png'
            style={{
              //marginTop: -180,
              //marginLeft: '60%',
              //marginRight: -100,
              right: "10px",
              bottom: "175px",
              position: "relative",
              width: "230px",
              height: "230px",
              borderRadius: 15,
     //display: "inline-block"
            }}
          />
        )}
      </Paper>
    );
  }
}
