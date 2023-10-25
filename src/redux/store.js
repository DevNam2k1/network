import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducer"

const rootStore = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware({ serializableCheck: false })
  //     .concat(myMiddleware)
  // }
})

export default rootStore