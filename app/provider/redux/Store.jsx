"use client";
import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

//Using toolkit everything is done automatic by configStore

var rootReducer = {
    ReduxState: reducer
}
const store = configureStore(
   { reducer : rootReducer }
);

export default store;


