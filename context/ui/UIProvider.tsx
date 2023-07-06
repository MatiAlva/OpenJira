import { UIContext } from './UIContext'
import { useReducer } from 'react'
import {  uiReducer } from './uiReducer'

export interface  UIState {
    sidemenuOpen: boolean
    isAddingEntry: boolean
    isDragging: boolean
}

const  UI_INITIAL_STATE:  UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

interface Props {
    children?: React.ReactNode;
}
export const  UIProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer( uiReducer,  UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'})
    }

    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({type: 'UI - Set isAddingEntry', payload: isAdding})
    }

    const startDragging = () => {
        dispatch({type: 'UI - Start Dragging'})
    }

    const endtDragging = () => {
        dispatch({type: 'UI - End Dragging'})
    }


    return (
        <UIContext.Provider value={{
            ...state,

            //Method
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDragging,
            endtDragging
        }}>
        {children}
       </ UIContext.Provider>
    )
}