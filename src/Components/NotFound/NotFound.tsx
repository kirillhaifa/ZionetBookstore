import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PiSmileySad } from "react-icons/pi";
let classes = require('./NotFound.module.scss')

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
