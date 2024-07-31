import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
    return(
        <header>
            <Typography variant="h2" textAlign="center">
                { title }
            </Typography>
            <Typography variant="h4" textAlign="center" color="primary">
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