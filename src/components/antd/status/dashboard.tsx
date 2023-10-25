/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
import "./test.css"
//import Grap from "./line"
import { useSelector } from 'react-redux'
import { sessionSelector } from 'redux/reducer/sessionSlice'
import { StatusOverview } from './status-overview'
import { NetworkStatistic, ClientsConnected } from './network-statistic'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Typography,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

export const Dashboard = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[24, 10]}>
        <Col md={8}>
          <Card >
            <StatusOverview></StatusOverview>
          </Card>
        </Col>

        <Col md={16}>
          <Card title={t("wireless_clients")} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}} bodyStyle={{height: "398px"}}>
            <div style={{ overflowX: 'auto' }}>
              <ClientsConnected></ClientsConnected>
            </div>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row gutter={[24, 10]}>
        <Col span={24} md={8}>
          <Card title={t("wan_statistic")} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}} >
            <NetworkStatistic name="wan"></NetworkStatistic>
          </Card>
        </Col>

        <Col md={8}>
          <Card title={t("lan_statistic")} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <NetworkStatistic name="lan"></NetworkStatistic>
          </Card>
        </Col>

        <Col md={8}>
          <Card title={t("wifi_statistic")} headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
            <NetworkStatistic name="wifi" ></NetworkStatistic>
          </Card>
        </Col>
        
      </Row>
    </>
  );
}
