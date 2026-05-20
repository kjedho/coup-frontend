import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { NestedDropdown } from "mui-nested-menu";
import AmbassadorDialog from "./AmbassadorDialog";

import dukeImage from "../assets/duke.png";
import assassinImage from "../assets/assassin.png";
import captainImage from "../assets/captain.png";
import ambassadorImage from "../assets/ambassador.png";
import contessaImage from "../assets/contessa.png";
import backsideImage from "../assets/backside.png";
import coinImage from "../assets/coin.png";
import { Fragment } from "react";

export const determineCardIcon = (card) => {
    if (!card.role) return backsideImage;
    switch (card.role) {
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
};

const buildDropdownItems = (availableActions, sendMessage) => {
    if (!availableActions || availableActions.length === 0) return {};

    let menuItemsData = { label: "Actions", items: [] };

    for (const action of availableActions) {
        switch (action.action) {
            case "income":
                menuItemsData.items.push({
                    label: "Income",
                    callback: () => sendMessage("/action income"),
                });
                break;
            case "foreign_aid":
                menuItemsData.items.push({
                    label: "Foreign aid",
                    callback: () => sendMessage("/action foreign_aid"),
                });
                break;
            case "coup":
                if (action.targets) {
                    menuItemsData.items.push({
                        label: "Coup",
                        delay: 300,
                        items: action.targets.map((t) => ({
                            label: t,
                            callback: () => sendMessage("/action coup " + t),
                        })),
                    });
                }
                break;
            case "tax":
                menuItemsData.items.push({
                    label: "Duke",
                    delay: 300,
                    items: [
                        {
                            label: "Tax",
                            callback: () => sendMessage("/action tax"),
                        },
                    ],
                });
                break;
            case "assassinate":
                if (action.targets) {
                    menuItemsData.items.push({
                        label: "Assassin",
                        delay: 300,
                        items: [
                            {
                                label: "Assassinate",
                                items: action.targets.map((t) => ({
                                    label: t,
                                    callback: () => sendMessage("/action assassinate " + t),
                                })),
                            },
                        ],
                    });
                }
                break;
            case "steal":
                if (action.targets) {
                    menuItemsData.items.push({
                        label: "Captain",
                        delay: 300,
                        items: [
                            {
                                label: "Steal",
                                items: action.targets.map((t) => ({
                                    label: t,
                                    callback: () => sendMessage("/action steal " + t),
                                })),
                            },
                        ],
                    });
                }
                break;
            case "exchange_draw":
                menuItemsData.items.push({
                    label: "Ambassador",
                    delay: 300,
                    items: [
                        {
                            label: "Exchange",
                            callback: () => sendMessage("/action exchange_draw"),
                        },
                    ],
                });
                break;
        }
    }

    return menuItemsData;
};

function PlayerCard({ gameState, playerState, sendMessage }) {
    const enableAction = playerState.is_self && playerState.is_current_turn;
    const cardIcon1 =
        playerState.cards.length > 0
            ? determineCardIcon(playerState.cards[0])
            : backsideImage;
    const cardIcon2 =
        playerState.cards.length > 1
            ? determineCardIcon(playerState.cards[1])
            : backsideImage;
    const menuItemsData = buildDropdownItems(
        gameState.available_actions,
        sendMessage
    );
    const showAmbassadorDialog =
        playerState.is_self && playerState.exchange_cards.length > 0;
    const isDead = !playerState.is_alive;

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{
                opacity: isDead ? 0.4 : 1,
                border: playerState.is_current_turn
                    ? "2px solid"
                    : "2px solid transparent",
                borderColor: playerState.is_current_turn
                    ? "primary.main"
                    : "transparent",
                borderRadius: "10px",
                padding: "10px",
                width: "fit-content",
                margin: "0 auto",
            }}
        >
            <Fragment>
                <Stack direction="row" alignItems="center" spacing="20px">
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing="20px"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing="20px"
                        >
                            <Typography variant="h6">
                                {playerState.coins} x
                            </Typography>
                            <img src={coinImage} height="50px" />
                        </Stack>
                        {enableAction &&
                            Object.keys(menuItemsData).length > 0 && (
                                <NestedDropdown
                                    menuItemsData={menuItemsData}
                                    MenuProps={{ elevation: 3 }}
                                    ButtonProps={{ variant: "contained" }}
                                />
                            )}
                    </Stack>
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing="20px"
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textDecoration: isDead
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {playerState.name}
                            {isDead && " (eliminated)"}
                        </Typography>
                        <Stack direction="row" spacing="20px">
                            {cardIcon1 && (
                                <img src={cardIcon1} height="200px" />
                            )}
                            {cardIcon2 && (
                                <img src={cardIcon2} height="200px" />
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                {showAmbassadorDialog && (
                    <AmbassadorDialog
                        cards={playerState.exchange_cards}
                        sendMessage={sendMessage}
                        determineCardIcon={determineCardIcon}
                    />
                )}
            </Fragment>
        </Box>
    );
}

PlayerCard.propTypes = {
    gameState: PropTypes.object.isRequired,
    playerState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayerCard;
