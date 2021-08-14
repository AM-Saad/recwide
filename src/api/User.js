import { request } from './request'

export default class User {

    static async videos(url, jwt) { return await request(`${url}/user/videos`, 'get', {}, true, jwt) }
    static async newVideo(url, jwt, blobs) {
        return await request(`${url}/user/videos`, 'post', blobs, true, jwt)
    }
    static async react(id, react, url, jwt) { return await request(`${url}/feed/react/${id}?react=${react}`, 'put', JSON.stringify({ message: "Liked" }), true, jwt) }




}