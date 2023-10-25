import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sessionActions, sessionSelector } from '../redux/reducer/sessionSlice'
import ubusApi from '../service/api/ubus-api'

/**
 * Headless component keeping session alive by periodically calling ubus
 * @param {*} props
 * @returns
 */
export const SessionKeepAlive = (props:any) => {
  const { interval = 10 } = props
  const dispatch = useDispatch()
  const { session } = useSelector(sessionSelector)
  const beatFunc = async () => {
    dispatch(sessionActions.keepAliveBeat())
    updateSystemInfo()
  }
  const updateSystemInfo = async () => {
    const result = await ubusApi.systemInfo()
    if (result?.code === 0) {
      dispatch(sessionActions.updateSystemInfo(result?.data))
    }
  }
  React.useEffect(() => {
    const handle = setInterval(beatFunc, interval * 1000)
    return () => clearInterval(handle)
  }, [])

  React.useEffect(() => {
    beatFunc()
  }, [session])
  return null
}
