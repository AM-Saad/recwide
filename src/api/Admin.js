import { request } from './request'

export default class User {

    static async friends(url, jwt) { return await request(`${url}/user/friends`, 'get', {}, true, jwt) }
    static async react(id, react, url, jwt) { return await request(`${url}/feed/react/${id}?react=${react}`, 'put', JSON.stringify({ message: "Liked" }), true, jwt) }




}