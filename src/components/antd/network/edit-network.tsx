import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../service/api/ubus-api'

export const NetworkEdit = (props:any) => {
    const { item, onDone, optionStatusIpv4, arraySubNetMask } = props
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
    const refreshData = async () => {

        if (item) {
            const ipv4Address = item['ipv4-address'] || []
            const ipv4Ar = item['ipv4-address'][0]['address']
            const mask = item['ipv4-address'][0]['mask']
            const ipv4 = `${ipv4Ar}/${mask}`

            const { interface: itf, proto, } = item
            form.setFieldsValue({
                id: itf, status_ipv4: proto,
                ipaddrv4: ipv4,
                subnet: arraySubNetMask[mask - 1],
                ipaddrv4Ar: ipv4Ar
            })
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])
    const handleSubmit = async (values:any) => {
        // if (!values.status_ipv4) {
        //   message.error('Fill in status')
        // } else if (!values.ipaddrv4) {
        //   message.error('Fill in Ip Address')
        // } else {
        // const result = await ubusApi.uciSet("network", values.status_ipv4, { "ipaddr": values.ipaddrv4 })
        // const result1 = await ubusApi.uciCommit("network")
        // await ubusApi.uciApply(true)
        // if (result.code === 0) {
        // const cmd_config = "clish -x /Klish-XML/ -c \"enable network\" -c \"configure terminal\" -c \"interface ethernet lan\" -c \"ip address " + values.ipaddrv4 + " subnet 255.255.255.0\" -c \"exit\" -c \"do copy running-config\""
        // const result = await ubusApi.cliSet(cmd_config)

        // }
        const key = 'updatable';
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Successfully!', key, duration: 2 });
        }, 1000);
        if (onDone) {
            onDone()
        }
        const ipaddrv4Edit = values.ipaddrv4.split("/")
        const subnetTest = arraySubNetMask[ipaddrv4Edit[1] - 1]

        // const cmd_config = "clish -x /Klish-XML/ -c \"enable network\" -c \"configure terminal\" -c \"interface ethernet "+ values.id +"\" -c \"ip address " + ipaddrv4Edit[0] + " subnet "+ subnetTest+"\" -c \"exit\" -c \"do copy running-config\""

        // const cmd_config = '\"param\": [{\"proto\":\"'+values.status_ipv4+'\",\"ipaddr\":\"'+ipaddrv4Edit[0]+'\",\"netmask\": \"'+subnetTest+'\"}]'
        // const result = await ubusApi.config_network_lan(values.status_ipv4,ipaddrv4Edit[0],subnetTest)
        // console.log(result)
        // }
    }
    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="id"
                label="ID" hidden
                {...formItemLayout}
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item label="Status Ipv4" name="status_ipv4"
                {...formItemLayout}
            >
                <Select
                    options={optionStatusIpv4}
                />
            </Form.Item>
            <Form.Item label="Ip Address" name="ipaddrv4"
                {...formItemLayout}

            >
                <Input ></Input>
            </Form.Item>
            <Form.Item label="Ip " name="ipaddrv4Ar" hidden
                {...formItemLayout}


            >
                <Input ></Input>
            </Form.Item>
            <Form.Item label="SubNet" name="subnet"
                {...formItemLayout}
                hidden
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item label="Status Ipv4" name="status_ipv6"
                {...formItemLayout}

            >
                <Input ></Input>
            </Form.Item>
            <Button
                type='primary'
                htmlType="submit"
            >
                Submit
            </Button>

        </Form>
    )
}
