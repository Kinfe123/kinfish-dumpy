export async function POST(req: Request) {
    const res = await req.json()
    console.log('THe email is ' , res)
}