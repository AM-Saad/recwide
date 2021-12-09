import { request } from '@/api/request'

export default class meetingService {

    static async create(url, jwt, data) { return await request(`${url}/user/meetings`, 'post', JSON.stringify(data), true, jwt) }
    static async getAll(url, jwt) { return await request(`${url}/user/meetings`, 'get', null, true, jwt) }
    static async sendInvitation(url, jwt, data) { return await request(`${url}/user/meetings/${data.id}/invite`, 'put', JSON.stringify({ email: data.email }), true, jwt) }
    static async deleteMeeting(url, jwt, id) { return await request(`${url}/user/meetings/${id}`, 'Delete',null, true, jwt) }

}