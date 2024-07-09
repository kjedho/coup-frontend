import { Typography } from '@mui/material';

function Header() {
    return(
        <header>
            <Typography variant="h2" textAlign="center">
                Welcome to Coup online!
            </Typography>
            <Typography variant="h4" textAlign="center" color="primary">
                <em>The place to be to play Coup privately with friends.</em>
            </Typography>
        </header>
    );
}

export default Header;