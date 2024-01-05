import { db } from "@/db"
import { guesser } from "@/db/schema"
export async function POST(req: Request) {
    
    const body  = await req.json()
    const {name , phone , guess} = body
    if(name && phone && guess) {
        const req = await db.insert(guesser).values({name: name , phone:phone , guess:guess})
        console.log(req , ' the req')

        return new Response('Succesfully guessed' , {status:200})

    }else {
        return new Response('Please provide a valid data' ,{status:404})
    }
}