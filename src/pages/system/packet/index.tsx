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
        <Card title="Traceroute" type="inner" headStyle={{background:"linear-gradient(45deg, #07117e, #07117e",color: 'white'}}>
                <TraceRoute />
        </Card>
        </Col>
        </Row>
    )
}
export default Page
