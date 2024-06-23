import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@material-ui/core';

const NotFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Container maxWidth="md">
        <div className="text-center">
          <Typography variant="h1" className="text-6xl font-bold text-gray-800 mb-4">
            404
          </Typography>
          <Typography variant="h3" className="text-2xl text-gray-600 mb-8">
            Page Not Found
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            className="rounded-md hover:bg-blue-700 transition duration-300"
          >
            Go to Homepage
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
