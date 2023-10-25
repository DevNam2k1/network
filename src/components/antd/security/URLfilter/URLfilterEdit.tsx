import { Action } from '@remix-run/router'
import { message as antdMessage, Card, Form, Input, Button, message, AutoComplete, Select } from 'antd'
import { type } from 'os'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const URLfilterEdit = (props: any) => {
    const { item, onDone, } = props
    let pattern = /^[a-zA-Z0-9_.]+$/
    let pattern1 = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
    const [form] = Form.useForm()
    const {t} = useTranslation()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const { name, action, type, url, } = item
            form.setFieldsValue({
                name, action, type, url ,  
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
        if(values.name == null){

            const param = await ubusApi.config_url_filter( randomName(4), "add", "block", values.url, )
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

            const param = await ubusApi.config_url_filter(values.name, "add", "block", values.url,)
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
    const [autoCompleteResult, setAutoCompleteResult] = React.useState<string[]>([]);
    const onWebsiteChange = (value: string) => {
        if (!value) {
          setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net', '.vn', '.edu.vn', '.net.vn', '.org.vn', '.com.vn', '.info.vn', '.gov.vn', '.tel.vn'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <Card>
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 25 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('name')} name="name" hidden
            >
                <Input defaultValue=""></Input> 
            </Form.Item>
            
            <Form.Item label="URL" name="url"
             rules={[{ required: true, message: String(t("error_fill")) },
                {
                  validator: (_, value) =>
                    pattern1.test(value) ? Promise.resolve() : Promise.reject('fail form url')
                }  
                ]}
            >
                <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="dantri.com.vn"></AutoComplete>
            </Form.Item>            
            <Form.Item wrapperCol={{ offset: 4, span: 25 }}>
                <Button
                    type='primary'
                    htmlType="submit"
                >
                    {t('submit')}
                </Button>
            </Form.Item>
        </Form>
        </Card>
    )
}
export default URLfilterEdit
