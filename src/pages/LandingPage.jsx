import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

import Creation from "../components/Creation";
import Footer from "../components/Footer";
import Header from "../components/Header";

function LandingPage({ sendMessage}) {
  return (
    <Container>
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        maxWidth: '80vw',
        justifyContent: 'space-between',
        padding: '5vh',
      }}
    >
        <Header title="Welcome to Coup online!" subtitle="The place to be to play Coup privately with friends."/>
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