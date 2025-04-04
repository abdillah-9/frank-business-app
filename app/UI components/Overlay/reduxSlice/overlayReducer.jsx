/* Here the advantage of using Redux Toolkit we have IMMER which converts mutable
logic into Immutable BUT ITS COOL TO STILL CODE IMMUTABLE LOGICS */   

import { createSlice } from '@reduxjs/toolkit';

//Define the initial state obj
const initialOverlay = {
    overlay: false,
    fetchedFormData: false,
    showSideNavBar:false,
}

const overlayReducer = createSlice(
    {
        name: "overlay",
        initialState: initialOverlay,
        reducers: {         
            setOverlay(state, action){
                //Here I wrote immutation logic
                return { 
                    ...state,
                    overlay: action.payload.overlay ?? state.overlay,
                    fetchedFormData: action.payload.fetchedFormData ?? state.fetchedFormData,
                    showSideNavBar: action.payload.showSideNavBar ?? state.showSideNavBar,
                };
            },
        }
    }
);

export const { setOverlay } = overlayReducer.actions;

export default overlayReducer.reducer;
