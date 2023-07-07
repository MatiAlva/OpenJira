import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import { dateFunction } from '@/utils'
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material'
import { useRouter } from 'next/router'
import React, {DragEvent, useContext} from 'react'


interface Props {
    entry: Entry
}

export const EntryCard: React.FC<Props> = ({entry}) => {

    const router = useRouter()
    
    const {startDragging, endtDragging} = useContext(UIContext)
    const onDargStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', entry._id)

        startDragging()
    }

    const onDragEnd = () => {
        endtDragging()
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }


  return (
    <Card
        onClick={onClick}
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
                <Typography variant='body2'>{dateFunction.getFormatDistanceToNow(entry.createAt)}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
