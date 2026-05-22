import { Typography } from '@mui/material';

function Footer() {
    return(
        <footer>
            <Typography variant="inherit" textAlign="center">
                {new Date().getFullYear()} - Coup online - No rights reserved &#x1F609;
            </Typography>
        </footer>
    );
}

export default Footer;