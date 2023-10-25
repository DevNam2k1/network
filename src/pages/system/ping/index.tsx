import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Card } from 'antd'
import AntdLayout from 'components/antd/layout';
import { PingSystem } from 'components/antd/system/ping/form';

import { UploadFirmware } from 'components/antd/system/upfirmware/upload';
import React, { useState, useRef } from 'react';
import ubusApi from '../../../service/api/ubus-api';

const Page = () => {
    return (
            <Row>
            <Col span={4}></Col>
            <Col span={16}>
            <Card title="Ping" type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                <br></br>
                <div style={{ overflowX: 'auto' }}>
                <PingSystem />
                </div>
            </Card>
            </Col>
            </Row>
    )
}
export default Page
