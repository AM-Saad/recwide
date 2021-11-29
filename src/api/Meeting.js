import { request } from '@/api/request'

export default class meetingService {

    static async create(url, jwt, data) { return await request(`${url}/user/meetings`, 'post', JSON.stringify(data), true, jwt) }

}