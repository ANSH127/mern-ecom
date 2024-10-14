import {createSlice} from '@reduxjs/toolkit';

export const cartItemsLengthSlice = createSlice({
    name: 'cartItemsLength',
    initialState: {
        value: 0,
    },
    reducers: {
        setCartItemsLength: (state, action) => {
            if(action.payload=="increment"){
                state.value += 1;
            }else if(action.payload=="decrement"){
                state.value -= 1;
            }
            else {
                state.value = action.payload;
            }

        },
    },
});

export const {setCartItemsLength} = cartItemsLengthSlice.actions;

export default cartItemsLengthSlice.reducer;