import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { VlanEdit } from 'components/antd/network/vlan/edit'
import { VlanTable, VlanTable1 } from 'components/antd/network/vlan/table'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const optionsParentInterface = [
        { value: "lan1", label: "lan1", },
        { value: "lan2", label: "lan2", },
        { value: "wlan0", label: "wlan0", },
        { value: "wlan1", label: "wlan1", },
    ]

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [hihi, setHihi] = React.useState(null)
    const [haha, setHaha] = React.useState(null)

    const refreshData = async () => {
        const dataF = await ubusApi.show_network_vlan()
        setHihi(dataF.access)
        setHaha(dataF.trunk)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

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
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('vlan_configure')} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                        <VlanEdit optionsParentInterface={optionsParentInterface} item={item}
                            onDone={onDone} value={value} handleChange={handleChange} />

                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Card title="Vlan Access" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                    <div style={{ overflowX: 'auto' }}>
                    <VlanTable
                        hihi={hihi}
                        onEditItem={onEditItem}
                    />
                    </div>
                </Card>
                {showModalContent()}
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
            </Space>
        </>
    )
}
export default Page
