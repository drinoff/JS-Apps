import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getFurniture(){
    return await api.get(host+ '/users')
}

export async function getItemById(id){
    return await api.get(host + '/users' + id);
}

export async function getMyFurniture(){
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

export async function createItem(data){
    return await api.post(host + '/users',data);
}

export async function editItem(id,data){
    return await api.put(host + '/users' + id,data);
}

export async function deleteItem(id){
    return api.del(host + '/users' + id);

}