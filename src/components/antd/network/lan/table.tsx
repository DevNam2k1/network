import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm } from 'antd'
import {
    formatTimeSecond,
    humanReadableSize as hrsize,
  } from '../../../../service/utils/data-format'
import React from 'react'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LanTable = (props: any) => {
    const { onEditItem, onDeleteItem, data1 } = props
    // console.log(data1)
    const { t } = useTranslation()
    const confirmDeleteGroup = async (group: any) => {
        return onDeleteItem(group)
    }
    const columns = [

        { title: t('ip'), key: 'ipaddr', dataIndex: 'ipaddr' },
        { title: t('hostname'), key: 'hostname',
        render: (_: string, record: any) => {
            if (record.hostname == undefined) {
                const cert =  "unknown"
                return <Space>
                    {cert}
                </Space>
            } else {
                return (
                    <Space>
                        {record.hostname}
                    </Space>
                )
            }
        },
        },
        { title: t('macaddr'), key: 'macaddr', dataIndex: 'macaddr' },
        { title: t('expires'), key: 'expires', 
        render: (_: string, record: any) => {
            if (record.expires) {
                const cert =  formatTimeSecond(record.expires)
                return <Space>
                    {cert}
                </Space>
            } else {
                return (
                    <Space>
                    </Space>
                )
            }
        },},
    ]

    if (!data1) {
        return (
            <Table columns={columns} dataSource={data1} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={data1} style={{ minWidth: 400 }} />
        )
    }
}
