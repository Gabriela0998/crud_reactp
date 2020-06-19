import http from "../general/General";

const getAll = () => {
    return http.get("/users");
};

const removeAll = () => {
    return http.delete(`/users`);
};

const get = id => {
    return http.get(`/users/${id}`);
};

const update = (id, data) => {
    return http.put(`/users/${id}`, data);
};

const create = data => {
    return http.post("/users", data);
};

const remove = id => {
    return http.delete(`/users/${id}`);
};

const findByName = name => {
    return http.get(`/users?name=${name}`);
};

export default {
    getAll,
    removeAll,
    get,
    create,
    update,
    remove,
    findByName
};