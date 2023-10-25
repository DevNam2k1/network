import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal } from "antd"
import React from "react"
import { MeshTable } from 'components/antd/network/mesh/mesh'
import { MeshTopo } from 'components/antd/network/mesh/mesh_topo';
import "../../../translations/i18n";
import { useTranslation } from "react-i18next"

const Page = () => {
  const {t} = useTranslation()
  const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000);
  return (
    <Card>
      <Card title={t("Global_Configuration")} type="inner" headStyle={{ background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))", color: 'white' }}>
        <MeshTable />
      </Card>
      <Card loading={loading} title={t("Mesh_Topo_Information")} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))", color: 'white' }}>
        <div style={{ overflowX: 'auto' }}>
          <MeshTopo />
        </div>
      </Card>
    </Card>
    
  )
}

export default Page
