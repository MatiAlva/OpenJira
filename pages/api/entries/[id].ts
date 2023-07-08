import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

type Data = 
    |{message: string}
    |IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query
    

    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({message: 'El id es invalido'})
    }

    switch(req.method){
        case 'PUT':
            return updateEntry(req, res)

        case 'GET':
            return getEntry(req, res)

        
        case 'DELETE':
            return deleteEntry(req, res)

        default:
            return res.status(400).json({message: 'Metodo inexistente'})
    }
}


const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query
    await db.connect()

    const entryToUpdated = await Entry.findById(id)

    if(!entryToUpdated){
        await db.disconnected()
        return res.status(400).json({message: 'No hay entrada con ese id' +id})
    }

    const {description = entryToUpdated.description , status = entryToUpdated.status} = req.body

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true})
        await db.disconnected()
        res.status(200).json(updatedEntry!)

    } catch (error: any) {
        await db.disconnected()
        res.status(400).json({message: error.erros.status.message})
    }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query
    await db.connect()

    const entryInDB = await Entry.findById(id)
    await db.disconnected()

    if(!entryInDB){
        return res.status(400).json({message: 'No hay entrada con ese id' +id})
    }

    return res.status(200).json(entryInDB)
}

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query
    await db.connect()

    const deleteEntry = await Entry.findByIdAndDelete(id)
    await db.disconnected()

    if(!deleteEntry){
        return res.status(400).json({message: 'No se puede eliminar la informacion con el id: ' +id})
    }

    return res.status(200).json({message: 'Eliminado con Exit'})
}