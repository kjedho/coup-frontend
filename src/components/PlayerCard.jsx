import { Box, LinearProgress, Stack, Typography } from "@mui/material";
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

const ambassadorExchange = (playerState) => {
    //TODO
}

const determineDropdownItems = (playerState) => {
    const menuItemsData = {
        label: 'Actions',
        items: [
            {
                label: 'Income',
                callback: (event, item) => console.log('Income clicked', event, item),
            },
            {
                label: 'Foreign aid',
                callback: (event, item) => console.log('Foreign aid clicked', event, item),
            },
            {
                label: 'Coup',
                callback: (event, item) => console.log('Foreign aid clicked', event, item),
                //TODO: extra nested dropdown to select target player
            },
            {
                label: 'Duke',
                delay: 300,
                items: [
                {
                    label: 'Tax',
                    callback: (event, item) => console.log('Duke > Tax clicked', event, item),
                },
                {
                    label: 'Block foreign aid',
                    callback: (event, item) => console.log('Duke > Block foreign aid clicked', event, item),
                    // disabled: true,
                },
                ],
            },
            {
                label: 'Assassin',
                delay: 300,
                items: [
                    {
                        label: 'Assassinate',
                        callback: (event, item) => console.log('Assassin > Assassinate clicked', event, item),
                    },
                ],
            },
            {
                label: 'Captain',
                delay: 300,
                items: [
                    {
                        label: 'Steal',
                        callback: (event, item) => console.log('Captain > Steal clicked', event, item),
                    },
                    {
                        label: 'Block stealing',
                        callback: (event, item) => console.log('Captain > Block stealing clicked', event, item),
                    },
                ],
            },
            {
                label: 'Ambassador',
                delay: 300,
                items: [
                    {
                        label: 'Exchange',
                        callback: () => ambassadorExchange(playerState),
                    },
                    {
                        label: 'Block stealing',
                        callback: (event, item) => console.log('Ambassador > Block stealing clicked', event, item),
                    },
                ],
            },
            {
                label: 'Contessa',
                delay: 300,
                items: [
                {
                    label: 'Block assassination',
                    callback: (event, item) => console.log('Contessa > Block assassination clicked', event, item),
                },
                ],
            },
        ],
    };
    return menuItemsData;
}

determineDropdownItems.propTypes = {
    playerState: PropTypes.object.isRequired,
};

function PlayerCard({ playerState }) {
    const cardIcon1 = 0 in playerState.cards ? determineCardIcon(playerState.cards[0]) : backsideImage;
    const cardIcon2 = 1 in playerState.cards ? determineCardIcon(playerState.cards[1]) : backsideImage;
    const menuItemsData = determineDropdownItems(playerState);

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
                <NestedDropdown
                    menuItemsData={menuItemsData}
                    MenuProps={{elevation: 3}}
                    ButtonProps={{variant: 'contained'}}
                    onClick={() => console.log('Clicked')}
                />
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
    playerState: PropTypes.object.isRequired,
};

export default PlayerCard;