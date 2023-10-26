import AntdLayout from '../../components/antd/layout'
import { Multicast_table } from '../../components/antd/network/multicast'
import { Card} from "antd"
import { useTranslation } from "react-i18next"
import "./../../translations/i18n"

const Page = () => {
  const { t } = useTranslation()
  return (
    <>
      <Card title={t('IGMP_List')} type="inner" headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
        <div style={{ overflowX: 'auto' }}>
        <Multicast_table />
        </div>
      </Card>
    </>
  )
}

export default Page
