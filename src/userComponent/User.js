import React, { useState, useEffect } from "react";
import Service from "../userService/UserService";

const TempUser = props => {

  const initialUserState = {
    id: null,
    name: "",
    email: "",
    approved: false
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    Service.get(id)
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    // const { name, value } = event.target;
    // setCurrentUser({ ...currentUser, [name]: value });
        event.persist();
        setCurrentUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };

  const updateCreated = status => {
    var data = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      approved: status
    };

    Service.update(currentUser.id, data)
      .then(response => {
        setCurrentUser({ ...currentUser, approved: status });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    Service.update(currentUser.id, currentUser)
      .then(response => {
        setMessage("User was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    Service.remove(currentUser.id)
      .then(response => {
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={currentUser.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" name="email" value={currentUser.email} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentUser.approved ? "Approved!" : "Pending approval..."}
            </div>
          </form>

          {currentUser.approved ? (
            <button className="badge badge-primary mr-2" onClick={() => updateCreated(false)}> Unapprove </button>
          ) : (
            <button className="badge badge-primary mr-2" onClick={() => updateCreated(true)}> Approve </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteUser}> Delete </button>

          <button type="submit" className="badge badge-success" onClick={updateUser}> Update </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Click on a User to see info</p>
        </div>
      )}
    </div>
  );
};

export default TempUser;