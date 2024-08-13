import { BACKEND_URL } from "./constants";
import PropTypes from 'prop-types';

function createGame(creator, numPlayers) {
    const data = {
        creator: creator,   
        num_players: numPlayers
    };

    fetch(BACKEND_URL + '/create_game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log('createGame response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

createGame.PropTypes = {
    creator: PropTypes.string.isRequired,
    numPlayers: PropTypes.number.isRequired
};

export { createGame };
