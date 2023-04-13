import Link from "next/link"
import { Layout } from "../../components/Layout"
import { PrismaClient } from '@prisma/client'
import { useState } from "react";

const prisma = new PrismaClient();

export default function List({initialContacts}) {
    var [contactList, setContactList] = useState(initialContacts);

    //handle deleteContact
    async function deleteContact(id){
        const responseDelete = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                mode: 'DELETE'
            }),
        }).catch(error => {
            throw(error)
        })
        if(!responseDelete.ok) {
            throw new Error(responseDelete.statusText)
        }
        const responseList = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                mode: 'GETLIST'
            }),
        }).catch(error => {
            throw(error)
        })
        if(!responseList.ok) {
            throw new Error(responseList.statusText)
        }
        var data = await responseList.json()
        setContactList(data)
    }

    return(
        <Layout>
            <h3>List User</h3>
            <button type="button" className="btn btn-primary"><Link className="text-light" href='/contact/add'>Add</Link></button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contactList.map((contact, index) => {
                            return(
                                <tr key={contact.id}>
                                    <th scope="row"><Link href={`/contact/edit/${contact.id}`}>{++index}</Link> </th>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.address}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                            deleteContact(contact.id)
                                        }}>Delete</button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export async function getServerSideProps() {
    const contacts = await prisma.contact.findMany();
    return {
        props: {
            initialContacts: contacts
        }
    }
}
