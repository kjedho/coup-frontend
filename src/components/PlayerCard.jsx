import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { NestedDropdown } from 'mui-nested-menu';

import dukeImage from "../assets/duke.png";
import assassinImage from "../assets/assassin.png";
import captainImage from "../assets/captain.png";
import ambassadorImage from "../assets/ambassador.png";
import contessaImage from "../assets/contessa.png";
import backsideImage from "../assets/backside.png";
import coinImage from "../assets/coin.png";

const determineCardIcon = (card) => {
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
            return backsideImage;
    }
}

determineCardIcon.propTypes = {
    card: PropTypes.object.isRequired,
};

const determineDropdownItems = (gameState, playerUuid, playerState, enableAction, sendMessage) => {
    if (!enableAction) {
        return {};
    }
    let menuItemsData = {label: 'Actions', items: []};
    let otherPlayers = gameState.players.filter(p => p[0].uuid != playerUuid);
    otherPlayers = otherPlayers.map(p => p[0].name);

    if (playerState.coins >= 10) {
        let players = otherPlayers.map((element) => ({
            label: element,
            callback: (event, item) => sendMessage("/action coup " + element)
        }));
        menuItemsData.items.push({
            label: 'Coup',
            delay: 300,
            items: players
        });
        return menuItemsData;
    }
    menuItemsData.items.push({
        label: 'Income',
        callback: (event, item) => sendMessage("/action income")
    });
    menuItemsData.items.push({
        label: 'Foreign aid',
        callback: (event, item) => sendMessage("/action foreign_aid")
    });
    if (playerState.coins >= 7) {
        let players = otherPlayers.map((element) => ({
            label: element,
            callback: (event, item) => sendMessage("/action coup " + element)
        }));
        menuItemsData.items.push({
            label: 'Coup',
            delay: 300,
            items: players
        });
    }
    menuItemsData.items.push({
        label: 'Duke',
        delay: 300,
        items: [
            {
                label: 'Tax',
                callback: (event, item) => sendMessage("/action tax")
            }
        ]
    });
    if (playerState.coins >= 3) {
        let players = otherPlayers.map((element) => ({
            label: element,
            callback: (event, item) => sendMessage("/action assassinate " + element)
        }));
        menuItemsData.items.push({
            label: 'Assassin',
            delay: 300,
            items: players
        });
    }
    let players = otherPlayers.map((element) => ({
        label: element,
        callback: (event, item) => sendMessage("/action steal " + element)
    }));
    menuItemsData.items.push({
        label: 'Captain',
        delay: 300,
        items: players
    });
    menuItemsData.items.push({
        label: 'Ambassador',
        delay: 300,
        items: [
            {
                label: 'Exchange',
                callback: (event, item) => sendMessage("/action exchange")
            }
        ]
    });
    return menuItemsData;
}

determineDropdownItems.propTypes = {
    playerState: PropTypes.object.isRequired,
};

function PlayerCard({ gameState, playerUuid, playerState, enableAction, sendMessage }) {
    const cardIcon1 = 0 in playerState.cards ? determineCardIcon(playerState.cards[0]) : backsideImage;
    const cardIcon2 = 1 in playerState.cards ? determineCardIcon(playerState.cards[1]) : backsideImage;
    const menuItemsData = determineDropdownItems(gameState, playerUuid, playerState, enableAction, sendMessage);

    return(
       <Box display="flex" justifyContent="center">
            <Stack direction="row" alignItems="center" spacing="20px">
                <Stack direction="column" alignItems="center" spacing="20px">
                    <Stack direction="row" alignItems="center" spacing="20px">
                        <Typography variant="h6">
                            {playerState.coins} x
                        </Typography>
                        <img src={coinImage} height="50px" />
                    </Stack>
                {enableAction && <NestedDropdown
                    menuItemsData={menuItemsData}
                    MenuProps={{elevation: 3}}
                    ButtonProps={{variant: 'contained'}}
                    // onClick={() => console.log('Clicked')}
                />}
                </Stack>
                <Stack direction="column" alignItems="center" spacing="20px">
                    <Typography variant="h5">
                        {playerState.name}
                    </Typography>
                    <Stack direction="row" spacing="20px">
                        {cardIcon1 && <img src={cardIcon1} height="200px" />}
                        {cardIcon2 && <img src={cardIcon2} height="200px" />}
                    </Stack>
                    {/* <Box sx={{ width: '100%' }}>
                        {playerState.loading != 0 && <LinearProgress variant="determinate" value={playerState.loading} />}
                    </Box> */}
                </Stack>
            </Stack>
       </Box>
    );
}

PlayerCard.propTypes = {
    gameState: PropTypes.object.isRequired,
    playerUuid: PropTypes.string.isRequired,
    playerState: PropTypes.object.isRequired,
    enableAction: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired
};

export default PlayerCard;