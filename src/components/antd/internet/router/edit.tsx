import { message as antdMessage, Form, Input, Button, message, Select, InputNumber } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"


export const RouterEdit = (props: any) => {
    const {t} = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let check1: any
    let check2: any
    const abc = t('error_fill')
    const { item,data32, onDone, route_wan,route_lan } = props
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { target, nexthop, metric, device, id} = item
            form.setFieldsValue({
                 target, nexthop, metric, device, id:id, network:target.split("/")[0],subnet:target.split("/")[1] 
            })
        }
    }
    //console.log("",route_wan)
    React.useEffect(() => {
        refreshData()
    }, [])
    const refreshPage = ()=>{
        window.location.reload()
    }
    var ip2long = function(ip:any){
        var components;
    
        if(components = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/))
        {
            var iplong = 0;
            var power  = 1;
            for(var i=4; i>=1; i-=1)
            {
                iplong += power * parseInt(components[i]);
                power  *= 256;
            }
            return iplong;
        }
        else return -1;
    };
    
    var inSubNet = function(ip:any, subnet:any)
    {   
        var mask, base_ip, long_ip = ip2long(ip);
        if( (mask = subnet.match(/^(.*?)\/(\d{1,2})$/)) && ((base_ip=ip2long(mask[1])) >= 0) )
        {
            var freedom = Math.pow(2, 32 - parseInt(mask[2]));
            return (long_ip > base_ip) && (long_ip < base_ip + freedom - 1);
        }
        else return false;
    };
    
    const onFinish = async (values: any) => {
        if(inSubNet(values.nexthop,route_wan ) == false && values.device == "br-wan" || inSubNet(values.nexthop, route_lan ) == false && values.device == "br-lan" ){
            message.error(t('The_gateway_address_does_not_lie_within_one_of_the_chosen_interface_subnets'))
        }
        else{
            if (values.id == null) {
                const network_conf = values.network + "/" + values.subnet
                const param = await ubusApi.config_network_static("add", "", network_conf, values.nexthop, values.metric, values.device)
                const key = 'updatable';
                message.loading({ content: t('loading'), key });
                setTimeout(() => {
                    message.success({ content: t('success'), key, duration: 2 });
                }, 1000);
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
            else {

                const network_conf = values.network + "/" + values.subnet
                const param = await ubusApi.config_network_static("add", values.id, network_conf, values.nexthop, values.metric, values.device)
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
    }

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => {
        setValue(value)
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label="id" name="id"  hidden
            >
                <Input></Input>
            </Form.Item>
            
            <Form.Item label="Gateway" name="nexthop"
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
                <Input ></Input>
            </Form.Item>
            <Form.Item label="Metric" name="metric"
            >
                <InputNumber style={{ width: '100%' }} placeholder='10' ></InputNumber>
            </Form.Item>
            
            <Form.Item label={t('interface')} name="device" rules={[{ required: true, message: String(t("error_fill")) }]}
            >
                <Select
                    options={[
                        {
                            value: 0,
                            label: t('none')
                        },
                        {
                            label: "WAN",
                            value: "br-wan"
                        },
                        {
                            label: "LAN",
                            value: "br-lan"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('dest_network')}
            >
                <Input.Group compact>
                    <Form.Item name="network" style={{ width: "70% " }}
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
                        <Input allowClear placeholder='Ex:192.168.1.1'></Input>
                    </Form.Item>
                    <Input
                        style={{
                            width: "10%",
                            textAlign: 'center',
                            pointerEvents: 'none',
                        }}
                        placeholder="/"
                        disabled
                    />
                    <Form.Item name="subnet" style={{ width: "20%" }}
                        rules={[
                            { required: true, message: String(t("error_fill")) },
                        ]}
                    >
                        <Select
                            onChange={handleChange}
                            value={value}
                            options={data32}
                        ></Select>
                    </Form.Item>
                </Input.Group>
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
