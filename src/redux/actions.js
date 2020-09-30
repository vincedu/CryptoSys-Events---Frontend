/* eslint-disable import/prefer-default-export */
import { SET_USER } from './actionTypes';

export const setUser = (username) => ({ type: SET_USER, payload: { username } });
