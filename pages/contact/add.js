import Router from 'next/router'

import { Layout } from '../../components/Layout';
import FormContact from '../../components/FormContact';

 export default function Add() {
    async function saveContact (data) {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                name: data?.name,
                email: data?.email,
                phone: data?.phone,
                address: data?.address,
                mode: 'ADD'
            })
        })
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    }

    return (
        <Layout>
            <div className="card m-3">
                <h5 className="card-header">Add contact</h5>
                <div className="card-body">
                    <FormContact 
                        onSubmit={async (data) => {
                            event.preventDefault()
                            try {
                                await saveContact(data)
                                Router.push('/contact/list')
                            } catch (error) {
                                console.log('error:', error)
                            }}}
                        titleButton='Add'
                    />
                </div>
            </div>
        </Layout>
    );
}
