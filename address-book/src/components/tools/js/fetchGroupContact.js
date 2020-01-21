function get(path) {
    return fetch(path, {
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    .then(res => res.json())
};

export default get;