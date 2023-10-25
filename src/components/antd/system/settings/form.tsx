import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { Button, Form, Input, Row, Card, Col, Select, message as antdMessage } from 'antd'
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

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

const timezoneSelect = [
  {value:"GMT0",label:"Africa/GMT0"},
  {value:"GMT0",label:"America/GMT0"},
  {value:"GMT0",label:"Atlantic/GMT0"},
  {value:"GMT0",label:"Etc/GMT0"},
  {value:"EAT-3",label:"Africa/EAT-3"},
  {value:"EAT-3",label:"Indian/EAT-3"},
  {value:"CET-1",label:"Africa/CET-1"},
  {value:"WAT-1",label:"Africa/WAT-1"},
  {value:"CAT-2",label:"Africa/CAT-2"},
  {value:"EET-2",label:"Africa/EET-2"},
  {value:"EET-2",label:"Europe/EET-2"},
  {value:"<+01>-1",label:"Africa/<+01>-1"},
  {value:"<+01>-1",label:"Etc/<+01>-1"},
  {value:"CET-1CEST,M3.5.0,M10.5.0/3",label:"Africa/CET-1CEST,M3.5.0,M10.5.0/3"},
  {value:"CET-1CEST,M3.5.0,M10.5.0/3",label:"Arctic/CET-1CEST,M3.5.0,M10.5.0/3"},
  {value:"CET-1CEST,M3.5.0,M10.5.0/3",label:"Europe/CET-1CEST,M3.5.0,M10.5.0/3"},
  {value:"SAST-2",label:"Africa/SAST-2"},
  {value:"HST10HDT,M3.2.0,M11.1.0",label:"America/HST10HDT,M3.2.0,M11.1.0"},
  {value:"AKST9AKDT,M3.2.0,M11.1.0",label:"America/AKST9AKDT,M3.2.0,M11.1.0"},
  {value:"AST4",label:"America/AST4"},
  {value:"<-03>3",label:"America/<-03>3"},
  {value:"<-03>3",label:"Antarctica/<-03>3"},
  {value:"<-03>3",label:"Atlantic/<-03>3"},
  {value:"<-03>3",label:"Etc/<-03>3"},
  {value:"<-04>4<-03>,M10.1.0/0,M3.4.0/0",label:"America/<-04>4<-03>,M10.1.0/0,M3.4.0/0"},
  {value:"EST5",label:"America/EST5"},
  {value:"CST6CDT,M4.1.0,M10.5.0",label:"America/CST6CDT,M4.1.0,M10.5.0"},
  {value:"CST6",label:"America/CST6"},
  {value:"<-04>4",label:"America/<-04>4"},
  {value:"<-04>4",label:"Etc/<-04>4"},
  {value:"<-05>5",label:"America/<-05>5"},
  {value:"<-05>5",label:"Etc/<-05>5"},
  {value:"MST7MDT,M3.2.0,M11.1.0",label:"America/MST7MDT,M3.2.0,M11.1.0"},
  {value:"CST6CDT,M3.2.0,M11.1.0",label:"America/CST6CDT,M3.2.0,M11.1.0"},
  {value:"MST7MDT,M4.1.0,M10.5.0",label:"America/MST7MDT,M4.1.0,M10.5.0"},
  {value:"MST7",label:"America/MST7"},
  {value:"PST8PDT,M3.2.0,M11.1.0",label:"America/PST8PDT,M3.2.0,M11.1.0"},
  {value:"EST5EDT,M3.2.0,M11.1.0",label:"America/EST5EDT,M3.2.0,M11.1.0"},
  {value:"AST4ADT,M3.2.0,M11.1.0",label:"America/AST4ADT,M3.2.0,M11.1.0"},
  {value:"AST4ADT,M3.2.0,M11.1.0",label:"Atlantic/AST4ADT,M3.2.0,M11.1.0"},
  {value:"<-03>3<-02>,M3.5.0/-2,M10.5.0/-1",label:"America/<-03>3<-02>,M3.5.0/-2,M10.5.0/-1"},
  {value:"CST5CDT,M3.2.0/0,M11.1.0/1",label:"America/CST5CDT,M3.2.0/0,M11.1.0/1"},
  {value:"<-03>3<-02>,M3.2.0,M11.1.0",label:"America/<-03>3<-02>,M3.2.0,M11.1.0"},
  {value:"<-02>2",label:"America/<-02>2"},
  {value:"<-02>2",label:"Atlantic/<-02>2"},
  {value:"<-02>2",label:"Etc/<-02>2"},
  {value:"<-04>4<-03>,M9.1.6/24,M4.1.6/24",label:"America/<-04>4<-03>,M9.1.6/24,M4.1.6/24"},
  {value:"<-01>1<+00>,M3.5.0/0,M10.5.0/1",label:"America/<-01>1<+00>,M3.5.0/0,M10.5.0/1"},
  {value:"<-01>1<+00>,M3.5.0/0,M10.5.0/1",label:"Atlantic/<-01>1<+00>,M3.5.0/0,M10.5.0/1"},
  {value:"NST3:30NDT,M3.2.0,M11.1.0",label:"America/NST3:30NDT,M3.2.0,M11.1.0"},
  {value:"<+08>-8",label:"Antarctica/<+08>-8"},
  {value:"<+08>-8",label:"Asia/<+08>-8"},
  {value:"<+08>-8",label:"Etc/<+08>-8"},
  {value:"<+07>-7",label:"Antarctica/<+07>-7"},
  {value:"<+07>-7",label:"Asia/<+07>-7"},
  {value:"<+07>-7",label:"Etc/<+07>-7"},
  {value:"<+07>-7",label:"Indian/<+07>-7"},
  {value:"<+10>-10",label:"Antarctica/<+10>-10"},
  {value:"<+10>-10",label:"Asia/<+10>-10"},
  {value:"<+10>-10",label:"Etc/<+10>-10"},
  {value:"<+10>-10",label:"Pacific/<+10>-10"},
  {value:"<+11>-11",label:"Antarctica/<+11>-11"},
  {value:"<+11>-11",label:"Asia/<+11>-11"},
  {value:"<+11>-11",label:"Etc/<+11>-11"},
  {value:"<+11>-11",label:"Pacific/<+11>-11"},
  {value:"<+05>-5",label:"Antarctica/<+05>-5"},
  {value:"<+05>-5",label:"Asia/<+05>-5"},
  {value:"<+05>-5",label:"Etc/<+05>-5"},
  {value:"<+05>-5",label:"Indian/<+05>-5"},
  {value:"NZST-12NZDT,M9.5.0,M4.1.0/3",label:"Antarctica/NZST-12NZDT,M9.5.0,M4.1.0/3"},
  {value:"NZST-12NZDT,M9.5.0,M4.1.0/3",label:"Pacific/NZST-12NZDT,M9.5.0,M4.1.0/3"},
  {value:"<+03>-3",label:"Antarctica/<+03>-3"},
  {value:"<+03>-3",label:"Asia/<+03>-3"},
  {value:"<+03>-3",label:"Etc/<+03>-3"},
  {value:"<+03>-3",label:"Europe/<+03>-3"},
  {value:"<+00>0<+02>-2,M3.5.0/1,M10.5.0/3",label:"Antarctica/<+00>0<+02>-2,M3.5.0/1,M10.5.0/3"},
  {value:"<+06>-6",label:"Antarctica/<+06>-6"},
  {value:"<+06>-6",label:"Asia/<+06>-6"},
  {value:"<+06>-6",label:"Etc/<+06>-6"},
  {value:"<+06>-6",label:"Indian/<+06>-6"},
  {value:"EET-2EEST,M3.5.4/24,M10.5.5/1",label:"Asia/EET-2EEST,M3.5.4/24,M10.5.5/1"},
  {value:"<+12>-12",label:"Asia/<+12>-12"},
  {value:"<+12>-12",label:"Etc/<+12>-12"},
  {value:"<+12>-12",label:"Pacific/<+12>-12"},
  {value:"<+04>-4",label:"Asia/<+04>-4"},
  {value:"<+04>-4",label:"Etc/<+04>-4"},
  {value:"<+04>-4",label:"Europe/<+04>-4"},
  {value:"<+04>-4",label:"Indian/<+04>-4"},
  {value:"EET-2EEST,M3.5.0/0,M10.5.0/0",label:"Asia/EET-2EEST,M3.5.0/0,M10.5.0/0"},
  {value:"<+09>-9",label:"Asia/<+09>-9"},
  {value:"<+09>-9",label:"Etc/<+09>-9"},
  {value:"<+09>-9",label:"Pacific/<+09>-9"},
  {value:"<+0530>-5:30",label:"Asia/<+0530>-5:30"},
  {value:"EET-2EEST,M3.5.5/0,M10.5.5/0",label:"Asia/EET-2EEST,M3.5.5/0,M10.5.5/0"},
  {value:"EET-2EEST,M3.5.0/3,M10.5.0/4",label:"Asia/EET-2EEST,M3.5.0/3,M10.5.0/4"},
  {value:"EET-2EEST,M3.5.0/3,M10.5.0/4",label:"Europe/EET-2EEST,M3.5.0/3,M10.5.0/4"},
  {value:"EET-2EEST,M3.5.5/0,M10.5.6/1",label:"Asia/EET-2EEST,M3.5.5/0,M10.5.6/1"},
  {value:"HKT-8",label:"Asia/HKT-8"},
  {value:"WIB-7",label:"Asia/WIB-7"},
  {value:"WIT-9",label:"Asia/WIT-9"},
  {value:"IST-2IDT,M3.4.4/26,M10.5.0",label:"Asia/IST-2IDT,M3.4.4/26,M10.5.0"},
  {value:"<+0430>-4:30",label:"Asia/<+0430>-4:30"},
  {value:"PKT-5",label:"Asia/PKT-5"},
  {value:"<+0545>-5:45",label:"Asia/<+0545>-5:45"},
  {value:"IST-5:30",label:"Asia/IST-5:30"},
  {value:"CST-8",label:"Asia/CST-8"},
  {value:"WITA-8",label:"Asia/WITA-8"},
  {value:"PST-8",label:"Asia/PST-8"},
  {value:"KST-9",label:"Asia/KST-9"},
  {value:"<+0330>-3:30<+0430>,J79/24,J263/24",label:"Asia/<+0330>-3:30<+0430>,J79/24,J263/24"},
  {value:"JST-9",label:"Asia/JST-9"},
  {value:"<+0630>-6:30",label:"Asia/<+0630>-6:30"},
  {value:"<+0630>-6:30",label:"Indian/<+0630>-6:30"},
  {value:"WET0WEST,M3.5.0/1,M10.5.0",label:"Atlantic/WET0WEST,M3.5.0/1,M10.5.0"},
  {value:"WET0WEST,M3.5.0/1,M10.5.0",label:"Europe/WET0WEST,M3.5.0/1,M10.5.0"},
  {value:"<-01>1",label:"Atlantic/<-01>1"},
  {value:"<-01>1",label:"Etc/<-01>1"},
  {value:"ACST-9:30ACDT,M10.1.0,M4.1.0/3",label:"Australia/ACST-9:30ACDT,M10.1.0,M4.1.0/3"},
  {value:"AEST-10",label:"Australia/AEST-10"},
  {value:"AEST-10AEDT,M10.1.0,M4.1.0/3",label:"Australia/AEST-10AEDT,M10.1.0,M4.1.0/3"},
  {value:"ACST-9:30",label:"Australia/ACST-9:30"},
  {value:"<+0845>-8:45",label:"Australia/<+0845>-8:45"},
  {value:"<+1030>-10:30<+11>-11,M10.1.0,M4.1.0",label:"Australia/<+1030>-10:30<+11>-11,M10.1.0,M4.1.0"},
  {value:"AWST-8",label:"Australia/AWST-8"},
  {value:"<-10>10",label:"Etc/<-10>10"},
  {value:"<-10>10",label:"Pacific/<-10>10"},
  {value:"<-11>11",label:"Etc/<-11>11"},
  {value:"<-11>11",label:"Pacific/<-11>11"},
  {value:"<-12>12",label:"Etc/<-12>12"},
  {value:"<-06>6",label:"Etc/<-06>6"},
  {value:"<-06>6",label:"Pacific/<-06>6"},
  {value:"<-07>7",label:"Etc/<-07>7"},
  {value:"<-08>8",label:"Etc/<-08>8"},
  {value:"<-08>8",label:"Pacific/<-08>8"},
  {value:"<-09>9",label:"Etc/<-09>9"},
  {value:"<-09>9",label:"Pacific/<-09>9"},
  {value:"<+13>-13",label:"Etc/<+13>-13"},
  {value:"<+13>-13",label:"Pacific/<+13>-13"},
  {value:"<+14>-14",label:"Etc/<+14>-14"},
  {value:"<+14>-14",label:"Pacific/<+14>-14"},
  {value:"<+02>-2",label:"Etc/<+02>-2"},
  {value:"EET-2EEST,M3.5.0,M10.5.0/3",label:"Europe/EET-2EEST,M3.5.0,M10.5.0/3"},
  {value:"IST-1GMT0,M10.5.0,M3.5.0/1",label:"Europe/IST-1GMT0,M10.5.0,M3.5.0/1"},
  {value:"GMT0BST,M3.5.0/1,M10.5.0",label:"Europe/GMT0BST,M3.5.0/1,M10.5.0"},
  {value:"MSK-3",label:"Europe/MSK-3"},
  {value:"<+13>-13<+14>,M9.5.0/3,M4.1.0/4",label:"Pacific/<+13>-13<+14>,M9.5.0/3,M4.1.0/4"},
  {value:"<+1245>-12:45<+1345>,M9.5.0/2:45,M4.1.0/3:45",label:"Pacific/<+1245>-12:45<+1345>,M9.5.0/2:45,M4.1.0/3:45"},
  {value:"<-06>6<-05>,M9.1.6/22,M4.1.6/22",label:"Pacific/<-06>6<-05>,M9.1.6/22,M4.1.6/22"},
  {value:"<+12>-12<+13>,M11.1.0,M1.2.2/123",label:"Pacific/<+12>-12<+13>,M11.1.0,M1.2.2/123"},
  {value:"ChST-10",label:"Pacific/ChST-10"},
  {value:"HST10",label:"Pacific/HST10"},
  {value:"<-0930>9:30",label:"Pacific/<-0930>9:30"},
  {value:"SST11",label:"Pacific/SST11"}
]

export const SettingsSystem = () => {
  const [hostname, setHostname] = React.useState(null)
  const [timezone, setTimezone] = React.useState(null)

  const loadConfig = async () => {
    const result = await ubusApi.uciGet('system', '@system[0]', '')

    const  hostname  = result.sections[0]?.hostname || ""
    const  timezone  = result.sections[0]?.timezone || ""

    setHostname(hostname)
    setTimezone(timezone)
  }
  
  React.useEffect(() => { loadConfig() }, [])

  return (
    <ConfigSystem
      hostname={hostname}
      timezone={timezone}
    ></ConfigSystem>
  )
}

export const ConfigSystem = (props: any) => {
  const { hostname, timezone } = props
  const [form] = Form.useForm()
  const { t } = useTranslation();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
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

  form.setFieldsValue({ hostname: hostname, timezone: timezone })

  const handleSubmit = async (values: any) => {
    const { hostname, timezone } = values
    const key = 'updatable';
    antdMessage.loading({ content: t("loading"), key });
    setTimeout(() => {
        antdMessage.success({ content: t("success"), key, duration: 2 });
    }, 1000);
    const result = await ubusApi.config_system(hostname, timezone)
  }

  return (
    <Row>
    <Col span={4}></Col>
    <Col span={16}>
    <Card title={t("settings")} type="inner" headStyle={{  background: "linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white' }}>
    <Form form={form} onFinish={handleSubmit}>
        <Form.Item {...formItemLayout} name="hostname" label={t("hostname")} rules={[{ required: true, message: String(t("error_fill")) }]}>
          <Input style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item {...formItemLayout} name="timezone" label={t("timezone")} rules={[{ required: true, message: String(t("error_fill")) }]}>
          <Select
            style={{ width: '40%' }}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            defaultValue={timezone}
            options={timezoneSelect}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}> <Button htmlType="submit" type='primary'>{t("submit_system")}</Button></Form.Item>
      </Form>
    </Card>
    </Col>
    </Row>
  )
}
