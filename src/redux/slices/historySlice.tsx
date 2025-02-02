import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    past: any[];    // History of previous states
    present: any;   // Current state
    future: any[];  // History of future states
}

const initialState: State = {
    past: [],
    present: [],
    future: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        record: (state, action: PayloadAction<any>) => {
            const newState = action.payload;
            console.log("newState", newState);

            // Save the current state to past
            state.past.push(state.present);
            state.present = newState;  // Update present with the new state
            state.future = [];         // Clear future, as new change invalidates future actions
        },
        undo: (state) => {
            if (state.past.length > 0) {
                // Get the previous state from past
                const previous = state.past[state.past.length - 1];
                console.log("previous", previous);

                // Move the present state to future
                state.future.unshift(state.present);
                state.present = previous; // Revert to previous state

                // Remove the last state from past (because we've undone it)
                state.past = state.past.slice(0, state.past.length - 1);
            }
        },
        redo: (state) => {
            if (state.future.length > 0) {
                // Get the next state from future
                const next = state.future[0];

                // Move the current state to past
                state.past.push(state.present);
                state.present = next;  // Apply the next state from future

                // Remove the first state from future (because we've redone it)
                state.future = state.future.slice(1);
            }
        },
    },
});

export const { record, undo, redo } = historySlice.actions;
export default historySlice.reducer;
