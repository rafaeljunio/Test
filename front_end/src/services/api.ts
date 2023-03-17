import axios, {AxiosError} from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      //renovar token
      cookies = parseCookies();

      const { 'nextauth.refreshToken': refreshToken } = cookies;

      //todas as informações para repetir a requisição pro back-end
      const originalConfig = error.config

      if(!isRefreshing){

        isRefreshing = true;

        api.post('/refresh', {
          refreshToken
        }).then(response => {
          const {token} = response.data;

          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          })

          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          })

          api.defaults.headers['Authorization'] = `Bearer ${token}`

          //passa o token atualizado em todas as requisições que estavam sendo aguardadas na fila
          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = [];
        }).catch(error => {
          //caso tenha um erro passa o erro em todas as requisições que estavam sendo aguardadas na fila
          failedRequestsQueue.forEach(request => request.onFailure(error))
          failedRequestsQueue = [];
        })
        .finally(() => {
          isRefreshing = false
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            //resolve - aguarda para ser executado
            resolve(api(originalConfig))
          },
          onFailure: (error: AxiosError) => {
            reject(error)
          }
        })
      })



    } else {
      //deslogar o usuário
    }
  }
})
