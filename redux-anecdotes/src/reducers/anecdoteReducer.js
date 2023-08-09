import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action) {
            const id = action.payload.id
            const newAnecdote = action.payload
            return state.map(a => a.id !== id ? a : newAnecdote)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (id) => {
    return async (dispatch, getState) => {
        const anecdotes = getState().anecdotes
        const anecdote = anecdotes.find(a => a.id === id)
        const updatedAnecdote = await anecdoteService.vote(id, { ...anecdote, votes: anecdote.votes + 1 })
        dispatch(addVote(updatedAnecdote))
    }
}

export default anecdotesSlice.reducer
