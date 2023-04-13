import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const data = JSON.parse(req.body)
    console.log('data:', req.body.name)
    var contact = await prisma.contact.findMany({
        where: {
            name: {
                contains: req.body.name,
              },
        }
    })
    // console.log('contact search',contact)
    res.json(contact)
}