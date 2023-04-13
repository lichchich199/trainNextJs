import Router from 'next/router'
import { Layout } from '../../components/Layout';
import FormContact from '../../components/FormContact';
import { useSelector, useDispatch } from 'react-redux';
import { endConfirmUser} from '../../redux/actions/confirm';



 export default function Confirm() {
    const userStore = useSelector((state) => state.user);
    const dispatch = useDispatch();

    async function saveContact (data) {
        console.log(data);
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify({
                id: userStore?.user?.id,
                name: userStore?.user?.name,
                email: userStore?.user?.email,
                phone: userStore?.user?.phone,
                address: userStore?.user?.address,
                mode: 'EDIT'
            })
        })
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    }

    var  values = {
        name: userStore?.user?.name,
        email: userStore?.user?.email,
        phone: userStore?.user?.phone,
        address: userStore?.user?.address
    }

    return (
        <Layout>
            <div className="card m-3">
                <h5 className="card-header">Confirm contact</h5>
                <div className="card-body">
                    <FormContact
                        onSubmit={async (data) => {
                            event.preventDefault()
                            try {
                                await saveContact(data)
                                dispatch(endConfirmUser())
                                Router.push('/contact/list')
                            } catch (error) {
                                console.log('error:', error)
                            }}}
                        titleButton='Save'
                        valuesEdit = {values}
                        mode='CONFIRM'
                    />
                </div>
            </div>
        </Layout>
    );
}