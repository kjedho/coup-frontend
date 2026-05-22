import { Typography, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return(
        <header>
            <Typography 
                variant={isMobile ? "h4" : "h2"} 
                textAlign="center"
                sx={{ px: 2, wordBreak: 'break-word' }}
            >
                { title }
            </Typography>
            <Typography 
                variant={isMobile ? "body1" : "h4"} 
                textAlign="center" 
                color="primary"
                sx={{ px: 2 }}
            >
                <em>{ subtitle }</em>
            </Typography>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default Header;