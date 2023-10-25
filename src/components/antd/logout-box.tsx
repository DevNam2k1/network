import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

export const Logout = (props:any) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const onLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('theme')
    sessionStorage.removeItem('menu')
    window.location.href = '/'
  }
    return (
      <Button type="primary" danger onClick={onLogout} >
          {t("logout")}
      </Button>
    )
}
