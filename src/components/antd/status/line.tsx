import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/plots';

const Line = () => {
  const uvBillData = [
    {
      time: '3',
      count: 800,
      name: 'he',
    },
  ];
  const transformData = [
    {
      time: '3',
      count: 800,
      name: 'a',
    },
    {
      time: '4',
      count: 600,
      name: 'a',
    },
    {
      time: '5',
      count: 400,
      name: 'a',
    },
    {
      time: '6',
      count: 380,
      name: 'a',
    },
    {
      time: '7',
      count: 220,
      name: 'a',
    },
    {
      time: '3',
      count: 750,
      name: 'b',
    },
    {
      time: '4',
      count: 650,
      name: 'b',
    },
    {
      time: '5',
      count: 450,
      name: 'b',
    },
    {
      time: '6',
      count: 400,
      name: 'b',
    },
    {
      time: '7',
      count: 320,
      name: 'b',
    },
  ];
  const config = {
    data: [transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        seriesField: 'type',
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        point: {},
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default Line;