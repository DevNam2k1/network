import AntdLayout from '../../components/antd/layout'
import { Multicast_table } from '../../components/antd/network/multicast'
import { Card} from "antd"
import { useTranslation } from "react-i18next"
import "./../../translations/i18n"

const Page = () => {
  const { t } = useTranslation()
  return (
    <>
      <Card title={t('IGMP_List')} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
        <div style={{ overflowX: 'auto' }}>
        <Multicast_table />
        </div>
      </Card>
    </>
  )
}

export default Page
