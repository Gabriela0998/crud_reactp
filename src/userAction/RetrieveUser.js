import React, { useState, useEffect } from "react";
import Service from "../userService/UserService";
import { Link } from "react-router-dom";
import "./action.css";

const RetrieveUser = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchByName = event => {
    const search = event.target.value;
    setSearch(search);
  };

  const retrieveUsers = () => {
    Service.getAll()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    Service.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    Service.findByName(search)
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list-items row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search by name" value={search} onChange={onChangeSearchByName} />
          <div className="input-group-append">
            <button className="search-button" type="button" onClick={findByName}> Търсене </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Потребители</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li className={ "list-group-item " + (index === currentIndex ? "active" : "") } onClick={() => setActiveUser(user, index)} key={index} >
                {user.name}
              </li>
            ))}
        </ul>

        <button className="remove-button" onClick={removeAllUsers}> Изтрии всички </button>
      </div>
      <div className="col-md-6">
        {user ? (
          <div>
            <h4>Потребители</h4>
            <div>
              <label>
                <strong>Име:</strong>
              </label>{" "}
              {user.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {user.email}
            </div>
            <div>
              <label>
                <strong>Статус:</strong>
              </label>{" "}
              {user.approved ? "Approved" : "Pending approval..."}
            </div>

            <Link to={"/users/" + user.id} className="badge badge-warning"> Редактиране </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Кликни върху потребителя за повече информация</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrieveUser;