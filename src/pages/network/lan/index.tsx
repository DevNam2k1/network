import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Row } from "antd"
import React from "react"
import { LanEdit } from 'components/antd/network/lan/edit'
import { LanTable } from 'components/antd/network/lan/table'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [dhcpdata, SetDhcpData] = React.useState(null)
    const refreshData = async () => {
        const dataF = await ubusApi.show_network_dhcp_leases()
        SetDhcpData(dataF.leases)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    //Fake call Api

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const onEditItem = (group: any) => {
        if (group.name) {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('access')
        } else {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('trunk')
        }
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
            <Modal width={900} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <LanEdit item={item}
                        onDone={onDone} value={value} handleChange={handleChange} />

                </Col>
            </Modal>
        )
    }
    return (
        <div>
            <Row gutter={[24, 10]}>
                <Col span={12}>
                <Card title={t('config_lan_setting')} type='inner' hoverable headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
                    <div style={{ overflowX: 'auto' }}>
                    <LanEdit item={item}
                        onDone={onDone} value={value} handleChange={handleChange} />
                    </div>
                </Card>
                </Col>
                <br></br>
                <Col span={12}>
                    <Card title={t('allocated')} type='inner' headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
                        <div style={{ overflowX: 'auto' }}>   
                        <LanTable
                            data1={dhcpdata}
                        ></LanTable>
                        </div>
                    </Card>
                </Col>
                {showModalContent()}
            </Row>
        </div>

    )
}
export default Page
