import ubusApi from 'service/api/ubus-api'
import React, { Component, useReducer } from 'react';
import { message, Space, Table, Tag } from 'antd';
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";
import { render } from '@testing-library/react';
import { DecompositionTreeGraph, RadialTreeGraph } from '@ant-design/graphs';
import { t } from 'i18next';
import { escape } from 'querystring';
export const MeshTopo = () => {   
    const [data, setData] = React.useState({ hits: [] });
    const [data1, setData1] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            const result1= await ubusApi.show_mesh_config()
            setData1(result1.enabled_mode)
            const result = await ubusApi.show_mesh_topology()
            setData(result);
        };
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(interval);
    },[]);
    const config: any = {
        data,
        data1,
        width: 1500,
        height: 750,
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        layout: {
            type: 'indented',
            direction: 'LR',
            dropCap: false,
            indent: 500,
            getHeight: () => {
                return 200;
            },
            getWidth: () => {   
                return 500;
            },
        },
        nodeCfg: {
            autoWidth: true,
            size: [150, 40],
            title: {
                containerStyle: {
                    fill: '#0e4778',
                },
                style: (cfg: any) => {
                    return {
                        fill: cfg?.value?.title === '青年' ? 'yellow' : '#fff',
                    };
                },
            },
            items: {    
                containerStyle: {
                    fill: '#fff',
                },
                style: (cfg: any, group: any, type: any) => {
                    const styles: any = {
                        value: {
                            fill: '#000',
                        },
                        text: {
                            fill: '#000',
                        },
                        icon: {
                            width: 20,
                            height: 20,
                        },
                    };
                    return styles[type];
                },
            },
            nodeStateStyles: {
                hover: {
                    stroke: '#1890ff',
                    lineWidth: 2,
                },
            },
            style: {
                radius: [5, 5, 5, 5],
            },
        },
        markerCfg: (cfg: any) => {
            const { children } = cfg;
            return {
                show: children?.length,
            };
        },
    };
    const config1: any = {}
    if(data1 === "controller"){
    return <DecompositionTreeGraph {...config} />;
    }
    else{
        return <></>;
    }
}
export default MeshTopo;