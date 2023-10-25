import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message, Card } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const OpenVpnClientTable = (props: any) => {
    const { onEditItem, onDeleteItem, dataTable } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const confirmDeleteGroup = async (group: any) => {
        // if (group.delte)
        if (group.mode === "server") {
            const name1 = group.dev.split("tun_")
            const aaa = await ubusApi.config_network_openvpn_del(name1[1])
        } else {
            const name = group.dev.split("tun_")
            const aaa = await ubusApi.config_network_openvpn_del(name[1])
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
    const columns = [
        // { title: t('name'), key: '.name', dataIndex: '.name' },
        {
            title: t('mode'),
            key: 'mode',
            render: (_: string, record: any) => {
                if (record.client === "1") {
                    return <Space>
                        Client
                    </Space>
                } else {
                    return (
                        <Space>
                            Server
                        </Space>
                    )
                }
            },
        },
        {
            title: 'Certificate File', key: 'crt',
            render: (_: string, record: any) => {
                if (record.cert) {
                    const cert = record.cert.split("/etc/sample-keys/openvpn_cert/cert/")
                    return <Space>
                        {cert[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },
        {
            title: 'Key File', key: 'key',
            render: (_: string, record: any) => {
                if (record.key) {
                    const key = record.key.split("/etc/sample-keys/openvpn_cert/key/")
                    return <Space>
                        {key[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },
        {
            title: 'CA Certificate', key: 'ca',
            render: (_: string, record: any) => {
                if (record.ca) {
                    const ca = record.ca.split("/etc/sample-keys/openvpn_cert/ca/")
                    return <Space>
                        {ca[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },
        {
            title: t('status'),
            key: 'status',
            render: (_: string, record: any) => {
                if (record.enabled === "1") {
                    return <Space>
                        {t('enable')}
                    </Space>
                } else {
                    return (
                        <Space>
                            {t('disable')}
                        </Space>
                    )
                }
            },
        },
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
                            <Button icon={<DeleteOutlined />} danger type="primary" title={def} />
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]

    if (!dataTable) {
        return (
            <Table columns={columns} dataSource={dataTable} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={dataTable} style={{ minWidth: 400 }} />
        )
    }
}

export const ListCertificate = (props: any) => {
    const { onEditItem, onDeleteItem, dataTable } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const [crtlist, setCrt] = React.useState([])
    const [keylist, setKey] = React.useState([])
    const [calist, setCa] = React.useState([])
    const listCA = async () => {
        const crt = await ubusApi.show_network_openvpn_list('cert')
        const key = await ubusApi.show_network_openvpn_list('key')
        const ca = await ubusApi.show_network_openvpn_list('ca')
        setCrt(crt['list_folders'])
        setKey(key['list_folders'])
        setCa(ca['list_folders'])
    }
    const data1 = [
        {
            crt:crtlist,
            key: keylist,
            ca: calist
        }

    ]
    React.useEffect(() => {
        listCA()
    }, [])
    const confirmDeleteGroup = async (group: any) => {
        const { crt, key, ca } = group
        const aaa = await ubusApi.config_network_openvpn_dev("del_crt",crt ,key, ca)
    }
    const columns = [
        {
            title: 'Certificate File', key: 'crt',
            render: (_: string, record: any) => {
                if (record.cert) {
                    const cert = record.cert.split("/etc/sample-keys/openvpn_cert/cert/")
                    return <Space>
                        {cert[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },


        {
            title: 'Key File', key: 'key',
            render: (_: string, record: any) => {
                if (record.key) {
                    const key = record.key.split("/etc/sample-keys/openvpn_cert/key/")
                    return <Space>
                        {key[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },
        
        {
            title: 'CA Certificate', key: 'ca',
            render: (_: string, record: any) => {
                if (record.ca) {
                    const ca = record.ca.split("/etc/sample-keys/openvpn_cert/ca/")
                    return <Space>
                        {ca[1]}
                    </Space>
                } else {
                    return (
                        <Space>
                        </Space>
                    )
                }
            },
        },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        {/* <Button title={abc} icon={<EditOutlined />}  onClick={() => onEditItem(record)} /> */}
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
    if (!dataTable) {
        return (
            <Table columns={columns} dataSource={dataTable} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={dataTable} style={{ minWidth: 400 }} />
        )
    }
}
