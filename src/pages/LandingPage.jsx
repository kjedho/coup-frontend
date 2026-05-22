import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

import Creation from "../components/Creation";
import Footer from "../components/Footer";
import Header from "../components/Header";

function LandingPage({ sendMessage}) {
  return (
    <Container maxWidth="lg">
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        justifyContent: 'space-between',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
        <Header title="Welcome to Coup online!" subtitle="Play Coup privately with friends"/>
        <Creation sendMessage={sendMessage}/>
        <Footer />
    </Box>
    </Container>
  );
}

LandingPage.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

export default LandingPage;