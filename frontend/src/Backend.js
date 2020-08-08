import axios from 'axios'

let RequestType = { GET: 0, POST: 1 };

const Backend = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {'X-Requested-With': 'XMLHttpRequest'}
});

Backend.defaults.timeout = 20000; //20 seconds

Backend.sendRequest = function(requestType, url, data, onSuccess, onError){
  switch (requestType){
    case RequestType.GET:
        Backend.get(url).then(function(response) {
        onSuccess && onSuccess(response);
      }).catch(function(error) {
        onError && onError(error);
      });
      break;
    case RequestType.POST:
        Backend.post(url, data).then(function(response) {
        onSuccess && onSuccess(response);
      }).catch(function(error) {
        onError && onError(error);
      });      
      break;
    default:
      console.log("Unhandled RequestType " + requestType);
      break;
  }
};

export default {
  
  getUsers(onSuccess, onError) {
    Backend.sendRequest(RequestType.GET, '/users', null, onSuccess, onError);
  },

  uploadCSVFile(selectedFile, onSuccess, onError) {
    const data = new FormData();
    data.append('csv-file', selectedFile);
    Backend.sendRequest(RequestType.POST, '/upload-file', data, onSuccess, onError);
  }
}