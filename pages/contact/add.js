import Router from 'next/router'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { Layout } from '../../components/Layout';

 export default function Add() {
    console.log('render')
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        // dob: Yup.string()
        //     .required('Date of Birth is required')
        //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string()
            .required('phone is required'),
        address: Yup.string()
        .required('address is required'),
        // acceptTerms: Yup.bool()
        //     .oneOf([true], 'Accept Ts & Cs is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function saveContact (data) {
        var body = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            mode: 'ADD'

        }
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body))
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
                    <form onSubmit={handleSubmit(async (data) => {
                         event.preventDefault()
                        try {
                            await saveContact(data)
                            Router.push('/contact/list')
                        } catch (error) {
                            console.log('error:', error)
                        }
                    })}>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Name</label>
                                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Email</label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Phone</label>
                                <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.phone?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Address</label>
                                <input name="address" type="text" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.address?.message}</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-1">Add</button>
                            <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                            <button type="button" className="btn btn-secondary"><Link href='/contact/list'>Back to list</Link></button>

                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
