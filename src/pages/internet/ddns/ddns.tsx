import AntdLayout from '../../../components/antd/layout'
import { DDNS } from '../../../components/antd/internet/ddns/ddns'
import { Card, Col } from 'antd'

const Page = () => {
  return (
      <Col span={23}>
        <Card title="DDNS" type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
          <DDNS />
        </Card>
      </Col>
  )
}
export default Page
