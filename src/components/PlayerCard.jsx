import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import dukeImage from "../assets/duke.png";
import assassinImage from "../assets/assassin.png";
import captainImage from "../assets/captain.png";
import ambassadorImage from "../assets/ambassador.png";
import contessaImage from "../assets/contessa.png";
import backsideImage from "../assets/backside.png";
import coinImage from "../assets/coin.png";

const determineCardIcon = (card) => {
    if (!card.visible) return backsideImage;
    switch(card.role) {
        case "Duke":
            return dukeImage;
        case "Assassin":
            return assassinImage;
        case "Captain":
            return captainImage;
        case "Ambassador":
            return ambassadorImage;
        case "Contessa":
            return contessaImage;
        default:
            return "";
    }
}

determineCardIcon.propTypes = {
    card: PropTypes.object.isRequired,
};

function PlayerCard({ playerState }) {
    const cardIcon1 = determineCardIcon(playerState.cards[0]);
    const cardIcon2 = determineCardIcon(playerState.cards[1]);

    return(
       <Box display="flex">
            <Stack direction="row" alignItems="center" spacing="20px">
                <img src={coinImage} height="50px" />
                <Typography variant="h6">
                    x {playerState.coins}
                </Typography>
                <Stack direction="column" alignItems="center" spacing="20px">
                    <Typography variant="h5">
                        {playerState.name}
                    </Typography>
                    <Stack direction="row" spacing="20px">
                        {cardIcon1 && <img src={cardIcon1} height="250px">.border-radius {}</img>}
                        {cardIcon2 && <img src={cardIcon2} height="250px" />}
                    </Stack>
                    <Typography>
                        {playerState.action}
                    </Typography>
                </Stack>
            </Stack>
       </Box>
    );
}

PlayerCard.propTypes = {
    playerState: PropTypes.object.isRequired,
};

export default PlayerCard;