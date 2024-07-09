import { Box, Container } from '@mui/material';
import Creation from "../components/Creation";
import Footer from "../components/Footer";
import Header from "../components/Header";

function CreationPage() {
  return (
    <Container>
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        maxWidth: '60vw',
        justifyContent: 'space-between',
        padding: '5vh',
      }}
    >
        <Header />
        <Creation />
        <Footer />
    </Box>
    </Container>
  );
}

export default CreationPage;