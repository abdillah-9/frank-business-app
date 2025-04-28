/* Here the advantage of using Redux Toolkit we have IMMER which converts mutable
logic into Immutable BUT ITS COOL TO STILL CODE IMMUTABLE LOGICS */   

import { createSlice } from '@reduxjs/toolkit';

//Defining the initial state objs
const initialStates = {
    overlay: false,
    fetchedFormData: false,
    showNavBar:false,
    showForm:false,
}

const reducerFunc = createSlice(
    {
        name: "ReduxState",
        initialState: initialStates,
        reducers: {         
            setReduxState(state, action){
                return { 
                    ...state,
                    overlay: action.payload.overlay ?? state.overlay,
                    fetchedFormData: action.payload.fetchedFormData ?? state.fetchedFormData,
                    showNavBar: action.payload.showNavBar ?? state.showNavBar,
                    showForm:action.payload.showForm ?? state.showForm,
                };
            },
        }
    }
);

export const { setReduxState } = reducerFunc.actions;

export default reducerFunc.reducer;
