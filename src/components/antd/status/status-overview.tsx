import { Typography, Row, Col, Card } from 'antd'
import { SystemGeneralInfoTable, SystemMemoryInfoTable, InternetStatus, InfoInterface } from './system-info'
import { useSelector } from 'react-redux'
import { sessionSelector } from '../../../redux/reducer/sessionSlice'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

export const StatusOverview = () => {
  const { systemInfo } = useSelector(sessionSelector)
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={2}></Col>
        <Col span={20}>
          <SystemGeneralInfoTable systemInfo={systemInfo} />
          <InfoInterface systemInfo={systemInfo} />
        </Col>
      </Row>
      <br></br>
      <Row gutter={[24, 0]} >
        <Col span={12}>
          <Card title={t("memory_usage")} size="small" style={{ textAlign: "center" }} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <SystemMemoryInfoTable systemInfo={systemInfo} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t("internet_connection")} size="small" style={{ textAlign: 'center' }} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <InternetStatus systemInfo={systemInfo} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
