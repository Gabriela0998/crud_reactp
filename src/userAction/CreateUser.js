import React, { useState } from "react";
import Service from "../userService/UserService";
import "./action.css";

const CreateUser = () => {

  const initialUserState = {
    id: null,
    name: "",
    email: "",
    approved: false
  };
  
  const [user, setUser] = useState(initialUserState);
  const [approved, setApproved] = useState(false);

  const handleInputChange = event => {
        event.persist();
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
  };

  const createUser = () => {
    var data = {
      name: user.name,
      email: user.email
    };

    Service.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          approved: response.data.approved
        });
        setApproved(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setApproved(false);
  };

  return (
    <div className="submit-form">
      {approved ? (
        <div>
          <h4>Успешно влизане!</h4>
          <button className="btn btn-success" onClick={newUser}> Добави </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Име: </label>
            <input type="text" className="form-control" id="name" required value={user.name} onChange={handleInputChange} name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="text" className="form-control" id="email" required value={user.email} onChange={handleInputChange} name="email" />
          </div>

          <button onClick={createUser} className="search-button"> Влез </button>
        </div>
      )}
    </div>
  );
};

export default CreateUser;