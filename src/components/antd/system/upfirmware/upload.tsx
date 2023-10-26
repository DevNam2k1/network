
import { message as antdMessage, Form, Button, message, Upload, Card } from 'antd'

import axios from "axios"
import ubusApi from 'service/api/ubus-api'
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";
  
export const UploadFirmware = (props: any) => {
    const { t } = useTranslation();
    const [form] = Form.useForm()
    const [do_upgrade, setDoUpgrade] = React.useState(false)

    let tokenString = sessionStorage.getItem('token');

    const URL = "/cgi-bin/luci-upload"

    const uploadFile = async (values: any) => {
    
        const data = new FormData();
        values.token = tokenString;
        data.append("sessionid", values.token)
        data.append("filename", "/tmp/firmware.bin")
        data.append("filedata", values.imageFile.file.originFileObj)
        axios.post(URL, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            message.success(t("upload_success"));
            doUpgrade()
        }).catch(error => {            
            message.error(t("fail"));
        })
    }

    const doUpgrade = async () => {
        let result = await ubusApi.config_system_update()

        const { code } = result
        console.log('upgrade', code)

        const key = 'updatable';
        antdMessage.loading({ content: t("loading"), key });
        setTimeout(() => {
            if (code == 1 || code == 2) 
            antdMessage.error({ content: t("invalid_firmware"), key, duration: 2 });
            else 
                antdMessage.success({ content: t("upgrade_success"), key, duration: 2 });
        }, 5000);
    }

    return (
        <Card title={t("update_firmware")} type="inner" headStyle={{ background: "linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
        <Form
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            onFinish={uploadFile}
        >

            <Form.Item label={t("choose_firmware")} name="imageFile">
                <Upload maxCount={1} {...props}>
                    <Button icon={<UploadOutlined />} onClick={uploadFile}>{t("upload")}</Button>
                </Upload>

            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
                <Button type='primary' htmlType="submit">
                    {t("update")}
                </Button>
            </Form.Item>
        </Form>
        </Card>
    )
}
