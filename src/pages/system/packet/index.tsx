import { Col, Row, Card } from 'antd'
import { TraceRoute } from 'components/antd/system/traceroute/form';
import React from 'react';

const Page = () => {
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)

    return (
        <Row>
        <Col span={4}></Col>
        <Col span={16}>
        <Card title="Traceroute" type="inner" headStyle={{background:"linear-gradient(109.6deg, rgb(44, 83, 131), rgb(44, 83, 131) 18.9%, rgb(68, 124, 143), rgb(44, 83, 131) 91.1%, rgb(44, 83, 131))",color: 'white'}}>
                <TraceRoute />
        </Card>
        </Col>
        </Row>
    )
}
export default Page
