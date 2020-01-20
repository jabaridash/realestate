import axios from 'axios'


import config from './config'

const HTTP_GET = "GET"
const baseUrl = config.rapidApi.url
const propertiesUrl = `${baseUrl}/properties`
const listForSaleUrl = `${propertiesUrl}/list-for-sale`
const defaultHeaders = {
	"x-rapidapi-host": config.rapidApi.host,
	"x-rapidapi-key": config.rapidApi.key,
}

class APIService {
  post(form) {
    return axios({
      method: HTTP_GET,
      url: listForSaleUrl,
      headers: defaultHeaders,
      params: form
    })
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
  }
}

export default APIService
