import { BACKEND_URL } from "./constants";
import PropTypes from 'prop-types';

function joinGame(playerName, uuid) {
    const data = {
        uuid: uuid,
        player_name: playerName,   
    };

    fetch(BACKEND_URL + '/add_player', {
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
        console.log('joinGame response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

joinGame.PropTypes = {
    playerName: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
};

export { joinGame };
