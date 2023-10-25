import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Router2Table = (props: any) => {
  const { onEditItem, onDeleteItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const confirmDeleteGroup = async (group: any) => {
    const { target, nexthop, metric, device ,id} = group
    const deleteRoute = await ubusApi.config_network_static("del", id, target, nexthop, metric, device)
    const key = 'updatable';
    message.loading({ content: t('loading'), key });
    setTimeout(() => {
      message.success({ content: t('success'), key, duration: 2 });
    }, 1000);
    setTimeout(() => {
      window.location.reload()
    }, 1500);
    return onDeleteItem(group)
  }
  const columns = [
    { title: t('dest_network'), key: 'target', dataIndex: 'target' }, 
    { title: 'GateWay', key: 'nexthop', dataIndex: 'nexthop' },
    { title: 'Metric', key: 'metric', dataIndex: 'metric' },
    { title: t('device'), key: 'device', dataIndex: 'device' },
    {
      title: t('action'),
      key: 'action',
      render: (_: string, record: any) => {
          if (record.admin_id <= 0) {
              return null
          }
          return (
              <Space>
                  <Button icon={<EditOutlined />} title={abc} onClick={() => onEditItem(record)} />
                  <Popconfirm
                      placement="top"
                      title={t('delete_cf')}
                      onConfirm={() => confirmDeleteGroup(record)}
                      okText={t('yes')}
                      cancelText={t('no')}
                  >
                      <Button icon={<DeleteOutlined />} danger type="primary" title={def} />
                  </Popconfirm>
              </Space>
          )
      },
  },
  ]
  if (!haha) {
    return (
      <Table columns={columns} dataSource={haha} loading style={{ minWidth: 400 }} />
    )
  } else {
    return (
      <Table columns={columns} dataSource={haha} style={{ minWidth: 400 }} />
    )
  }
}

export const RouterTable = (props: any) => {
  const { onEditItem, onDeleteItem, tableData, hihi } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const columns = [
    { title: t('dest_network'), key: 'destination', dataIndex: 'destination' }, 
    { title: 'GateWay', key: 'gateway', dataIndex: 'gateway' },
    { title: 'Netmask', key: 'genmask', dataIndex: 'genmask' },
    { title: t('Flags'), key: 'flags', dataIndex: 'flags' },
    { title: 'Metric', key: 'metric', dataIndex: 'metric' },
    { title: 'Ref', key: 'ref', dataIndex: 'ref' },
    { title: 'Use', key: 'use', dataIndex: 'use' },
    { title: t('device'), key: 'iface', dataIndex: 'iface' },
  ]
  if (!hihi) {
    return (
      <Table columns={columns} dataSource={hihi} loading style={{ minWidth: 400 }} />
    )
  } else {
    return (
      <Table columns={columns} dataSource={hihi} style={{ minWidth: 400 }} />
    )
  }
}
