import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

        },
        onError: (error) => {
            console.log(error.response.data.error);
            dispatch({ type: 'SET', payload: error.response.data.error })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        }
    })
    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMutation.mutate({ content, votes: 0 })
        dispatch({ type: 'SET', payload: `anecdote '${content}' created` })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
