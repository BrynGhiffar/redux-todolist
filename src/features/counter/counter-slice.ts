import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CounterState {
    value: number;
    incrementBy: number;
};

const initialState: CounterState = {
    value: 0,
    incrementBy: 1,
};

const counterSlice = createSlice({
    name: "Counter",
    initialState: initialState,
    reducers: {
        // increment
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        },
        incrementByValue(state) {
            state.value += state.incrementBy;
        },
        decrementByValue(state) {
            state.value -= state.incrementBy;
        },
        setIncrementBy(state, action: PayloadAction<string>) {
            if (!isNaN(+action.payload)) {
                state.incrementBy = +action.payload;
            }
        }
    }
});

export const {
    increment,
    decrement,
    incrementByValue,
    decrementByValue,
    setIncrementBy,
} = counterSlice.actions;
export default counterSlice.reducer;