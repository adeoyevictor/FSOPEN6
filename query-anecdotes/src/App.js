import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        dispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 5000)
    }

    const result = useQuery('anecdotes', getAnecdotes, {
        retry: false,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) {
        return <div>loading...</div>
    }
    else if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }
    const anecdotes = result.data
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
