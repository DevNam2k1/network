import Layout from 'antd/es/layout/layout'
import AntdLayout from '../../components/antd/layout'
import AntdLayoutMenu from '../../components/antd/layoutmenu'
import { StatusOverview } from '../../components/antd/status/status-overview'
import { Outlet, Link } from "react-router-dom";
import { Dashboard } from "../../components/antd/status/dashboard"

const Page = () => {
  return (
       <Dashboard />
  );
}

export default Page
