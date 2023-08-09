import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        notificationReset(state, action) {
            return ''
        }
    }
})

export const { notificationChange, notificationReset } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return (dispatch, getState) => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationReset())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer