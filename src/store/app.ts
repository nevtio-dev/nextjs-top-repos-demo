import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AppState {
    signInModalOpen: boolean;
}

const initialState: AppState = {
    signInModalOpen: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSignInModalOpen: (state, action: PayloadAction<boolean>) => {
            state.signInModalOpen = action.payload
        }
    }
})

export const { setSignInModalOpen } = appSlice.actions
export default appSlice.reducer
