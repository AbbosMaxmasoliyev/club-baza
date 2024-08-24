// http-common.js
import i18n from 'i18next';
import axios from 'axios'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess } from '../store/auth/sessionSlice'

const unauthorizedCode = [401]



// const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL || "https://passos-pro.up.railway.app/api/admin/v1/";
const instance = axios.create({
  baseURL: localStorage.getItem("prefix"),
  headers: {
    'Content-Type': 'application/json',
    'content-language': `${i18n.language}`,
  },
});

instance.interceptors.request.use(config => {

  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
  const persistData = deepParseJson(rawPersistData)

  const accessToken = persistData.auth.session.token

  if (accessToken) {
    config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  response => response,
  error => {

    const { response } = error

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess())
    }

    return Promise.reject(error)
  }
)
export default instance;
