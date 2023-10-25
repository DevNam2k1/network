import ubusApi from 'service/api/ubus-api'
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const { Column, ColumnGroup } = Table;

export const Multicast_table = () => {
  const [data, setData] = React.useState()
  
  const refreshData = async () => {
      const data1 = await ubusApi.show_network_multicast()
      setData(data1.mdb)
  }
  
  React.useEffect(() => {
    refreshData()},[])
  console.log(data)
  return (
      <GetTable
          haha={data}
      />
  )
}    
  
export const GetTable = (props: any) => {
  const { t } = useTranslation();
  const { haha } = props
  const columns = [
    { title: 'Vlans', key: 'vlans', dataIndex: 'vid' },
    { title: 'Group', key: 'group', dataIndex: 'grp' },
    { title: t('Ports'), key: 'ports', dataIndex: 'port' },
  ]
  if ( !haha ) {
    return(
      <Table columns={columns} dataSource={haha} loading style={{ minWidth: 400 }} /> 
    )
  } else {
    return(
      <Table columns={columns} dataSource={haha} style={{ minWidth: 400 }} /> 
    )
  }
}

export default Multicast_table;