import { Button, Modal, Card, Space, Col } from 'antd'
import React from 'react';
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

export const ShutdownSystem = (props: any) => {
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
        const shutdown = await ubusApi.config_system_shutdown()
        setShowModal(false)
    }

    const onConfirm = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={500} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col md={23}>
                    <Card title={t('title_shutdown')} type="inner" headStyle={{ background: "#faad14"}}>
                        <Space size='large' >
                            <Button onClick={onModalCancel} >
                                {t("cancel")}
                            </Button>
                            <Button type="primary" danger onClick={onFinish} >
                                {t("shutdown")}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t("shutdown")} type="inner" headStyle={{ background: "linear-gradient(45deg, #07117e, #07117e", color: 'white', }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                {/* <span>{t("help_reset")}</span> */}
                {onConfirm()}
                <Button type="primary" danger onClick={onShowModal} >
                    {t("shutdown")}
                </Button>
            </Space>
        </Card>
    )
}