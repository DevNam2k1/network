import { message as antdMessage, Form, Input, Button, message, Select, Upload, Row, Col } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import axios from "axios"
import { UploadOutlined } from '@ant-design/icons';
import { stat } from 'fs';
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import "./index.css"

export const OpenVpnEdit = (props: any) => {
    const URL = "/cgi-bin/luci-upload"
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9.]+$/
    let pattern1 = /^([-]?[1-9][0-9]*|0)$/
    let patternIpv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let check1: any
    let check2: any
    const abc = t('error_fill')
    const { item,optionSubnetmask, onDone, optionsEncryption } = props
    const [crtlist, setCrt] = React.useState([])
    const [keylist, setKey] = React.useState([])
    const [calist, setCa] = React.useState([])
    const [form] = Form.useForm()
    let tokenString = sessionStorage.getItem('token');
    const listCA = async () => {
        const crt = await ubusApi.show_network_openvpn_list('cert')
        const key = await ubusApi.show_network_openvpn_list('key')
        const ca = await ubusApi.show_network_openvpn_list('ca')
        setCrt(crt['list_folders'])
        setKey(key['list_folders'])
        setCa(ca['list_folders'])
    }
    React.useEffect(() => {
        listCA()
    }, [])

    const refreshData = async () => {
        const {id, dev, mode, enabled, ca, cert, key, server, port, push, remote } = item
        if (item) {
            if (mode === "server") {
                form.setFieldsValue({
                    name: dev.split("tun_")[1],
                    mode: mode,
                    status: (enabled === "1") ? "enable" : "disable",
                    port: port,
                    subnet: server.split(" ")[0],
                    netmask: server.split(" ")[1],
                    client_access: (push[0] === "redirect-gateway def1") ? "internet" : "home",
                    crt_local: cert.split("/etc/sample-keys/openvpn_cert/cert/")[1],
                    key_local: key.split("/etc/sample-keys/openvpn_cert/key/")[1],
                    ca_local: ca.split("/etc/sample-keys/openvpn_cert/ca/")[1],
                })
            } else {
                form.setFieldsValue({
                    name: dev.split("tun_")[1],
                    mode: "client",
                    status: (enabled === "1") ? "enable" : "disable",
                    server_ip: remote.split(" ")[0],
                    server_port: remote.split(" ")[1],
                    crt_local: cert.split("/etc/sample-keys/openvpn_cert/cert/")[1],
                    key_local: key.split("/etc/sample-keys/openvpn_cert/key/")[1],
                    ca_local: ca.split("/etc/sample-keys/openvpn_cert/ca/")[1],
                })
            }
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])
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
        if (values.crt) {
            const data = new FormData();
            values.token = tokenString;
            data.append("sessionid", values.token)
            data.append("filename", "/etc/sample-keys/openvpn_cert/cert/" + values.crt.file.name)
            data.append("filedata", values.crt.file.originFileObj)
            axios.post(URL, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log("success: ", response.data.message)
            }).catch(error => {
                console.log("Fail: ", error)
            })
        } else {
            console.log("chua vao crt")
        }

        if (values.key) {
            const data1 = new FormData();
            values.token = tokenString;
            data1.append("sessionid", values.token)
            data1.append("filename", "/etc/sample-keys/openvpn_cert/key/" + values.key.file.name)
            data1.append("filedata", values.key.file.originFileObj)
            axios.post(URL, data1, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log("success: ", response)
            }).catch(error => {
                console.log("Fail: ", error)
            })
        } else {
            console.log("chua vao key")
        }

        if (values.ca) {
            const data2 = new FormData();
            values.token = tokenString;
            data2.append("sessionid", values.token)
            data2.append("filename", "/etc/sample-keys/openvpn_cert/ca/" + values.ca.file.name)
            data2.append("filedata", values.ca.file.originFileObj)
            axios.post(URL, data2, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log("success: ", response.data.message)
            }).catch(error => {
                console.log("Fail: ", error)
            })
        } else {
            console.log("chua vao ca")
        }
        
        if(values.crt_local == null && values.ca_local == null && values.key_local == null && values.crt == null && values.ca == null && values.key == null ){
            message.error(t('error_openvpn'))
        }
        if(values.name == null){

            if (values.mode === "server") {

                if (values.crt_local == null && values.ca_local == null && values.key_local == null) {
                    await ubusApi.config_network_openvpn_server("add",randomName(4), values.status, "server", values.port, values.subnet, values.netmask, values.client_access, values.crt.file.name, values.key.file.name, values.ca.file.name)
                }
                if (values.crt == null && values.ca == null && values.key == null) {
                    await ubusApi.config_network_openvpn_server("add", randomName(4), values.status, "server", values.port, values.subnet, values.netmask, values.client_access, values.crt_local, values.key_local, values.ca_local)
                }
            }
            else {

                if (values.crt_local == null && values.ca_local == null && values.key_local == null) {
                    await ubusApi.config_network_openvpn_client("add", randomName(4), values.status, "client", values.server_ip, values.server_port, values.crt.file.name, values.key.file.name, values.ca.file.name)
                }
                if (values.crt == null && values.ca == null && values.key == null) {
                    await ubusApi.config_network_openvpn_client("add",  randomName(4), values.status, "client", values.server_ip, values.server_port, values.crt_local, values.key_local, values.ca_local)
                }
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
        else{

            if (values.mode === "server") {

                if (values.crt_local == null && values.ca_local == null && values.key_local == null) {
                    await ubusApi.config_network_openvpn_server("add", values.name, values.status, "server", values.port, values.subnet, values.netmask, values.client_access, values.crt.file.name, values.key.file.name, values.ca.file.name)
                }
                if (values.crt == null && values.ca == null && values.key == null) {
                    await ubusApi.config_network_openvpn_server("add", values.name, values.status, "server", values.port, values.subnet, values.netmask, values.client_access, values.crt_local, values.key_local, values.ca_local)
                }
            }
            else {
                
                if (values.crt_local == null && values.ca_local == null && values.key_local == null) {
                    await ubusApi.config_network_openvpn_client("add", values.name, values.status, "client", values.server_ip, values.server_port, values.crt.file.name, values.key.file.name, values.ca.file.name)
                }
                if (values.crt == null && values.ca == null && values.key == null) {
                    await ubusApi.config_network_openvpn_client("add", values.name, values.status, "client", values.server_ip, values.server_port, values.crt_local, values.key_local, values.ca_local)
                }
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
    }
    const [value, setValue] = React.useState('')
    const handleChangeCrt = (value: any) => {
        setValue(value)
    }
    const handleChange = (value: any) => {
        setValue(value)
    }
    const handleChangeCa = (value: any) => {
        setValue(value)
    }
    const handleChangeKey = (value: any) => {
        setValue(value)
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('mode')} name="mode" rules={[{ required: true, message: String(t("error_fill")) }]}
            >
                <Select
                    onChange={handleChange}
                    // value={value}
                    options={[
                        {
                            value: "server",
                            label: t('server')
                        },
                        {
                            value: "client",
                            label: t('client')
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('name')} name="name" hidden
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('mode') ==
                            "server" ? (
                            <>
                                <Form.Item label={t('status')} name="status">
                                    <Select
                                        defaultValue={t('select_status')}
                                        options={[
                                            {
                                                value: "enable",
                                                label: t('enable')
                                            },
                                            {
                                                value: "disable",
                                                label: t('disable')
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('port')} name="port"
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
                                    <Input allowClear placeholder="Between 1 and 65535"></Input>
                                </Form.Item>
                                <Form.Item label={t('subnet')} name="subnet"
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
                                    <Input allowClear placeholder="10.20.30.0" ></Input>
                                </Form.Item>
                                <Form.Item label={t('Netmask')} name="netmask"
                                    
                                >
                                        <Select
                                            defaultValue={t("Netmask")}
                                            options={optionSubnetmask}
                                        ></Select>
                                </Form.Item>
                                <Form.Item label={t('type_access')} name="client_access">
                                    <Select

                                        options={[
                                            {
                                                value: "home",
                                                label: "Home"
                                            },
                                            {
                                                value: "internet",
                                                label: "Internet"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label="Certificate File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                noStyle
                                                name="crt_local"
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={crtlist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="crt">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item label="Key File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="key_local"
                                                noStyle
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={keylist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="key">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item label="Certificate CA File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="ca_local"
                                                noStyle
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={calist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="ca">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </>
                        ) : null}
            </Form.Item>


            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('mode') ==
                            "client" ? (
                            <>
                                <Form.Item label="Status" name="status">
                                    <Select
                                        defaultValue="Select Status"
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label="Server IP" name="server_ip"
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
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label="Server Port" name="server_port"
                                    rules={[
                                        { required: true, message: "" },
                                        {
                                            validator: (_, values) =>
                                                values > 65535 ? Promise.reject(t('Port_could_not_be_larger_than_65535')) : Promise.resolve()
                                        }
                                    ]}
                                >
                                    <Input allowClear placeholder="Between 1 and 65535"></Input>
                                </Form.Item>

                                <Form.Item label="Certificate File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                noStyle
                                                name="crt_local"
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={crtlist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="crt">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item label="Key File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="key_local"
                                                noStyle
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={keylist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="key">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item label="Certificate CA File">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="ca_local"
                                                noStyle
                                            >
                                                <Select
                                                    onChange={handleChange}
                                                    value={value}
                                                    options={calist}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="ca">
                                                <Upload
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </>
                        ) : null}
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

