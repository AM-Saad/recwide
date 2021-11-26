import { request } from './request'

export default class User {

    static async projects(url, jwt) { return await request(`${url}/user/projects`, 'get', null, true, jwt) }
    static async newProject(url, jwt, data) { return await request(`${url}/user/projects`, 'post', JSON.stringify(data), true, jwt) }
    static async deleteProject(url, jwt, id) { return await request(`${url}/user/projects/${id}`, 'Delete',null, true, jwt) }
    static async getUser(url, jwt) { return await request(`${url}/user`, 'get', null, true, jwt) }
    static async changeInfo(url, jwt, data) { return await request(`${url}/user/info`, 'put', JSON.stringify(data), true, jwt) }
    static async changePassword(url, jwt, data) { return await request(`${url}/user/password`, 'put', JSON.stringify(data), true, jwt) }




}