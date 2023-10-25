import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PortForwardTable = (props: any) => {
    const { onEditItem, onDeleteItem, tableData } = props
    const {t} = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = ()=>{
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {
        const {lanip, lanport, wanip, wanport, proto, name} = group
        const result = await ubusApi.config_network_nat("disable", name, proto, wanip, wanport, lanip, lanport)
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
        { title: t("wan_ip"), key: 'wanip', dataIndex: 'wanip' },
        { title: t("wan_port"), key: 'wanport', dataIndex: 'wanport' },
        { title: t('lan_ip'), key: 'lanip', dataIndex: 'lanip' },
        { title: t('lan_port'), key: 'lanport', dataIndex: 'lanport' },
        { title: t('protocol'), key: 'proto', dataIndex: 'proto' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button title={abc}  icon={<EditOutlined />} onClick={() => onEditItem(record)} />
                        <Popconfirm
                            placement="top"
                            title={t('delete_cf')}
                            onConfirm={() => confirmDeleteGroup(record)}
                            okText={t('yes')}
                            cancelText={t('no')}
                        >
                            <Button icon={<DeleteOutlined />} danger type="primary" title={def}/>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    if ( !tableData ) {
        return(
          <Table columns={columns} dataSource={tableData} loading style={{ minWidth: 400 }} /> 
        )
      } else {
        return(
          <Table columns={columns} dataSource={tableData} style={{ minWidth: 400 }} /> 
        )
      }
}
