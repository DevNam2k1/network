import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_UBUS_SESSION = '0000000000000000000000000000000'

const initialState = {
  session: DEFAULT_UBUS_SESSION,
  username: '',
  timeout: 300,
  expires: 300,
  keepAliveBeatCounter: 0,
  systemInfo: {},
  acls: {},
}

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      const { ubus_rpc_session, timeout, expires, acls, data } = payload
      state.session = ubus_rpc_session
      state.timeout = timeout
      state.expires = expires
      state.acls = acls
      state.username = data.username
    },
    logout: () => {
      return initialState
    },
    updateSystemInfo: (state, { payload }) => {
      state.systemInfo = payload
    },
    keepAliveBeat: (state) => {
      state.keepAliveBeatCounter = state.keepAliveBeatCounter + 1
    }
  },
})

export const sessionActions = slice.actions
export const sessionSelector = (state:any) => state.session
export default slice.reducer
