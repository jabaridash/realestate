import axios from 'axios'

const HTTP_GET = "GET"
const baseUrl = "https://realtor.p.rapidapi.com"
const propertiesUrl = `${baseUrl}/properties`
const listForSaleUrl = `${propertiesUrl}/list-for-sale`
const defaultHeaders = {
	"x-rapidapi-host": "realtor.p.rapidapi.com",
	"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
}

console.log(defaultHeaders)

export default class APIService {
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
