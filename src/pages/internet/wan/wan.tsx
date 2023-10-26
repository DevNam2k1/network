import { WanSettings } from 'components/antd/internet/wan/wan'
import AntdLayout from 'components/antd/layout'
import React from 'react'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Card } from "antd"

const Page = () => {
  const { t } = useTranslation()
  return (
    <Card title={t('config_wan_setting')} headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
      <WanSettings />
    </Card>
  )
}

export default Page