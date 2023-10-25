import { createBrowserRouter, Router } from 'react-router-dom'
import PageLogin from 'pages/login'
import StatusOverviewPage from 'pages/status/overview'
import NetworkInterfacesPage from 'pages/network/multicast'
import NetworkVlan from 'pages/network/vlan'
import NetworkLan from 'pages/network/lan'
import NetworkMesh from 'pages/network/mesh/mesh'
import PortForward from 'pages/security/port-forward'
import Ipfilter from 'pages/security/ipfilter'
import URLfilter from 'pages/security/URLfilter/URLfilterindex'
import ResgisLinksafe from 'pages/linksafe/resgistration'
import UlSystem from 'pages/system/ulfirmware'
import FactorySystem from 'pages/system/rsfactory'
import PingSystem from 'pages/system/ping'
import PacketSystem from 'pages/system/packet'
import SettingsSystem from 'pages/system/settings'
import RebootSystem from 'pages/system/reboot'
import ShutdownSystem from 'pages/system/shutdown'
import WirelessInterfacesPage from 'pages/network/wireless/basicwifi'
import WanSettingPage from 'pages/internet/wan/wan'
import DdnsSettingPage from 'pages/internet/ddns/ddns'
import OpenVpnInternet from 'pages/internet/openvpn'
import RootPage from 'pages/rootpage'


import StaticRoutes from 'pages/internet/router'
import { Logout } from 'components/antd/logout-box'

export default createBrowserRouter([
  {
    path: '/login',
    element: <PageLogin />,
  },
  {
    path: '/',
    element: <RootPage />,
    children: [
  {
    path: '/',
    element: <StatusOverviewPage />,
  },
  {
    path: 'network',
    children: [
      {
        path: 'igmp',
        element: <NetworkInterfacesPage />
      },
      {
        path: 'vlan',
        element: <NetworkVlan />
      },

      {
        path: 'lan',
        element: <NetworkLan />
      },
      {
        path: 'mesh',
        element: <NetworkMesh />
      },
      {
        path: 'basicwifi',
        element: <WirelessInterfacesPage />
      }
    ],
  },
  {
    path: 'internet',
    children: [
      {
        path: 'wan',
        element: <WanSettingPage />,
      },
      {
        path: 'ddns',
        element: <DdnsSettingPage />,
      },
      {
        path: 'openvpn',
        element: <OpenVpnInternet />,
      },
      {
        path: 'routing',
        element: <StaticRoutes />,
      },
    ],
  },
  {
    path: 'security',
    children: [
      {
        path: 'portforward',
        element: <PortForward />,
      },
      {
        path: 'ipfilter',
        element: <Ipfilter />,
      },
      {
        path: 'urlfilter',
        element: <URLfilter />,
      },

    ],
  },
  {
    path: 'linksafe',
    children: [
      {
        path: 'register',
        element: <ResgisLinksafe />,
      },

    ],
  },
  {
    path: 'system',
    children: [
      {
        path: 'update',
        element: <UlSystem />,
      },
      {
        path: 'reboot',
        element: <RebootSystem />,
      },
      {
        path: 'shutdown',
        element: <ShutdownSystem />,
      },
      {
        path: 'rsfactory',
        element: <FactorySystem />,
      },
      {
        path: 'ping',
        element: <PingSystem />,
      },
      {
        path: 'system',
        element: <SettingsSystem />,
      },
      {
        path: 'traceroute',
        element: <PacketSystem />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  }
],
  }
])
