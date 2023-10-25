import { message as antdMessage, Form, Input, Button, Space, Row, Card, Col } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

export const EditPassword = (props: any) => {
    const { item } = props
    const [form] = Form.useForm()
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { t } = useTranslation();
    const abc = t('error_fill')

    if (item) {
        const { account_type } = item
        form.setFieldsValue({ type: account_type })
    }
    const onFinish = async (values: any) => {
        const param = {
            current_password: values.current_password, new_password: values.new_password,
        }
        if (values.new_password !== values.confim_password) {
            antdMessage.error(t("wrong_confirm_password"))
        } else {
            const key = 'updatable';
            antdMessage.loading({ content: t("loading"), key });
            setTimeout(() => {
                antdMessage.success({ content: t("success"), key, duration: 2 });
            }, 1000);
            let result = await ubusApi.config_system_password(param)

            const { code, status } = result

            if (code === 1)
                antdMessage.error(t("wrong_current_password"))
            else
                antdMessage.success(t("change_password_ok"))
        }
    }
    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <Card title={t("change_password")} type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }} form={form} onFinish={onFinish}>
                        <Form.Item name="current_password" label={t("current_password")} rules={[{ required: true, message: String(t("error_fill")) }]}>
                            <Space direction="horizontal">
                                <Input.Password
                                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item name="new_password" label={t("new_password")} rules={[{ required: true, message: String(t("error_fill")) }]}>
                            <Space direction="horizontal">
                                <Input.Password 
                                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item name="confim_password" label={t("confirm_new_password")} rules={[{ required: true, message: String(t("error_fill")) }]}>
                            <Space direction="horizontal">
                                <Input.Password />
                            </Space>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button htmlType="submit" type="primary" >{t("submit")}</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

