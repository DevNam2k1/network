import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VlanTable = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, hihi } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_vlan("access", "del", group.id, group.name, group.vid, group.dev)
        // console.log("data1: ",group)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const columns = [
        { title: 'VLAN ID', key: 'vid', dataIndex: 'vid' },
        { title: t('name'), key: 'name', dataIndex: 'name' },
        { title: t('interface'), key: 'dev', dataIndex: 'dev',render: (dev: string[]) => dev.join(' '),},
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
                            <Button icon={<DeleteOutlined />}  danger type="primary" title={def} />
                        </Popconfirm>
                    </Space>
                )
            },
        },
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
export const VlanTable1 = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, haha } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const confirmDeleteGroup = async (group: any) => {
        return onDeleteItem(group)
    }
    const columns = [
        { title: 'VLAN ID', key: 'vid', dataIndex: 'vid' },
        { title: t('interface'), key: 'dev', dataIndex: 'dev' },
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