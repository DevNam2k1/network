
import { message as antdMessage, Form, Input, Button, message, Select, InputNumber } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PortForwardEdit = (props: any) => {
    let pattern = /^[a-zA-Z0-9_.]+$/
    let pattern1 = /^([-]?[1-9][0-9]*|0)$/
    let patternIpv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let check1: any
    let check2: any
    const { item, onDone, value, handleChange, optionsParentInterface } = props
    const [form] = Form.useForm()
    const {t} = useTranslation()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const {
                anonymous,
                name,
                proto,
                wanip,
                wanport,
                lanip,
                lanport,
            } = item
            form.setFieldsValue({
                name,
                status: "enable",
                protocol: proto,
                wan_ip: wanip,
                wan_port: wanport,
                lan_ip: lanip,
                lan_port: lanport,
            })
        }
    }

    React.useEffect(() => {
        refreshData()
    }, [])
    const refreshPage = ()=>{
        window.location.reload()
    }
    function randomName(length: number) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
    const onFinish = async (values: any) => {
        const param = {
            name: values.name, status: values.status, protocol: values.protocol, wan_ip: values.wan_ip,
            wan_port: values.wan_port, lan_ip: values.lan_ip, lan_port: values.lan_port,
        }
        message.info(t('Please_wait_for_configuration'))
        if (values.name == null ) {
            const nat = await ubusApi.config_network_nat("enable",randomName(4) , values.protocol, values.wan_ip, values.wan_port, values.lan_ip, values.lan_port)
            const key = 'updatable';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.success({ content: t('success'), key, duration: 2 });
            }, 1000);
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
        else{
        const nat = await ubusApi.config_network_nat("enable", values.name, values.protocol, values.wan_ip, values.wan_port, values.lan_ip, values.lan_port)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
        }
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('name')} name="name" hidden
            >
                <Input defaultValue=""></Input>
            </Form.Item>
            <Form.Item label={t('protocol')} name="protocol" rules={[{ required: true, message: String(t("error_fill")) }]}
            >
                <Select
                    defaultValue={t('select_proto')}
                    options={[
                        {
                            value: "tcp",
                            label: "TCP"
                        },
                        {
                            value: "udp",
                            label: "UDP"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item  label={t('wan_ip')} name="wan_ip"
                rules={[
                    { required: true, message: String(t("error_fill")) },
                    {    
                    validator: (_, value, callback) => {
                        if(value=== undefined){
                            callback();
                        }
                        else{
                        check1 = value.split(".")
                        check2 = check1[check1.length - 1]
                        return Number(check2) < 256 && patternIpv4.test(value) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                        }
                    }
                    }
                ]}
            >
            <Input placeholder="192.168.1.1" allowClear ></Input>
            </Form.Item>
            <Form.Item  label={t('wan_port')} name="wan_port"
                rules={[
                    { required: true, message: String(t("error_fill")) },
                    {
                        validator: (_, values) =>
                            values > 65535 || values < 1 ? Promise.reject(t('Port_could_not_be_larger_than_65535')) : Promise.resolve()
                    },
                    {
                        validator: (_, value) =>
                        pattern1.test(value) ? Promise.resolve() : Promise.reject()
                    }
                ]}
            >
            <Input  placeholder="1-65535" ></Input>
            </Form.Item>
            <Form.Item label={t('lan_ip')} name="lan_ip"
                rules={[
                    { required: true, message: String(t("error_fill")) },
                    {    
                    validator: (_, value, callback) => {
                        if(value=== undefined){
                            callback();
                        }
                        else{
                        check1 = value.split(".")
                        check2 = check1[check1.length - 1]
                        return Number(check2) < 256 && patternIpv4.test(value) ? Promise.resolve() : Promise.reject(t('Error_Ip_address'))
                        }
                    }
                    }
                ]}
            >
                <Input placeholder="192.168.1.1" allowClear></Input>
            </Form.Item>
            <Form.Item label={t('lan_port')} name="lan_port"
                rules={[
                    { required: true, message: String(t("error_fill")) },
                    {
                        validator: (_, values) =>
                            values > 65535 || values < 1 ? Promise.reject(t('Port_could_not_be_larger_than_65535')) : Promise.resolve()
                    },
                    {
                        validator: (_, value) =>
                        pattern1.test(value) ? Promise.resolve() : Promise.reject()
                    }
                ]}
            >
                <Input  placeholder="1-65535"></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                    type='primary'
                    htmlType="submit"
                >
                    {t('submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}
