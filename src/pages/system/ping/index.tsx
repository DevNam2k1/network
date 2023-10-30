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
            <Card title="Ping" type="inner" headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
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
