"use client";
import {configureStore} from '@reduxjs/toolkit';
import overlayReducer from '../UI components/Overlay/reduxSlice/overlayReducer';

//Using toolkit everything is done automatic by configStore

var rootReducer = {
    overlay: overlayReducer
}
const store = configureStore(
   { reducer : rootReducer }
);

export default store;


