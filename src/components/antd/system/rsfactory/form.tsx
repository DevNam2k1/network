import { Button, Modal, Card, Col, Space } from 'antd'
import React from 'react';
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

export const FactorySystem = (props: any) => {
    const { t } = useTranslation();

    const [showModal, setShowModal] = React.useState(false)

    const onShowModal = (group: any) => {
        setShowModal(true)
    }

    const onModalCancel = () => {
        setShowModal(false)
    }
    const onModalOk = () => {
        setShowModal(false)
    }

    const onFinish = async () => {
        const reboot = await ubusApi.config_system_rsfactory()
        setShowModal(false)
    }

    const onConfirm = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={500} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col md={23}>
                    <Card title={t('title_reset')} type="inner" headStyle={{ background: "#faad14"}}>
                        <Space size='large' >
                            <Button onClick={onModalCancel} >
                                {t("cancel")}
                            </Button>
                            <Button type="primary" danger onClick={onFinish} >
                                {t("factory_reset")}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t("factory_default")} type="inner" headStyle={{  background: "linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <span>{t("help_reset")}</span>
                {onConfirm()}
                <Button type="primary" danger onClick={onShowModal} >
                    {t("restore")}
                </Button>
            </Space>
        </Card>
    )
}
