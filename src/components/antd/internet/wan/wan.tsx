
import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Checkbox, Switch, Card , SelectProps} from 'antd'
import React, { useState, useRef } from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { current } from '@reduxjs/toolkit'

export const WanSettings = (props: any) => {
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let check1: any
    let check2: any
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    // const [protov4, setProtov4] = React.useState("")
    // const [protov6, setProtov6] = React.useState("")
    // const [ipaddrv4, setIpaddrv4] = React.useState("")
    // const [netmaskv4, setNetmaskv4] = React.useState(null)
    // const [gtwv4, setGtwv4] = React.useState(null)
    // const [ipaddrv6, setIpaddrv6] = React.useState(null)
    // const [gtwv6, setGtwv6] = React.useState(null)

    const optionStatusWan = useRef([
        {
            label: t('enable'),
            value: "enable"
        },
        {
            label: t('disable'),
            value: "disable"
        },
    ]).current;

    const optionProtoWanv4 = useRef([
        {
            label: t('none'),
            value: "none"
        },
        {
            label: "DHCP",
            value: "dhcp"
        },
        {
            label: "Static",
            value: "static"
        },
        {
            label: "PPPOE",
            value: "pppoe"
        },
    ]).current;

    const optionProtoWanv6 = useRef([
        {
            value: "none",
            label: t('none'),
        },
        {
            value: "dhcpv6",
            label: "DHCP",
        },
        {
            value: "static",
            label: "Static",
        },
    ]).current;

    const refreshData = async () => {
        const result = await ubusApi.show_network_wan_congfig()
        const { gateway, ipaddr, netmask, proto, username, password, timeout } = result['wan'][0]['values']
        const { ip6addr, ip6gw } = result['wan_6'][0]['values']
        const protov6  = result['wan_6'][0]['values']['proto']

        //console.log("data: ",protov6)
        if (proto == "static") {
            if (ipaddr == null) {
                // setProtov4("none")
                if (protov6 == "static") {
                    if (ip6addr == null) {
                        if (proto == "pppoe") {
                            form.setFieldsValue({ protov4: "pppoe", protov6: "none", username: username, password: password, timeout: timeout })
                        } else {
                            // setProtov6("none")
                            form.setFieldsValue({ protov4: "none", protov6: "none" })
                        }
                    } else {
                        // setProtov6("static")
                        // form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: protov4, protov6: "none", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        form.setFieldsValue({ protov4: "none", protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                } else {
                    // setProtov6(protov6)
                    form.setFieldsValue({ protov4: "none", protov6: protov6 })
                }
            } else {
                // setProtov4(proto)
                if (protov6 == "static") {
                    if (ip6addr == null) {
                        // setProtov6("none")
                        if (proto == "pppoe") {
                            form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "none" })
                        }
                        else {
                            form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "none" })
                        }
                        //form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "none" })
                    } else {
                        if (proto == "pppoe") {
                            form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        }
                        else {
                            // setProtov6(protov6)
                            form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        }
                    }
                } else {
                    if (proto == "pppoe") {
                        // setProtov6(protov6)
                        form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: protov6, ipaddrv6: ip6addr, gtwv6: ip6gw })
                    } else {
                        form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: protov6, ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                }
            }
        } else {
            // setProtov4(proto)
            if (protov6 == "static") {
                if (ip6addr == null) {
                    // setProtov6("none")
                    if (proto == "pppoe") {
                        form.setFieldsValue({ protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "none" })
                    }
                    form.setFieldsValue({ protov4: proto, username: username, password: password, timeout: timeout, protov6: "none" })
                } else {
                    // setProtov6("static")
                    // form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: protov4, protov6: "none", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    if (proto == "pppoe") {
                        form.setFieldsValue({ protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    } else {
                        form.setFieldsValue({ protov4: proto, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                }
            } else {
                // setProtov6(protov6)
                if (proto == "pppoe") {
                    form.setFieldsValue({ protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: protov6 })
                } else {
                    form.setFieldsValue({ protov4: proto, protov6: protov6 })
                }
            }
        }

        // if (protov6 == "static") {
        //     if (ip6addr == null) {
        //         setProtov6("none")
        //     } else {
        //         setProtov6(protov6)
        //     }
        // } else {
        //     setProtov6(protov6)
        // }

    }
    React.useEffect(() => { refreshData() }, [])

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
    // const refreshData = async () => {
    // }
    // React.useEffect(() => {
    //     refreshData()
    // }, [])
    const handleSubmit = async (values: any) => {
        message.info(t('Please_wait_for_configuration'))
        // if (values.protov4 === "none") {
        //     const result = await ubusApi.config_network_wan()
        //     console.log("result: ", result)
        // } else {
        //     const result = await ubusApi.config_network_wan(values.disabled, values.ssid, values.encryption, values.key, null, null)
        //     console.log("result: ", result)
        // }
        //const resultpppoe = await ubusApi.config_network_ppoe(values.protov4, values.username, values.password, values.timeout)
        if (values.protov6 == "DHCP"){
            values.protov6="dhcpv6"
        }

        const result = await ubusApi.config_network_wan(values.protov4, values.username, values.password, values.timeout, values.ipaddrv4, values.netmaskv4, values.gtwv4, values.protov6, values.ipaddrv6, values.gtwv6)     
        console.log("result: ", result)
        values.protov6=""
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const slectport: SelectProps['options'] = [];
    for (let i = 10; i < 120; i++) {
        slectport.push({
            value: i,
            label: i,
        });
    }
    const [valuev4, setValuev4] = React.useState('')
    const handleChangev4 = (value: any) => setValuev4(value)
    const [valuev6, setValuev6] = React.useState('')
    const handleChangev6 = (value: any) => setValuev6(value)
    // console.log("valuev4: ", valuev4)

    return (
        // <>
        <Form form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Card title="IPV4" loading={loading}>
                    <Form.Item name="protov4" label={t('protocol')}
                    >
                        <Select
                            onChange={handleChangev4}
                            options={optionProtoWanv4}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('protov4') ==
                                    'pppoe' ? (
                                    <>
                                        <Form.Item name="username"
                                             label={t('username')} 
                                             rules={[
                                                { required: true, message: String(t("error_fill"))  },
                                                {
                                                    validator: (_, value) =>
                                                        pattern.test(value) ? Promise.resolve() : Promise.reject(t('White_space_and_special_characters_are_not_valid'))
                                                }
                                            ]}
                                        >
                                            <Input allowClear></Input>
                                        </Form.Item>
                                        <Form.Item name="password"
                                            label={t('password')} rules={[{ required: true, min: 6, message: String(t("Password_must_be_minimum_6_characters")) }]}
                                        >
                                            <Input.Password></Input.Password>
                                        </Form.Item>
                                        <Form.Item name="timeout"
                                            label={t('timeout')} 
                                        >  
                                        <Input></Input>
                                        </Form.Item>
                                    </>
                                ) : null
                        }
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('protov4') ==
                                    'static' ? (
                                    <>
                                        <Form.Item name="ipaddrv4"
                                            label={t('ip')} 
                                            rules={[
                                                { required: true, message: String(t("error_fill")) },
                                                {
                                                    validator: (_, value) => {
                                                      check1 = value.split(".")
                                                      check2 = check1[check1.length - 1]
                                                      return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input allowClear ></Input>
                                        </Form.Item>
                                        <Form.Item name="netmaskv4"
                                            label="Netmask"
                                            rules={[
                                                { required: true, message: String(t("error_fill")) },
                                                {
                                                    validator: (_, value) => {
                                                      check1 = value.split(".")
                                                      check2 = check1[check1.length - 1]
                                                      return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input allowClear ></Input>
                                        </Form.Item>
                                        <Form.Item name="gtwv4"
                                            label="Gateway"
                                            rules={[
                                                { required: true, message: String(t("error_fill")) },
                                                {
                                                    validator: (_, value) => {
                                                      check1 = value.split(".")
                                                      check2 = check1[check1.length - 1]
                                                      return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input allowClear ></Input>
                                        </Form.Item>
                                    </>
                                ) : null
                        }
                    </Form.Item>

                </Card>
                <Card title="IPV6" loading={loading}>
                    <Form.Item name="protov6"
                        label={t('protocol')}
                    >
                        <Select
                            onChange={handleChangev6}
                            options={optionProtoWanv6}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('protov6') ==
                                    'static' ? (
                                    <>
                                        <Form.Item name="ipaddrv6"
                                            label={t('ip')}
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                        <Form.Item name="gtwv6"
                                            label="Gateway"
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                    </>
                                ) : null}
                    </Form.Item>
                </Card>
                <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        {t('submit')}
                    </Button>
                </Form.Item>
            </Space>
        </Form>
        // </>
    )
}

