import React from 'react'
import { message, Form, Input, Button, Typography, Select, Switch, Card } from 'antd'
import ubusApi from '../../../../service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { t } from 'i18next';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 16 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 4 },
  },
}

const optionProvider = [
  {
    label: "DynDNS",
    value: "DynDNS"
  }
]

export const DDNS = () => {
  const { t } = useTranslation()
  const [provider, setProvider] = React.useState("DynDNS")
  const [enabled, setEnabled] = React.useState(true)
  const [mode, setMode] = React.useState("")
  const [url, setURL] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [domain, setDomain] = React.useState(null)

  const optionModeDDNS = React.useRef([
    {
      label: t('provider_url'),
      value: "provider"
    },
    {
      label: t('custom_url'),
      value: "custom"
    },
  ]).current;

  const loadPWD = async () => {
    const result = await ubusApi.show_network_ddns()
    const { enabled, service_name, lookup_host, domain, username, password } = result.values
    setDomain(domain)
    setUsername(username)
    setPassword(password)
    if (enabled === "1") {
      setEnabled(true)
    } else {
      setEnabled(false)
    }

    if (service_name == null) {
      setMode("custom")
      setURL(lookup_host)
    } else {
      setMode("provider")
      setURL(service_name)
    }
    // console.log("yasuo: ",enabled)
  }
  React.useEffect(() => { loadPWD() }, [])

  return (
    <DDNSConfig
      enabled={enabled}
      username={username}
      password={password}
      domain={domain}
      mode={mode}
      url={url}
      optionModeDDNS={optionModeDDNS}
    ></DDNSConfig>
  )
}

export const DDNSConfig = (props: any) => {
  const { enabled, username, password, domain, mode, url, optionModeDDNS } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(true)
  setTimeout(() => {
      setLoading(false)
  }, 1000);
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

  if (enabled === true) {
    form.setFieldsValue({ status: true, username: username, password: password, domain: domain, mode: mode, url: url })
  } else {
    form.setFieldsValue({ status: false })
  }

  const handleSubmit = async (values: any) => {
    if (values.status === true) {
      const valueStatus = "true"
      const result = await ubusApi.config_network_ddns(null, valueStatus, values.mode, values.url, values.username, values.password, values.domain)
    } else {
      const valueStatus = "false"
      const result = await ubusApi.config_network_ddns(null, valueStatus, values.mode, values.url, values.username, values.password, values.domain)
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

  return (
    <>
      {/* <Typography.Title level={3}>DDNS</Typography.Title> */}
      <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
        <Card loading={loading}>
        <Form.Item name="provider" label={t('provider')}>
          <Select
            defaultValue="DynDNS"
            options={optionProvider}
          />
        </Form.Item>
        <Form.Item name="status" label={t('status')} valuePropName="checked">
          <Switch></Switch>
        </Form.Item>
        <Form.Item name="mode" label={t('mode')}>
          <Select options={optionModeDDNS} />
        </Form.Item>
        <Form.Item name="url" label="URL">
          <Input />
        </Form.Item>
        <Form.Item name="username" label={t('username')}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label={t('password')}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="domain" label={t('hostname')}>
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}><Button type='primary' htmlType="submit" >{t('submit')}</Button></Form.Item>
      </Card></Form>
    </>
  )
}
