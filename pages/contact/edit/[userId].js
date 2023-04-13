import Router from 'next/router'
import { Layout } from '../../../components/Layout';
import { useEffect, useState } from 'react';
import FormContact from '../../../components/FormContact';
import { startConfirmUser, endConfirmUser } from '../../../redux/actions/confirm';
import { useDispatch } from 'react-redux';

 export default function Edit( {id}) {
    const[user, setUser] = useState(null);
    const dispatch = useDispatch();

    async function saveContact (data) {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                mode: 'EDIT'
            })
        })
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    }

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                body: JSON.stringify({
                  id: id,
                  mode: 'GET'
                })
            }).then(res => res.json()).catch()
            setUser(response);
            if(!response) {
                Router.push('/404')
            }
        }
        loadData()
    },[]);
    var  values = {
        id: id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address
    }
    // dispatch(startConfirmUser(user))
    console.log(values)

    return (
        <Layout>
            <div className="card m-3">
                <h5 className="card-header">Edit contact</h5>
                <div className="card-body">
                    <FormContact
                        onSubmit={async (data) => {
                            event.preventDefault()
                            try {
                                // await saveContact(data)
                                dispatch(startConfirmUser({
                                    id: data?.id,
                                    name: data?.name,
                                    email: data?.email,
                                    phone: data?.phone,
                                    address: data?.address
                                }))
                                // Router.push('/contact/list')
                                Router.push('/contact/confirm')
                            } catch (error) {
                                console.log('error:', error)
                            }}}
                        titleButton='Save'
                        valuesEdit = {values}
                    />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
  return {
      props: { id: params.userId}
  }
}
