import { WanSettings } from 'components/antd/internet/wan/wan'
import AntdLayout from 'components/antd/layout'
import React from 'react'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Card } from "antd"

const Page = () => {
  const { t } = useTranslation()
  return (
    <Card title={t('config_wan_setting')} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
      <WanSettings />
    </Card>
  )
}

export default Page