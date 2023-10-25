import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'dark', // dark | light
  sideBarCollapsed: false,
}

const slice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    selectTheme: (state, { payload }) => {
      state.theme = payload
    },
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark'
      } else {
        state.theme = 'light'
      }
    },
    toggleSideBarCollapsed: (state) => {
      state.sideBarCollapsed = !state.sideBarCollapsed
    },
    setSideBarCollapsed: (state, { payload }) => {
      state.sideBarCollapsed = payload
    },
  },
})

export const appStateActions = slice.actions
export const appStateSelector = (state:any) => state.appState
export default slice.reducer
