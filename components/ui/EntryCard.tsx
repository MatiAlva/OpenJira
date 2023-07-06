import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material'
import React, {DragEvent, useContext} from 'react'


interface Props {
    entry: Entry
}

export const EntryCard: React.FC<Props> = ({entry}) => {

    const {startDragging, endtDragging} = useContext(UIContext)
    const onDargStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', entry._id)

        startDragging()
    }

    const onDragEnd = () => {
        endtDragging()
    }

  return (
    <Card
        sx={{ marginBottom: 1}}
        draggable
        onDragStart={onDargStart}
        onDragEnd={onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
