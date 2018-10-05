import React from "react";
//import { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { accountStore } from "./Data/Data";
//import { syncHistoryWithStore } from "mobx-react-router";
//import { Redirect } from "react-router-dom";

//import { Link } from 'react-router-dom'
//import { withRouter } from 'react-router';

import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  Paper,
  Grid,
  Divider,
  TextField,
  Table
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import Avatar from "@material-ui/core/Avatar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//import Description from "./Description";
import IconLogin from "@material-ui/icons/AccountCircle";
import IconLogout from "@material-ui/icons/Cancel";
import IconToken from "@material-ui/icons/Extension";
import PersonPinIcon from "@material-ui/icons/Face";
import IconSend from "@material-ui/icons/Send";
import IconButton from '@material-ui/core/IconButton';
import IconClose from "@material-ui/icons/Close";

//import { sendEOS, getAccountInformazioni, check } from "./Data/Core";
//import { fetchAvatar } from "./Data/retriveAvatar";
import PropTypes from "prop-types";

import MainPage from "./Pages/MainPage";
import SendEos from "./Pages/SendEos";
import TokenCreation from "./Pages/TokenCreation";
import { avatarStore } from "./Data/FAvatar";
import AvatarFriendPage from "./Pages/AvatarFriendPage";
import Tooltip from '@material-ui/core/Tooltip';

const ScatterJS = require("scatter-js/dist/scatter.cjs");
//////////////achema colori

const styles = {
  AppBar: {
    background: "linear-gradient(45deg, #13547a 30%, #80d0c7 90%)",
    borderRadius: 15,
    border: 1,
    color: "white",
    height: 200,
    boxShadow: "0 3px 10  px 5px rgba(0, 0, 0, .3)"
  },
  AppBarMiddle: {
    height: 110
  },
  AppTabBar: {
    background: "linear-gradient(45deg, #13547a 30%, #80d0c7 90%)",
    borderRadius: 15,
    border: 1,
    color: "white",
    boxShadow: "0 3px 10  px 5px rgba(0, 0, 0, .3)"
  },
  Paper: {
    borderRadius: 15,
    //marginTop: 15,
    padding: "15px 15px",
    textAlign: "justify"
  },
 // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)",

  button: {
    background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)",
    borderRadius: 15,
    border: 0,
    color: "white",
    //height: 28,
    padding: "0 10px"
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  buttonBlue: {
    background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)"
    // boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
  },
  buttonIcon: {
    background: "linear-gradient(45deg, #0c3d59 30%, #13547a 90%)",
    padding: "0 -5px",
    borderRadius: 30,

    //height: 28,
    marginLeft: 8

    // boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
  },
  BottoneIcona: {
    marginLeft: 8,
    border: 0,
  },
  row: {
    display: "flex",
    justifyContent: "center"
  }
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

//t('accountStore')
@observer
export default class App extends React.Component {
  //////////////////////////////////////////////////////////////////////

  constructor() {
    super();
    this.state = {
      eosAccountName: "Login With Scatter",
      value: 2
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if (value === 2) {
      // console.log("diverso da 2")
      avatarStore.setAvatar(null);

      let nome = { FnameAvatar: "eosimperabpi" };

      // console.log("nome sorgente  " + nome.FnameAvatar)

      //console.log("nome precedente  " + avatarStore.friendAvatar.FnameAvatar)

      avatarStore.setAvatar(nome);
      // console.log("nome NUOVO  " + avatarStore.friendAvatar.FnameAvatar)
    } else {
    }
  };

  onChangeAccountName(newName) {
    this.setState({ eosAccountName: newName });
  }

  onChangeName() {
    this.props.changeName(this.state.eosAccountName);
  }

  //////////////////////////////////////////////////////////////////////
  componentDidMount() {
    document.addEventListener("scatterLoaded", scatterExtension => {
      if (localStorage.getItem("hasScatter")) {
        console.log("Trying to open Scatter..");
        this._scatterInit();
      }
    });
  }

  _scatterInit() {
    const network = {
      blockchain: "eos",
      host: "nodes.get-scatter.com",
      port: 443,
      protocol: "https",
      chainId:
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    };
    console.log("Trying to open Scatter..");

    ScatterJS.scatter.connect("eosfilestore").then((connected: any) => {
      if (!connected) {
        console.log(
          "You need to install Scatter EOS Desktop wallet to login and upload files. More info at https://get-scatter.com"
        );
      }

      // Use `scatter` normally now.
      try {
        ScatterJS.scatter
          .getIdentity({ accounts: [network] })
          .then((identity: any) => {
            const account = identity.accounts.find(
              (acc: any) => acc.blockchain === "eos"
            );
            console.log(account);
            accountStore.setAccount(account);
            localStorage.setItem("hasScatter", "yes");
          })
          .catch((error: any) => {
            console.log(
              error.type === "locked"
                ? "The Scatter wallet is locked. Please unlock it and try again."
                : error.message
            );

            // console.error('ERROR: ', error)
          });
      } catch (error) {
        console.log("You need Scatter EOS desktop wallet enabled");
      }
    });
  }
  _forget() {
    ScatterJS.scatter.forgetIdentity().then(() => {
      accountStore.setAccount(null);
      localStorage.removeItem("hasScatter");
    });
  }

  render() {
    //const { classes } = this.props;
    const { value } = this.state;
    return (
      <div >
        <AppBar
          style={{
            ...styles.AppBar
          }}
          position="static"
        >
          <Toolbar style={{ marginTop: 5 }}>
            <div style={{}}>
              <img
                src='/img/logo01.png'
                style={{
                  // marginLeft: '-10px',
                  position: "relative",
                  //flexGrow: 1,
                  textAlign: "right",
                  width: "auto",
                  height: "80px",
                  //margin: '0px',
                  //borderRadius: 15
                }}
              />
            </div>

          </Toolbar>
        </AppBar>
        <div
          style={{
            marginTop: -120, padding: "0px 20px"
          }}
        >
          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={5}>
              <Paper
                style={{
                  ...styles.Paper,
                  ...styles.buttonBlue,
                  height: 320
                }}
                elevation={10}
              >
                <img
                  src='/img/b1.png'
                  style={{
                    // marginLeft: '-10px',
                    position: "relative",
                    width: '100%',
                    margin: '0px',
                    borderRadius: 15
                  }}
                />
                <Typography variant="headline" component="h3">
                  EOS IMPERA (eosimperabpi)
                </Typography>
                <Typography component="p">
                  We are EOS Impera from Italy, a Block Producer Candidate on the EOS blockchain.<br />
                  Our mission is to create a platform for the community that can finance the best projects proposed by the community on the EOS.IO network. Vote for us.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper
                style={{
                  ...styles.Paper,
                  ...styles.buttonBlue,
                  height: 320,
                  textAlign: "left",

                }}
                elevation={10}
              >





                <Tooltip title="I'm Your Avatar" placement="top" style={{
                  marginTop: -68,
                  marginLeft: -16,

                }}>

                  <img
                    //src="https://eosimpera.io/LogoI_256.jpg"
                    src={
                      accountStore.account
                        ? "https://robohash.org/" + accountStore.account.name
                        : "https://robohash.org/Francesco2016"
                   ///     : "https://robohash.org/Francesco2016"
              }
                    style={{
                      marginTop: -103,
                      marginLeft: -18,
                      position: "absolute",
                      width: 135,
                      height: 135,
                      display: "inline-block",
                      borderRadius:10,
                    }}
                  />
                </Tooltip>


                {accountStore.account ? (
                  <div style={{
                    position: "relative",
                    display: "inline-block",
                    marginTop: -8,
                    marginBottom: 4,
                    marginLeft: 130,

                  }}>
                    <Button
                      variant="outlined"
                      disabled
                      size="small"
                      style={{
                       //...styles.buttonBlue,
                      }}
                      elevation={10}
                    >
                      <Typography
                        variant="button"
                        color="textSecondary"
                        style={{
                          //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)",
                          //borderRadius: 15,
                          //border: 0,
                          //color: "white",
                          //height: 28,
                          padding: "0 10px"
                        }}
                      >
                        {accountStore.account.name}
                      </Typography>
                    </Button>


                    <IconButton
                      elevation={6}

                      style={{

                        ...styles.BottoneIcona,
                               //borderRadius: 15,
                        //height: 28,
                          padding: "0 0",
                          marginTop:-22,
                          marginLeft:-8,
                      }}
                      // style={{marginTop:-10, marginLeft:-20,}}
                      onClick={this._forget}>
                      <IconClose
                        fontSize="small"
                        style={{
                          borderRadius: 15,
                          border: 11,
                          color: "white",
                          // height: 28,
                          //  padding: "0 10px",
                          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        }}
                      />
                    </IconButton>
                  </div>
                ) : (
                    <div style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: -8,
                      marginBottom: 4,
                      marginLeft: 130,
                    }}>

                      <Button
                        //text="Login with Scatter"
                        variant="outlined"
                        //size="medium"

                        style={{
                          ...styles.button,
                          ...styles.buttonBlue,

                        }}
                        onClick={() => {
                          this._scatterInit();
                        }}
                      >
                        <IconLogin
                          color="disabled"
                          style={{ fontSize: 28, marginRight: 10 }}
                        />
                        <Typography
                          variant="button"
                          color="textSecondary"
                        >
                          Login With Scatter
                </Typography>
                      </Button>
                    </div>
                  )}




                <br />
                <Divider />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption">Account Name:</Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.name}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption"> Created: </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.Created}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption">EOS Balance:</Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosBalance}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          Scatter Permission Key Type:
                        </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.ScatterPermission}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption"> Free CPU: </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosFCpu}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption"> Total CPU: </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosCpu}
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption">
                          Free BANDWIDTH:
                        </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosFBandwidth} KB
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          Total BANDWIDTH:
                        </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosBandwidth} KB
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption"> Free RAM: </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosFRam} KB
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption"> Total RAM: </Typography>
                        {accountStore.account ? (
                          <Typography variant="body1">
                            {accountStore.account.eosRam} KB
                          </Typography>
                        ) : (
                            <Typography variant="body1">-</Typography>
                          )}
                      </TableCell>

                    </TableRow>
                  </TableBody>
                </Table>

                <br />
              </Paper>
            </Grid>
          </Grid>

          <div>
            <AppBar
              position="static"
              color="default"
              style={{
                ...styles.AppTabBar,
                marginTop: 20,
                height: 200
                //...styles.buttonBlue,
              }}
            >
              <Tabs
                value={value}
                onChange={this.handleChange}
                //scrollable
                scrollButtons="on"
                indicatorColor=""
              // centered
              //indicator='false'
              // textColor="inherith"
              >
                <Tab label="Token Creation" icon={<IconToken />} disabled />
                <Tab label="Send EOS" icon={<IconSend />}  />
                <Tab label="Frineds Avatar" icon={<PersonPinIcon />} />
                <Tab label="Vote" icon={<IconLogout />} disabled />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <TokenCreation />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <SendEos />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <AvatarFriendPage />
              </TabContainer>
            )}
            {value === 3 && (
              <TabContainer>
                <MainPage />
              </TabContainer>
            )}
          </div>
        </div>
      </div>
    );
  }
}
