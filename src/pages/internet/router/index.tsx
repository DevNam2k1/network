import { Button, Card, Col, Modal, Typography ,Space} from "antd"
import { RouterEdit } from "components/antd/internet/router/edit"
import { RouterTable , Router2Table } from "components/antd/internet/router/table"
import AntdLayout from "components/antd/layout"
import React from "react"
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const { Title, Paragraph, Text, Link } = Typography;
const Page = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)
    //const [data1, setData1] = React.useState(null)
    const [data2, setData2] = React.useState(null)
    const [data32, setData32] = React.useState(null);
    const [route_wan, setRoute_wan] = React.useState(null)
    const [route_lan, setRoute_lan] = React.useState(null)
 
    const refreshData = async () => {
        const data = await ubusApi.show_network_routing("net")
        //const dataF = await ubusApi.show_network_routing("net6")
        const dataF1 = await ubusApi.show_network_routing("static")
        const dataF4 = await ubusApi.show_network_routing("default_route")
        const dataF3 = await ubusApi.show_web_data("32")
        setData(data.route_net)
        // setData1(dataF.route_net6)
        setData2(dataF1.static_routing)
        setData32(dataF3.data)
        setRoute_wan(dataF4.default_route_wan[0])
        setRoute_lan(dataF4.default_route_lan)

    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const onEditItem = (group: any) => {
        setItem(Object.assign({}, group))
        setShowModal(true)
    }
    const onCreateItem = (group: any) => {
        setItem({} as any)
        setShowModal(true)
    }
    const onModalCancel = () => {
        setShowModal(false)
        setItem(null)
    }
    const onModalOk = () => {
        setShowModal(false)
    }
    const onDone = () => {
        setShowModal(false)
        setItem(null)
    }

    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('route_configure')} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                        <RouterEdit item={item} route_wan ={route_wan} route_lan={route_lan}
                            data32={data32} 
                        onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
            <Card title={t('route_list')} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                <div style={{ overflowX: 'auto' }}>
                    <Router2Table
                        haha={data2}
                        onEditItem={onEditItem}
                    />
                </div>
            {showModalContent()}
            <Button type="primary" onClick={onCreateItem} >
                {t('create')}
            </Button>
            </Card>
            <Card title={t('route_list_IPv4')} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                <div style={{ overflowX: 'auto' }}>
                    <RouterTable
                        hihi={data}
                        onEditItem={onEditItem}
                    />
                </div>
            {showModalContent()}
            {/* <Button type="primary" onClick={onCreateItem} >
                {t('create')}
            </Button> */}
            </Card>
        </Space>
    )
}
export default Page
