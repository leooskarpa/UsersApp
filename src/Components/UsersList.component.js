import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { loadUsers, removeUser } from '../store.js';
import removeImageRed from '../Images/remove-red.svg';



const UsersList = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    axios.get('http://localhost:5000/api/')
      .then(res => dispatch(loadUsers(res.data)))
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (user) => {
    axios.delete(`http://localhost:5000/api/delete/${user._id}`)
      .then(() => dispatch(removeUser(user)))
      .catch(err => console.log(err))
  }

  return (
    <div>
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
            <img className="remove-btn" src={removeImageRed} alt="remove" onClick={() => deleteUser(user)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersList;