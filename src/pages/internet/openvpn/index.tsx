import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React, {useRef} from "react"
import { OpenVpnEdit } from 'components/antd/internet/openvpn/edit'
import { OpenVpnClientTable, ListCertificate } from 'components/antd/internet/openvpn/table'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [hihi, setHihi] = React.useState(null)
    const refreshData = async () => {
        const dataF = await ubusApi.show_network_openvpn()
        const keyData = Object.keys(dataF.values)
        const arrData: any = keyData.map(key => {
            const value = dataF.values[key]
            return value
        })
        setHihi(arrData)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [showCrt, setShowCrt] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(true)

    const onEditItem = (group: any) => {
        if (group.key) {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('controller')
        } else {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('agent')
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
    const optionSubnetmask = useRef([
        {
            value: "255.255.255.255",
            label: "255.255.255.255",
        },
        {
            value: "255.255.255.254",
            label: "255.255.255.254",
        },
        {
            value: "255.255.255.252",
            label: "255.255.255.252",
        },
        {
            value: "255.255.255.248",
            label: "255.255.255.248",
        },
        {
            value: "255.255.255.240",
            label: "255.255.255.240",
        },
        {
            value: "255.255.255.224",
            label: "255.255.255.224",
        },
        {
            value: "255.255.255.192",
            label: "255.255.255.192",
        },
        {
            value: "255.255.255.128",
            label: "255.255.255.128",
        },
        {
            value: "255.255.255.0",
            label: "255.255.255.0",
        },
        {
            value: "255.255.254.0",
            label: "255.255.254.0",
        },
        {
            value: "255.255.252.0",
            label: "255.255.252.0",
        },
        {
            value: "255.255.248.0",
            label: "255.255.248.0",
        },
        {
            value: "255.255.240.0",
            label: "255.255.240.0",
        },
        {
            value: "255.255.224.0",
            label: "255.255.224.0",
        },
        {
            value: "255.255.192.0",
            label: "255.255.192.0",
        },
        {
            value: "255.255.128.0",
            label: "255.255.128.0",
        },
        {
            value: "255.255.0.0",
            label: "255.255.0.0",
        },
        {
            value: "255.254.0.0",
            label: "255.254.0.0",
        },
        {
            value: "255.252.0.0",
            label: "255.252.0.0",
        },
        {
            value: "255.248.0.0",
            label: "255.248.0.0",
        },
        {
            value: "255.240.0.0",
            label: "255.240.0.0",
        },
        {
            value: "255.224.0.0",
            label: "255.224.0.0",
        },
        {
            value: "255.192.0.0",
            label: "255.192.0.0",
        },
        {
            value: "255.128.0.0",
            label: "255.128.0.0",
        },
        {
            value: "255.0.0.0",
            label: "255.0.0.0",
        },
        {
            value: "254.0.0.0",
            label: "254.0.0.0",
        },
        {
            value: "252.0.0.0",
            label: "252.0.0.0",
        },
        {
            value: "248.0.0.0",
            label: "248.0.0.0",
        },
        {
            value: "240.0.0.0",
            label: "240.0.0.0",
        },
        {
            value: "224.0.0.0",
            label: "224.0.0.0",
        },
        {
            value: "192.0.0.0",
            label: "192.0.0.0",
        },
        {
            value: "128.0.0.0",
            label: "128.0.0.0",
        },

    ]).current;

    const onShowCert = (name: any) => {
        setShowCrt(name);
    };

    const onCertCancel = () => {
        setShowCrt(false)
        setItem(null)
    }
    const onCertOk = () => {
        setShowCrt(false)
    }
    const onCertDone = () => {
        setShowCrt(false)
        setItem(null)
    }

    const onEditNetwork = (params: any) => {
        setItem(Object.assign({}, params))
        setIsModalOpen(params);
    }

    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('openvpn_configure')} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                        <OpenVpnEdit item={item}
                            onDone={onDone} value={value} optionSubnetmask={optionSubnetmask} handleChange={handleChange} />
                    </Card>
                </Col>
            </Modal>
        )
    }

    const showModalCert = () => {
        if (!showCrt) {
            return null
        }
        return (
            <Modal open={true} onCancel={onCertCancel} onOk={onCertOk} footer={null} width={1000}>
                <Col span={23}>
                    <Card title={t('certificates_management')} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                        <ListCertificate dataTable={hihi}
                            onDone={onCertDone} value={value} handleChange={handleChange} />

                    </Card>
                </Col>
            </Modal>
        )
    }

    return (
        <Card title={t('openvpn_list')} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <div style={{ overflowX: 'auto' }}>         
            <OpenVpnClientTable
                dataTable={hihi}
                onEditItem={onEditItem} />
            </div>   
            {showModalContent()}
            <Space>
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
                {showModalCert()}
                <Button htmlType="button" type="default" style={{ "background": "coral", "color" : "white" }} onClick={onShowCert}>
                    {t('certificate_list')}
                </Button>
            </Space>
        </Card>
    )
}
export default Page
