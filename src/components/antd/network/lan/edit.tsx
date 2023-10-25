import { message as antdMessage, Form, Input, Button, message, Select, Card, Switch, Space, Col } from 'antd'
import { constants } from 'buffer'
import { access } from 'fs'
import React from 'react'
import { Await } from 'react-router-dom'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LanEdit = (props: any) => {
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let check1: any
    let check2: any
    const abc = t('error_fill')
    const { item, onDone, optionsParentInterface } = props
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    const refreshData = async () => {
        const uciLan = await ubusApi.show_network_lan_config()
        const uciDhcp = await ubusApi.show_network_dhcp_config()
        //const relay = await ubusApi.show_network_relay()

        const { ifname, ipaddr, proto, netmask, ip6addr } = uciLan?.values || ""
        const { leasetime } = uciDhcp?.values || ""
        const { start, limit, dhcpv4, dhcpv6 } = uciDhcp?.values || ""
        //const { modev4, modev6 } = relay
        const stop: number = Number.parseInt(start) + Number.parseInt(limit)
        if (ip6addr) {
            form.setFieldsValue({
                ifname: ifname, protov4: proto, ipaddrv4: ipaddr, netmaskv4: netmask, protov6: proto, ipaddrv6: ip6addr
            })
        } else {
            form.setFieldsValue({
                ifname: ifname, protov4: proto, ipaddrv4: ipaddr, netmaskv4: netmask, protov6: "none"
            })
        }
        form.setFieldsValue({ start: start, stop: stop, leasetime: leasetime, dhcpv4_status: (dhcpv4 === "server") ? true : false, dhcpv6_status: (dhcpv6 === "server") ? true : false })
    }

    React.useEffect(() => {
        refreshData()
    }, [])                                
    const [state, setState] = React.useState<boolean>()
    const onChangeIP = async (props: any) => {
        const form_ip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        if (props.target.defaultValue.match(form_ip)) {
            return true;
        }
    }
    const onFinish = async (values: any) => {
        const { dhcpv4_status, dhcpv6_status, dhcpv4_relay, dhcpv6_relay } = values
        if (dhcpv4_relay === dhcpv4_status && dhcpv4_status === true || dhcpv6_relay === dhcpv6_status && dhcpv6_status === true) {
            message.error(t('error_dhcp'))
        } else {
            const key = 'updatable';
            message.loading({ content: t('loading'), key });
            const config_ip = await ubusApi.config_network_lan(values.ifname, values.protov4, values.ipaddrv4, values.netmaskv4, values.protov6, values.ipaddrv6)
            if (dhcpv4_status === true || dhcpv6_status === true) {
                const config_dhcp = await ubusApi.config_network_dhcp((dhcpv4_status === true) ? "enable" : "disable", (dhcpv6_status === true) ? "enable" : "disable", values.start, values.end, values.leasetime)
            } else {
                const config_dhcp = await ubusApi.config_network_dhcp("disable", "disable", values.start, values.end, values.leasetime)
            }
            
            // if (dhcpv4_relay === true || dhcpv6_relay === true) {
            //     const config_relay = await ubusApi.config_network_relay((dhcpv4_relay === true) ? "enable" : "disable", (dhcpv6_relay === true) ? "enable" : "disable")
            // } else {
            //     const config_relay = await ubusApi.config_network_relay("disable", "disable")
            // }
            message.success({ content: t('success'), key, duration: 2 });
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
    }
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [value1, setValue1] = React.useState('')
    const handleChange1 = (value1: any) => setValue1(value1)
    const [value2, setValue2] = React.useState('')
    const handleChange2 = (value2: any) => setValue2(value2)

    return (
        // <Card title={t('config_lan_setting')} type='inner' hoverable headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    {/* <Col> */}
                    <Card title={t('ipv4_configure')} loading={loading} headStyle={{ background: "#eeeeee", }}>
                        <Form.Item label={t('interface_name')} name="ifname"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label={t('protocol')} name="protov4"
                        >
                            <Select
                                defaultValue={t('select_proto')}
                                onChange={handleChange1}
                                options={[
                                    {
                                        value: "none",
                                        label: t('none')
                                    },
                                    {
                                        value: "dhcp",
                                        label: "DHCP"
                                    },
                                    {
                                        value: "static",
                                        label: "Static"
                                    },
                                ]}
                            ></Select>
                        </Form.Item>
                        <Form.Item label={t('macaddr')} name="macaddr" hidden
                        >
                            <Input ></Input>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {
                                ({ getFieldValue }) =>
                                    getFieldValue('protov4') ==
                                        "static" ? (
                                        <>
                                            <Form.Item label={t('ip')} name="ipaddrv4"
                                                rules={[
                                                    { required: true, message: abc },
                                                    {
                                                    validator: (_, value) => {
                                                        check1 = value.split(".")
                                                        check2 = check1[check1.length - 1]
                                                        return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                                                    }
                                                    }
                                                ]}
                                            >
                                                <Input allowClear></Input>
                                            </Form.Item>
                                            <Form.Item label="Sub Netmask" name="netmaskv4"
                                                     rules={[
                                                        { required: true, message: abc },
                                                        {
                                                        validator: (_, value) => {
                                                            check1 = value.split(".")
                                                            check2 = check1[check1.length - 1]
                                                            return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                                                        }
                                                        }
                                                    ]}                               
                                            >
                                                <Input allowClear></Input>
                                            </Form.Item>
                                            <Form.Item label="MTU" name="mtu" hidden
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                            <Form.Item label={t('speed')} name="speed" hidden
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </>
                                    ) : null}
                        </Form.Item>
                        <Form.Item label={t('enable_dhcpv4_server')} name="dhcpv4_status" valuePropName="checked"
                        style={{ height: "auto", maxWidth: "200%", width: "768px" }}
                        >
                            {/* <Switch onChange={handleChange}></Switch> */}
                            <Switch
                                onChange={() =>setState(!state)}
                                checked={state}
                            />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {
                                ({ getFieldValue }) =>
                                    getFieldValue('dhcpv4_status') ==
                                        true ? (
                                        <>
                                            <Form.Item style={{ height: 30 }} label={t('dhcp_range')}>
                                                <Input.Group compact>
                                                    <Form.Item name="start">
                                                        <Input
                                                            type='number'
                                                            style={{
                                                                width: 100,
                                                                textAlign: 'center',
                                                            }}
                                                            placeholder="start"
                                                        />
                                                    </Form.Item>
                                                    <Input
                                                        className="site-input-split"
                                                        style={{
                                                            width: 30,
                                                            borderLeft: 0,
                                                            borderRight: 0,
                                                            pointerEvents: 'none',
                                                        }}
                                                        placeholder="~"
                                                        disabled
                                                    />
                                                    <Form.Item name="stop">
                                                        <Input
                                                            className="site-input-right"
                                                            style={{
                                                                width: 100,
                                                                textAlign: 'center',
                                                            }}
                                                            placeholder="Stop"
                                                        />
                                                    </Form.Item>
                                                </Input.Group>
                                            </Form.Item>
                                            <Form.Item label={t('leasetime')} name="leasetime"
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </>
                                    ) : null}
                        </Form.Item>
                    </Card>
                    <Card title={t('ipv6_configure')} loading={loading} headStyle={{ background: "#eeeeee", }} >
                        <Form.Item label={t('protocol')} name="protov6"
                        >
                            <Select
                                onChange={handleChange2}
                                options={[
                                    {
                                        value: "none",
                                        label: t('none')
                                    },
                                    {
                                        value: "static",
                                        label: "Static"
                                    },
                                    {
                                        value: "dhcp",
                                        label: "DHCP"
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
                                    getFieldValue('protov6') ==
                                        "static" ? (
                                        <Form.Item label={t('ipv6addr')} name="ipaddrv6"
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                    ) : null}
                        </Form.Item>
                        <Form.Item label={t('enable_dhcpv6_server')} name="dhcpv6_status" valuePropName="checked"
                        style={{ height: "auto", maxWidth: "200%", width: "768px" }}
                        >
                            <Switch></Switch>
                        </Form.Item>

                    </Card>
                    <Form.Item
                        wrapperCol={{ offset: 12, span: 16 }}
                    >
                        <Button
                            type='primary'
                            htmlType="submit"
                        >
                            {t('submit')}
                        </Button>
                    </Form.Item>
                </Space>
            </Form>

        // </Card>

    )
}
