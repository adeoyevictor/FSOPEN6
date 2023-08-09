import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const anecdotesToShow = anecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList