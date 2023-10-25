import { useDispatch, useSelector } from 'react-redux'
import { appStateActions, appStateSelector } from '../../redux/reducer/appStateSlice'

const { Switch } = require('antd')

export const ThemeSwitch = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector(appStateSelector)
  const mode = sessionStorage.getItem("theme")
  if (mode === "") {
    sessionStorage.setItem("theme", "dark")
  }
  const onChange = () => {
    dispatch(appStateActions.toggleTheme())
    sessionStorage.setItem("theme", theme)
  }
  // 🌞 🌗 🌜
  return <Switch checked={theme === 'dark'} onChange={onChange} checkedChildren={'🌜'} unCheckedChildren={'🌞'} />
}

