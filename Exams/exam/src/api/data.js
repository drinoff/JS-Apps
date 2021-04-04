import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllArticles(){
    return await api.get(host+ '/data/wiki?sortBy=_createdOn%20desc')
}

export async function getArticleById(id){
    return await api.get(host + '/data/wiki/' + id);
}

export async function getMyCars(userId){
    
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createArticle(data){
    return await api.post(host + '/data/wiki',data);
}

export async function editArticle(id,data){
    return await api.put(host + '/data/wiki/' + id,data);
}

export async function deleteArticle(id){
    return api.del(host + '/data/wiki/' + id);

}

export async function searchArticle(query){
    return api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}

export async function getRecent(){
    return api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category')
}