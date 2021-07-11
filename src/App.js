import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Form from './Components/Form.component.js';
import UsersList from './Components/UsersList.component.js';


const App = () => {

  return (
    <div>
      <div className="header-container">
        <h1 className="header-title">Users App</h1>
      </div>
      <div className="container">

        <Form />

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

        <UsersList />

      </div>
    </div>
  );
}

export default App;
