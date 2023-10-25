import { Table, Result, Statistic, Card } from 'antd'
import {
  formatTimeSecond,
  humanReadableSize as hrsize,
} from '../../../service/utils/data-format'

import {
  ArrowDownOutlined,
  ArrowUpOutlined
} from '@ant-design/icons'

import { RingProgress } from '@ant-design/plots';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import Icon from '@ant-design/icons/lib/components/Icon';


const SimpleTable = (props: any) => {
  const { showHeader, pagination, ...restProps } = props
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <b>{text}</b>,
      responsive: ['md'],
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      responsive: ['md'],
    },
  ]
  return (
    <Table
      columns={columns}
      showHeader={false}
      pagination={false}
      {...restProps}
    />
  )
}

export const SystemGeneralInfoTable = (props: any) => {
  const { t } = useTranslation();
  const { systemInfo = {} } = props
  const { localtime, uptime } = systemInfo.data?.system || {}

  const localTimeStr = new Date(Date.now()).toTimeString()
  const data = [
    { name: t("local_time"), value: localTimeStr },
    { name: t("uptime"), value: formatTimeSecond(uptime) },
  ]
  return (
    <>
      <SimpleTable dataSource={data} />
    </>
  )
}

export const InfoInterface = (props: any) => {
  const { t } = useTranslation();
  const { systemInfo = {} } = props
  const { wan_interface, lan_interface } = systemInfo.data || {}

  const columns2 = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <b>{text}</b>,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (text: any) => <b>{text}</b>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }
  ]
  const data = [
    { name: t("WAN"), value: wan_interface?.up ? wan_interface['ipv4-address'][0]['address'] : "n/a", icon: wan_interface?.up ? <ArrowUpOutlined style={{color : "#3f8600"}}/> : <ArrowDownOutlined style={{ color: '#cf1322' }}/> },
    { name: t("LAN"), value: lan_interface?.up ? lan_interface['ipv4-address'][0]['address'] : "n/a", icon: lan_interface?.up ? <ArrowUpOutlined style={{color : "#3f8600"}}/> : <ArrowDownOutlined style={{ color: '#cf1322' }}/> },
  ]
  return (
    <>
      {/* <Card bordered={false}> */}
        <Table columns={columns2} dataSource={data} showHeader={false} pagination={false} style={{width : "375px"}}/>
      {/* </Card> */}
    </>
  )
}

export const SystemMemoryInfoTable = (props: any) => {
  const { systemInfo = {} } = props
  const { memory = {} } = systemInfo.data?.system || {}
  let {
    total = 1,
    free = 0,
    available = 0,
  } = memory

  const usage = (total - available) / total

  const config = {
    height: 100,
    width: 100,
    autoFit: true,
    percent: usage,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <RingProgress {...config} />;
}

export const InternetStatus = (props: any) => {
  const { systemInfo = {} } = props
  const { internet } = systemInfo?.data || 0

  if (internet === 1) {
    return <Statistic valueStyle={{ color: '#3f8600' }} value="Up" prefix={<ArrowUpOutlined />} style={{ height: "100px", paddingTop: "30px" }} />
  } else {
    return <Statistic valueStyle={{ color: '#cf1322' }} value="Down" prefix={<ArrowDownOutlined />} style={{ height: "100px" }} />
  }
}
