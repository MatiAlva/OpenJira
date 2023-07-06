
interface SeedData {
    entries: SeedEntry[]
}


interface SeedEntry {
    description: string,
    status: string,
    createAt: number
}




export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Descripcion de la card 1',
            status: 'pending',
            createAt: Date.now()
        },        {
            description: 'In-Progress: Descripcion de la card 2',
            status: 'in-progress',
            createAt: Date.now()
        },        
        {
            description: 'Finished: Descripcion de la card 3',
            status: 'finished',
            createAt: Date.now()
        }
    ]
}