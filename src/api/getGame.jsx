import { BACKEND_URL } from "./constants";
import PropTypes from 'prop-types';

const getGame = (uuid) => {
    return fetch(BACKEND_URL + '/get_game/' + uuid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log('getGame response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

getGame.PropTypes = {
    uuid: PropTypes.string.isRequired
};

export { getGame };
