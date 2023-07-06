import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "@/interfaces"
import { EntriesContext } from "@/context/entries"
import {useContext, useMemo, DragEvent} from 'react'
import { UIContext } from "@/context/ui"
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}


export const EntryList: React.FC<Props> = ({ status }) => {

  const {entries, updateEntry } = useContext(EntriesContext)
  const {isDragging, endtDragging } = useContext(UIContext)

  const entriesByStatus = useMemo( () =>   
    entries.filter(entry => entry.status === status)
  ,[entries])

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text')

    const entry = entries.find(e => e._id === id)!
    entry.status = status
    updateEntry(entry)
    endtDragging()
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
              {
                entriesByStatus.map(entry => (
                  <EntryCard key={entry._id} entry={entry}/>
                ))
              }
            </List>
        </Paper>
    </div>
  )
}
