import React from 'react';
import { Box, Typography } from '@mui/material';
import { PiSmileySad } from "react-icons/pi";
let classes = require('./NotFound.module.scss')

//component for wrong url 
const NotFound: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <PiSmileySad className={classes.icon}/>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
