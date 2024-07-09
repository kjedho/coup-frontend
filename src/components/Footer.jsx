import { Typography } from '@mui/material';

function Footer() {
    return(
        <footer>
            <Typography variant="inherit" textAlign="center">
                &copy; {new Date().getFullYear()} - Coup online - All rights reserved
            </Typography>
        </footer>
    );
}

export default Footer;