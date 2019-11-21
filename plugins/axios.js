export default function ({ $axios }) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  
  
  // $axios.onRequest(config => {
  //   const token = localStorage.getItem('api_token')
  //     if(token) {
  //       config.headers.common['Authorization'] = 'Bearer ' + token
  //     }
  //   })

  $axios.onError(respErr => {
    console.log(respErr)
  })
}
