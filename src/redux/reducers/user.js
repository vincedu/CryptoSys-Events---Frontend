import { SET_USER } from '../actionTypes';

const initialState = {
    name: 'Username',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            const { username } = action.payload;
            return {
                ...state,
                name: username,
            };
        }
        default:
            return state;
    }
}
