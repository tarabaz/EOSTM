import React from 'react'
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

export default props =>
  <Paper elevation={4} style={{
    borderRadius: 5,
    marginTop: -150,
    padding: "15px 15px",
    textAlign: "justify",
    height: 200,
  }}>
    <Typography variant="headline"
      component="h3">
      Tab del Token Creation</Typography>
  </Paper>