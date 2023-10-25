import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VlanEdit = (props: any) => {
    const {t} = useTranslation()
    let pattern1 = /^([-]?[1-9][0-9]*|0)$/
    const { item, onDone, value, handleChange,optionsParentInterface } = props
    console.log(value)
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { name, vid,dev, } = item
            form.setFieldsValue({
                name:name, mode:value, interface:dev, vid:vid
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

        if (values.id == null) {

            if (values.mode == "access") {
                const vlan = await ubusApi.config_network_vlan("access", "add", randomName(4), values.name, values.vid, values.interface)
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
        else {

            if (values.mode == "access") {
                const vlan = await ubusApi.config_network_vlan("access", "add", values.id, values.name, values.vid, values.interface)
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
    
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('id')} name="id" hidden 
            >
                <Input disabled></Input>
            </Form.Item>
            <Form.Item label={t('mode')} name="mode" rules={[{ required: true,  message: String(t("error_fill"))  }]}
            >
                <Select
                    // defaultValue="Select Mode"
                    onChange={handleChange}
                    value={value}
                    options={[
                        {
                            value: "access",
                            label: "Access"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('interface')} name="interface"
            >
                <Select
                    mode="tags"
                    options={optionsParentInterface}
                ></Select>
            </Form.Item>
            <Form.Item label="VLAN ID" name="vid"
                rules={[
                    { required: true, message: String(t("error_fill"))  },
                    {
                      validator: (_, values) =>
                        values > 4094 || values < 1 ? Promise.reject(t('vlanid_could_not_be_larger_than_4094')) : Promise.resolve()
                    },
                    {
                        validator: (_, value) =>
                        pattern1.test(value) ? Promise.resolve() : Promise.reject(t('enter_number'))
                    }
                ]}
            >
                <Input></Input>
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

