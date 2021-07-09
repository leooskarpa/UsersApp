import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import './App.css'
import removeImageRed from './Images/remove-red.svg';


const App = () => {

  const [users, setUsers] = useState([{
    _id: 0,
    firstName: "",
    lastName: "",
    email: ""
  }]);

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
      .then(() => getUsers())
      .catch(err => console.log(err))
  }

  const getUsers = () => {
    axios.get('http://localhost:5000/api')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/delete/${userId}`)
      .then(() => getUsers())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="header-container">
        <h1 className="header-title">Users App</h1>
      </div>
      <div className="container">
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

        <div className="row align-items-center table-header-container">
          <h4 className="col-3 table-header-title ">
            First name
          </h4>
          <h4 className="col-3 table-header-title">
            Last name
          </h4>
          <h4 className="col-3 table-header-title">
            Email
          </h4>
        </div>

        {users.map(user =>
          <div key={user._id} className="row user-container">
            <div className="col-3">
              {user.firstName}
            </div>
            <div className="col-3">
              {user.lastName}
            </div>
            <div className="col-3">
              {user.email}
            </div>
            <div className="remove-btn-container col-3">
              <img className="remove-btn" src={removeImageRed} alt="remove" onClick={() => deleteUser(user._id)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
