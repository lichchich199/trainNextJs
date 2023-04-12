import Link from "next/link"
import { Layout } from "../../components/Layout"
import { PrismaClient } from '@prisma/client'
import Router from 'next/router'

const prisma = new PrismaClient();

export default function List({initialContacts}) {
    async function deleteContact(id){
        var body = {
            id: id,
            mode: 'DELETE'
        }
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(body),
        })
        console.log(JSON.stringify(body))
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
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
                        initialContacts.map((contact, index) => {
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
                                            Router.push('/contact/list')
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
