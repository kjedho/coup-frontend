import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const enableAction = playerState.is_self && playerState.is_current_turn;
    const cards = playerState.cards.map((card) => ({
        icon: determineCardIcon(card),
        lost: card.visible,
    }));
    const menuItemsData = buildDropdownItems(
        gameState.available_actions,
        sendMessage
    );
    const showAmbassadorDialog =
        playerState.is_self && playerState.exchange_cards.length > 0;
    const isDead = !playerState.is_alive;

    const cardHeight = isMobile ? "100px" : "200px";
    const coinHeight = isMobile ? "30px" : "50px";
    const spacing = isMobile ? 1 : 2;

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
                p: { xs: 1, sm: 2 },
                width: "fit-content",
                maxWidth: "95vw",
                margin: "0 auto",
            }}
        >
            <Fragment>
                <Stack 
                    direction={isMobile ? "column" : "row"} 
                    alignItems="center" 
                    spacing={spacing}
                >
                    <Stack
                        direction={isMobile ? "row" : "column"}
                        alignItems="center"
                        justifyContent="center"
                        spacing={spacing}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <Typography variant={isMobile ? "body1" : "h6"}>
                                {playerState.coins} x
                            </Typography>
                            <img src={coinImage} style={{ height: coinHeight }} alt="coins" />
                        </Stack>
                        {enableAction &&
                            Object.keys(menuItemsData).length > 0 && (
                                <NestedDropdown
                                    menuItemsData={menuItemsData}
                                    MenuProps={{ elevation: 3 }}
                                    ButtonProps={{ 
                                        variant: "contained",
                                        size: isMobile ? "small" : "medium"
                                    }}
                                />
                            )}
                    </Stack>
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing={spacing}
                    >
                        <Typography
                            variant={isMobile ? "body1" : "h5"}
                            sx={{
                                textDecoration: isDead
                                    ? "line-through"
                                    : "none",
                                textAlign: "center",
                                wordBreak: "break-word",
                                maxWidth: "90vw",
                            }}
                        >
                            {playerState.name}
                            {isDead && " (out)"}
                        </Typography>
                        <Stack direction="row" spacing={isMobile ? 1 : 2}>
                            {cards.map((card, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={card.icon}
                                    alt="card"
                                    sx={{
                                        height: cardHeight,
                                        maxWidth: isMobile ? "45vw" : "auto",
                                        objectFit: "contain",
                                        filter: card.lost ? "grayscale(100%)" : "none",
                                        opacity: card.lost ? 0.5 : 1,
                                    }}
                                />
                            ))}
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
