import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 10000
  })

  instance.interceptors.request.use(res => {
    return res
  }, err => {
    return err
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return err
  })

  return instance(config)
}
