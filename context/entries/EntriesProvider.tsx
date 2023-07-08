import { Entry } from '@/interfaces'
import { EntriesContext, entriesReducer } from './'
import { useEffect, useReducer } from 'react'
import { entriesApi } from '@/apis'
import {useSnackbar} from 'notistack'

export interface EntriesState {
     entries: Entry[]
}

const Entries_INITIAL_STATE:  EntriesState = {
     entries: []
}

interface Props {
    children?: React.ReactNode
}

export const  EntriesProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer( entriesReducer,  Entries_INITIAL_STATE)
    const {enqueueSnackbar} = useSnackbar()

    const addNewEntry = async(description: string) => {
        const {data} = await entriesApi.post<Entry>('/entries', {description})
        dispatch({type: 'Entry - Add-Entry', payload: data})
    }

    const updateEntry = async({_id, description, status}: Entry) => {
        try {
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})
            dispatch({ type: 'Entry - Entry-Updated', payload: data })

            enqueueSnackbar('Entrada Actualizada',{
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

        } catch (error) {
            console.log({error})
        }
    }


    const deleteEntry = async(entry: Entry) => {
        try {
            const {data} = await entriesApi.delete<Entry>(`/entries/${entry._id}`)
            dispatch({ type: 'Entry - Delete-Entry', payload: data })

            enqueueSnackbar('Entrada Eliminada',{
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

        } catch (error) {
            console.log({error})
        }
    }

    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type: 'Entry - Refresh-Data', payload: data})
    }

    useEffect(() => {
        refreshEntries()
    }, [state])


    

    return (
        <EntriesContext.Provider value={{
             ...state,


             //Methods
             addNewEntry,
             updateEntry,
             deleteEntry
        }}>
       {children}
       </EntriesContext.Provider>
    )
}