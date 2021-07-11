import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadUsers } from '../store.js';

const Form = () => {

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            email: e.target.elements.email.value
        }

        e.target.elements.firstName.value = "";
        e.target.elements.lastName.value = "";
        e.target.elements.email.value = "";

        axios.post('http://localhost:5000/api/add', newUser)
            .then(() => {
                axios.get('http://localhost:5000/api')
                    .then((res) => dispatch(loadUsers(res.data)))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit} className="row g-3 align-items-center">
            <div className="form-group mb-2 col-sm-3">
                <input type="text" className="form-control" id="firstName" minLength="3" placeholder="Your First Name" required />
            </div>
            <div className="form-group mb-2 col-sm-3">
                <input type="text" className="form-control" id="lastName" minLength="3" placeholder="Your Last Name" required />
            </div>
            <div className="form-group mb-2 col-sm-3">
                <input type="email" className="form-control" id="email" placeholder="Your Email" required />
            </div>
            <div className="form-group mb-2 col-sm-3">
                <button type="submit" className="btn btn-primary">Create new user</button>
            </div>
        </form>
    );
}

export default Form;