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
          <Card title={t("memory_usage")} size="small" style={{ textAlign: "center" }} headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
            <SystemMemoryInfoTable systemInfo={systemInfo} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t("internet_connection")} size="small" style={{ textAlign: 'center' }} headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
            <InternetStatus systemInfo={systemInfo} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
