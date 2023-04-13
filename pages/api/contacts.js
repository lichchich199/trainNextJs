import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const contactData = JSON.parse(req.body)
    var contact;
    switch (contactData?.mode) {
        case 'GET':
            delete contactData.mode;
            contact = await prisma.contact.findUnique({
                where: {
                    id: contactData.id
                }
            })
            break;
        case 'DELETE':
            delete contactData.mode;
            contact = await prisma.contact.delete({
                where: {
                    id: contactData.id
                }
            })
            break;
        case 'ADD':
            delete contactData.mode;
            contact = await prisma.contact.create({
                data: contactData
            })
            break;
        case 'EDIT':
            delete contactData.mode;
            contact = await prisma.contact.update({
                where: {
                    id: contactData.id
                },
                data: contactData
            })
            break;
        case 'GETLIST':
            delete contactData.mode;
            contact = await prisma.contact.findMany();
            break;
    
        default:
            break;
    }
    res.json(contact)
}