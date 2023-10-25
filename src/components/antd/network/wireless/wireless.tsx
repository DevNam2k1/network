import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Checkbox, Switch, Card } from 'antd'
import React, { useState, useRef } from 'react';
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

export const Wireless = (props: any) => {
    const { t } = useTranslation();
    let pattern = /^[a-zA-Z0-9_.]+$/
    const [status, setDisabled] = React.useState("")
    const [checked, setChecked] = React.useState("")
    const [encryption, setEncryption] = React.useState([])
    const [pwd, setPWD] = React.useState(null)

    const optionStatusGuest = useRef([
        {
            label: "Enable",
            value: "false"
        },
        {
            label: "Disable",
            value: "true"
        },
    ]).current;

    const optionGuestEncryption = useRef([
        {
            label: "None",
            value: "none"
        },
        {
            label: "PSK2",
            value: "psk2"
        },
        {
            label: "PSK",
            value: "psk"
        },
    ]).current;

    const [form] = Form.useForm()

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    }

    const optionUnit = useRef([
        {
            label: "Kbit",
            value: "kbit"
        },
        {
            label: "Mbit",
            value: "mbit"
        },
    ]).current;

    const refreshData = async () => {
        const result = await ubusApi.show_network_wireless()
        const result1 = await ubusApi.show_mesh_config()
        const { disabled, encryption, ssid, key } = result.values
        const { enabled_mode } = result1
        if(enabled_mode === "controller" || enabled_mode === "agent"){
            setChecked("enable")
        }
        else{
            setChecked("disable")
        }

        if (disabled === "0") {
            setDisabled("false")
        } else {
            setDisabled("true")
        }

        if (disabled === "0") {
            form.setFieldsValue({ disabled: "false", ssid: ssid, encryption: encryption, key: key, checklimit: true })
        } else {
            form.setFieldsValue({ disabled: "true", ssid: ssid, encryption: encryption, key: key, checklimit: true })
        }
    }

    React.useEffect(() => {
        refreshData()
    }, [])

    const handleSubmit = async (values: any) => {
        message.info(t('Please_wait_for_configuration'))
        if (values.checklimit === true) {
            const result = await ubusApi.config_network_wireless(values.disabled, values.ssid, values.encryption, values.key)
        } else {
            const result = await ubusApi.config_network_wireless(values.disabled, values.ssid, values.encryption, values.key)
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
    const handleChange1 = (value: any) => setValue1(value)
    const handleChangeStatus = (value: any) => setDisabled(value)
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    if (status == "false") {
        if(checked == "disable"){
            return (
                <>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        form={form} 
                        onFinish={handleSubmit}>
                        <Card loading={loading}>
                            <Form.Item name="disabled"
                                label={t("status")} rules={[{ required: true, message:  String(t("error_fill")) }]}
                            >
                                <Select
                                    options={optionStatusGuest}
                                    onChange={handleChangeStatus}
                                />
                            </Form.Item>
                            <Form.Item name="ssid"
                                label={t("ssid_name")}
                                rules={[
                                    { required: true, message:  String(t("error_fill")) },
                                    {
                                        validator: (_, value) =>
                                            pattern.test(value) ? Promise.resolve() : Promise.reject(t('White_space_and_special_characters_are_not_valid'))
                                    }
                                ]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name="encryption"
                                label={t("encryption_type")} rules={[{ required: true, message:  String(t("error_fill")) }]}
                            >
                                <Select
                                    defaultValue="Select Encryption"
                                    options={optionGuestEncryption}
                                    onChange={handleChange1}
                                />
                            </Form.Item>
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                            >
                                {
                                    ({ getFieldValue }) =>
                                        getFieldValue('encryption') !=
                                            "none" ? (
                                            <Form.Item name="key"
                                                label={t("wpa_passphrase")} rules={[{ required: true, min: 8, message: String(t("Password_must_be_minimum_8_characters")) }]}
                                            >
                                                <Input.Password></Input.Password>
                                            </Form.Item>
                                        ) : null}
                            </Form.Item>

                            <Form.Item {...formItemLayoutWithOutLabel} wrapperCol={{ offset: 6, span: 16 }}>
                                <Button
                                    type='primary'
                                    htmlType="submit"
                                >
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Card>
                    </Form>
                </>
            )
        }
        else{

            return (
                <>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        form={form} 
                        onFinish={handleSubmit}>
                        <Card loading={loading}>
                            <Form.Item name="disabled"
                                label={t("status")} rules={[{ required: true, message:  String(t("error_fill")) }]}
                            >
                                <Select
                                    options={optionStatusGuest}
                                    onChange={handleChangeStatus}
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item name="ssid"
                                label={t("ssid_name")}
                                rules={[
                                    { required: true, message:  String(t("error_fill")) },
                                    {
                                        validator: (_, value) =>
                                            pattern.test(value) ? Promise.resolve() : Promise.reject('White space and special characters are not valid')
                                    }
                                ]}
                            >
                                <Input disabled></Input>
                            </Form.Item>
                            <Form.Item name="encryption"
                                label={t("encryption_type")} rules={[{ required: true, message:  String(t("error_fill")) }]}
                            >
                                <Select
                                    defaultValue="Select Encryption"
                                    options={optionGuestEncryption}
                                    onChange={handleChange1}
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                            >
                                {
                                    ({ getFieldValue }) =>
                                        getFieldValue('encryption') !=
                                            "none" ? (
                                            <Form.Item name="key"
                                                label={t("wpa_passphrase")} rules={[{ required: true, min: 8, message: "Password must be minimum 8 characters" }]}
                                            >
                                                <Input.Password disabled ></Input.Password>
                                            </Form.Item>
                                        ) : null}
                            </Form.Item>

                            <Form.Item {...formItemLayoutWithOutLabel} wrapperCol={{ offset: 6, span: 16 }}>
                                <Button
                                    type='primary'
                                    htmlType="submit"
                                >
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Card>
                    </Form>
                </>
            )
        }
    } 
    else {
        return (
            <>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    form={form} 
                    onFinish={handleSubmit}>
                    <Form.Item name="disabled"
                        label={t("status")}
                    >
                        <Select
                            options={optionStatusGuest}
                            onChange={handleChangeStatus}
                        />
                    </Form.Item>

                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button
                            type='primary'
                            htmlType="submit"
                        >
                            {t("submit")}
                        </Button>
                    </Form.Item>
                </Form>
            </>)
    }
}