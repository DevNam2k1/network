import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { message as antdMessage, Form, Input, Button, message, Select, Switch, Checkbox, Card } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useRef, useState } from 'react'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";


export const MeshTable = () => {
    const [form] = Form.useForm()
    let pattern = /^[a-zA-Z0-9_.]+$/
    const { t } = useTranslation()
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    const loadPWD = async () => {
        const result = await ubusApi.show_network_wireless()
        const mode_mesh = await ubusApi.show_mesh_config()

        if (mode_mesh['enabled_mode'] == "controller") {
            form.setFieldsValue({ enabled: true, mode: "controller", ssid: result['values']['ssid'], key: result['values']['key'] })
        } else if (mode_mesh['enabled_mode'] == "agent") {
            form.setFieldsValue({ enabled: true, mode: "agent", ssid: result['values']['ssid'], key: result['values']['key'] })
        } else {
            form.setFieldsValue({ enabled: false, ssid: result['values']['ssid'], key: result['values']['key'] })
        }
    }
    React.useEffect(() => { loadPWD() }, [])

    const onFinish = async (values: any) => {
        message.info(t('Please_wait_for_configuration'))
        if (values.mode == "controller") {
            const paramContro = await ubusApi.config_mesh_controller(values.enabled.toString(), values.ssid, values.key)
            console.log("controller", paramContro)
        } else {
            const paramAgent = await ubusApi.config_mesh_agent(values.enabled.toString())
            console.log("agent", paramAgent)
        }
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);

    }
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [value1, setValue1] = React.useState('')
    const handleChange1 = (value1: any) => setValue1(value1)
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Card loading={loading}>
                <Form.Item label={t("status")} valuePropName="checked" name="enabled">
                    <Switch onChange={handleChange1} />
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {
                        ({ getFieldValue }) =>
                            getFieldValue('enabled') ==
                                true ? (
                                <>
                                    <Form.Item label={t("mode")} name="mode" rules={[{ required: true, message: "" }]}
                                    >
                                        <Select
                                            defaultValue="Select Mode"
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "agent",
                                                    label: "Agent"
                                                },
                                                {
                                                    value: "controller",
                                                    label: "Controller"
                                                },
                                            ]}
                                        ></Select>
                                    </Form.Item>
                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                    >
                                        {
                                            ({ getFieldValue }) =>
                                                getFieldValue('mode') ==
                                                    "agent" ? (
                                                    <>
                                                        <Form.Item label={t("mesh_ssid")} name="ssid"
                                                        >
                                                            <Input disabled></Input>
                                                        </Form.Item>
                                                        <Form.Item label={t("wpa_passphrase")} name="key"
                                                        >
                                                            <Input.Password disabled></Input.Password>
                                                        </Form.Item>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Form.Item label={t("mesh_ssid")} name="ssid" 
                                                            rules={[
                                                                { required: true, message: String(t("error_fill")) },
                                                                {
                                                                    validator: (_, value) =>
                                                                    pattern.test(value) ? Promise.resolve() : Promise.reject(t('White_space_and_special_characters_are_not_valid'))
                                                                }
                                                            ]}
                                                        >
                                                            <Input></Input>
                                                        </Form.Item>
                                                        <Form.Item label={t("wpa_passphrase")} name="key" rules={[{ required: true, min : 8, message: String(t("Password_must_be_minimum_8_characters"))}]}
                                                        >
                                                            <Input.Password></Input.Password>
                                                        </Form.Item>
                                                    </>
                                                )}
                                    </Form.Item>
                                </>
                            ) : null}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        {t("submit")}
                    </Button>
                </Form.Item>
            </Card>
        </Form>
    )
}
