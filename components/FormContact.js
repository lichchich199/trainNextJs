import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';

 export default function FormContact(props) {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string()
            .required('phone is required'),
        address: Yup.string()
        .required('address is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    if(props.valuesEdit) {
        formOptions.values = props.valuesEdit
    }
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
            <form onSubmit={handleSubmit((data) => {
                props.onSubmit(data)
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
                    <button type="submit" className="btn btn-primary mr-1">{props.titleButton}</button>
                    <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    <button type="button" className="btn btn-secondary"><Link href='/contact/list'>Back to list</Link></button>

                </div>
            </form>
    );
}
