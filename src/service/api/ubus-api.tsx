import axios from 'axios'

const UBUS_PATH = 'ubus'
const DEFAULT_SESSION = '00000000000000000000000000000000'

class UbusApi {
  ubusRpcSession = DEFAULT_SESSION

  _instance: any = null
  _reqId = 1

  constructor(baseURL = '/') {
    console.log('Creating api instance', baseURL)
    this._instance = axios.create({ baseURL, timeout: 25000 })
  }

  cleanInit() {
    this.ubusRpcSession = DEFAULT_SESSION
  }

  ubusCall = async (section: any, method: any, param = {}) => {
    const inst: any = this._instance

    let tokenString = sessionStorage.getItem('token');

    if (method === 'login') {
      tokenString = DEFAULT_SESSION
    }

    try {
      const reqBody = {
        jsonrpc: '2.0',
        id: this._reqId++,
        method: 'call',
        params: [tokenString, section, method, param],
      }
      // console.log('reqBody', reqBody)
      const resp = await inst.post(UBUS_PATH, reqBody)



      if (resp.status === 200 || resp.status === 201) {
        const { /*jsonrpc, id,*/ result, error } = resp.data
        if (error) {
          // code -32002; Access denied
          // console.log(resp.data)
          if (error.code === -32002) {
            sessionStorage.removeItem('token')
            window.location.href = '/'
          }
          return error
        } else if (Array.isArray(result) && result?.length > 0) {
          // code 2 = invalid param ?
          return { code: result[0], data: result[1] }
        } else {
          return { code: -1, message: 'Invalid response', data: resp.data }
        }
      } else {
        return { code: -2, message: 'Unexpected status', data: resp.data }
      }
    } catch (err: any) {
      console.log('err', err)
      return { code: -3, message: `${err.code} | ${err.message}` }
    }
  }

  login = async (username: any, password = '') => {
    const respData = await this.ubusCall('session', 'login', {
      username,
      password,
    })
    if (respData.code === 0) {
      const { ubus_rpc_session /*timeout, expires*/ } = respData.data
      this.ubusRpcSession = ubus_rpc_session
    } else {
      console.log('LoginError', respData)
    }
    return respData
  }

  systemInfo() {
    let data=this.ubusCall('linksafe', 'dashboard')
    return data
  }

  async uciGet(config: any, section: any, option: any) {
    const result = await this.ubusCall('uci', 'get', {
      "config":config,
      "section":section,
    })
    if (result.code) {
      return {}
    }
    const data: any = {
      name: config,
      sections: Object.values(result.data),
    }
    return data
  }

  async uciSet(config: any, section: any, values: any) {
    const result = await this.ubusCall('uci', 'set', {
      config,
      section,
      values,
    })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async uciChanges(config: any) {
    const result = await this.ubusCall('uci', 'changes', { config })
    if (result.code) {
      console.log(result)
      return {}
    }
    // const { changes } = result.data
    // {"changes": {
    //   "system": [["set", "cfg01e48a", "hostname", "OpenWrt-Vbox"]]
    // }}
    return result.data
  }

  async uciApply(rollback: any) {
    const result = await this.ubusCall('uci', 'apply', { rollback, timeout: 25 })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async uciCommit(config: any) {
    const result = await this.ubusCall('uci', 'commit', { config })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  logout() {
    this.cleanInit()
  }

  ////function web local

  async linksafe_get_uuid() {
    const result = await this.ubusCall('linksafe', 'linksafe_get_uuid', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_lan(ifname: any, protov4: any, ipv4: any, netmask: any, protov6: any, ipv6: any) {
    const result = await this.ubusCall('linksafe', 'config_network_lan', { "param": [{ "protov4": protov4, "ipaddrv4": ipv4, "netmask": netmask, "protov6": protov6, "ipaddrv6": ipv6 }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_wireless(disabled: any, ssid: any, encryption: any, key: any) {
    const result = await this.ubusCall('linksafe', 'config_network_wireless', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_guest(disabled: any, ssid: any, encryption: any, key: any, limit: any, unit: any) {
    console.log("result: ", disabled, ssid, encryption, key, limit, unit)
    if (limit === null) {
      const result = await this.ubusCall('linksafe', 'config_network_guest', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption }] })
      if (result.code) {
        return {}
      }
      return result.data
    } else {
      const result = await this.ubusCall('linksafe', 'config_network_guest', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption, "limit_values": limit, "limit_unit": unit }] })
      if (result.code) {
        return {}
      }
      return result.data
    }
  }

  async config_network_wan(protov4: any, username: any, password: any, timeout: any, ipaddrv4: any, netmaskv4: any, gatewayv4: any, protov6: any, ipaddrv6: any, gatewayv6: any) {
    switch (protov4) {
      case 'static':
        switch (protov6) {
          case 'static':
            const result1 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": "enable", "ifname": "eth1", "name": "wan", "protov4": protov4, "username": username, "password": password, "timeout": timeout, "ipaddrv4": ipaddrv4, "netmaskv4": netmaskv4, "gatewayv4": gatewayv4, "protov6": protov6, "ipaddrv6": ipaddrv6, "gatewayv6": gatewayv6 }] })
            if (result1.code) {
              console.log(result1)
              return {}
            }
            return {};
          default:
            const result2 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": "enable","ifname": "eth1", "name": "wan", "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "ipaddrv4": ipaddrv4, "netmaskv4": netmaskv4, "gatewayv4": gatewayv4, "protov6": protov6 }] })
            if (result2.code) {
              console.log(result2)
              // console.log(result2_wan6)
              return {}
            }
        }
        return {};
      default:
        switch (protov6) {
          case 'static':
            const result1 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": "enable","ifname": "eth1", "name": "wan", "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "protov6": protov6, "ipaddrv6": ipaddrv6, "gatewayv6": gatewayv6 }] })
            if (result1.code) {
              console.log(result1)
              // console.log(result1_wan6)
              return {}
            }
            return {};
          default:
            const result2 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": "enable","ifname": "eth1", "name": "wan", "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "protov6": protov6 }] })
            if (result2.code) {
              console.log(result2)
              // console.log(result2_wan6)
              return {}
            }
        }
    }
  }

  async show_network_wireless() {
    const result = await this.ubusCall('linksafe', 'show_network_wireless')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_guest() {
    const result = await this.ubusCall('linksafe', 'show_network_guest')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_wan_congfig() {
    const result = await this.ubusCall('linksafe', 'show_network_wan_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_ddns(provider: any, enabled: any, mode: any, url: any, username: any, password: any, domain: any) {
    const result = await this.ubusCall('linksafe', 'config_network_ddns', { "param": [{ "provider": "DynDNS", "enabled": enabled, "mode": mode, "url": url, "username": username, "password": password, "domain": domain }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_ddns() {
    const result = await this.ubusCall('linksafe', 'show_network_ddns')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_static(status: any,id:any, target: any, nexthop: any, metric: any, device: any) {
    const result = await this.ubusCall('linksafe', 'config_network_static', { "param": [{ "status": status,"id":id , "target": target, "nexthop": nexthop, "metric": metric, "device": device }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_nat(status: any, name: any, protocol: any, wan_ip: any, wan_port: any, lan_ip: any, lan_port: any) {
    const result = await this.ubusCall('linksafe', 'config_network_nat', { "param": [{ "status": status, "name": name, "protocol": protocol, "wan_ip": wan_ip, "wan_port": wan_port, "lan_ip": lan_ip, "lan_port": lan_port }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_nat() {
    const result = await this.ubusCall('linksafe', 'show_network_nat')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_lan_config() {
    const result = await this.ubusCall('linksafe', 'show_network_lan_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_lan() {
    const result = await this.ubusCall('linksafe', 'show_network_lan')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dhcp_config() {
    const result = await this.ubusCall('linksafe', 'show_network_dhcp_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_dhcp(dhcpv4_status: any, dhcpv6_status: any, start: any, end: any, leasetime: any) {
    const result = await this.ubusCall('linksafe', 'config_network_dhcp', { "param": [{ "dhcpv4status": dhcpv4_status, "dhcpv6status": dhcpv6_status, "start": start, "end": end, "leasetime": leasetime }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_dns(primary: any, secondary: any) {
    const result = await this.ubusCall('linksafe', 'config_network_dns', { "param": [{ "primary": primary, "secondary": secondary }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dns_config() {
    const result = await this.ubusCall('linksafe', 'show_network_dns_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dhcp_leases() {
    const result = await this.ubusCall('linksafe', 'show_network_dhcp_leases')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_vlan() {
    const result = await this.ubusCall('linksafe', 'show_network_vlan')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_vlan(mode: any, action: any,id:any, name: any, vid: any, interfaces: any) {
    if (mode === "access") {
      const result = await this.ubusCall('linksafe', 'config_network_vlan', { "param": [{ "access": { "action": action,"id":id, "name": name, "vid": vid, "interface": interfaces } }] })
      if (result.code) {
        console.log(result)
        return {}
      }
      return result.data
    } else {
      const result = await this.ubusCall('linksafe', 'config_network_vlan', { "param": [{ "trunk": { "action": action,"id":id, "interface": interfaces, "vid": vid } }] })
      if (result.code) {
        console.log(result)
        return {}
      }
      return result.data
    }
  }

async show_network_multicast() {
  const result = await this.ubusCall('linksafe', 'show_network_multicast')
  if (result.code) {
    console.log(result)
    return {}
  }
  // console.log(result)
  return result.data
}


  /* system function */

  async config_system(hostname: any, timezone: any) {
    const result = await this.ubusCall('linksafe', 'config_system', {"param":[{"hostname": hostname,"timezone": timezone}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_reboot() {
    const result = await this.ubusCall('linksafe', 'config_system_reboot', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_system_shutdown() {
    const result = await this.ubusCall('linksafe', 'config_system_shutdown', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_system_rsfactory() {
    const result = await this.ubusCall('linksafe', 'config_system_factory', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_ping(props: any) {
    const { hostname, version, source, max, second, ttl } = props
    const result = await this.ubusCall('linksafe', 'config_system_ping', { "param": [{ "hostname": hostname, "version": version, "count": max, "sec": second, "ttl": ttl, "source": source}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_traceroute(props: any) {
    const { hostname, version, source, max, second, ttl } = props
    const result = await this.ubusCall('linksafe', 'config_system_traceroute', { "param": [{ "hostname": hostname, "version": version, "count": max, "sec": second, "ttl": ttl, "source": source}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_password(props: any) {
    const { current_password, new_password } = props
    const result = await this.ubusCall('linksafe', 'config_system_password', { "param": [{ "oldpass": current_password, "newpass": new_password}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_update() {
    const result = await this.ubusCall('linksafe', 'config_system_update', { })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  /* acl function */
  async config_url_filter(name: any, action: any, type: any, url: any) {
    const result = await this.ubusCall('linksafe', 'config_acl', { "param": [{ "name": name, "action": action, "type": type, "url": url }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_url_filter() {
    const result = await this.ubusCall('linksafe', 'show_acl')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }

  async show_ip_filter() {
    const result = await this.ubusCall('linksafe', 'show_acl')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_ip_filter(name: any, action: any, type: any, src: any, dest: any, sport: any, dport: any, tcp_udp: any) {
    const result = await this.ubusCall('linksafe', 'config_acl', { "param": [{ "name": name, "action": action, "type": type, "src": src, "dest": dest, "sport": sport, "dport": dport, "tcp_udp": tcp_udp }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_mesh_controller(enabled: any, ssid: any, key: any) {
    const result = await this.ubusCall('linksafe', 'config_mesh_controller', { "param": [{ "enabled": enabled, "ssid": ssid, "key": key }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_mesh_agent(enabled: any) {
    const result = await this.ubusCall('linksafe', 'config_mesh_agent', { "param": [{ "enabled": enabled }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_mesh_config() {
    const result = await this.ubusCall('linksafe', 'show_mesh_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_mesh_table() {
    const result = await this.ubusCall('linksafe', 'show_mesh_table',)
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_openvpn_server(action: any, name: any, status: any, mode: any, port: any, subnet: any, netmask: any, client_access: any, crt: any, key: any, ca: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": action, "name": name, "status": status, "mode": mode, "port": port, "subnet": subnet, "netmask": netmask,  "client_access": client_access, "crt": crt, "key": key, "ca": ca }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_openvpn() {
    const result = await this.ubusCall('linksafe', 'show_network_openvpn')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_openvpn_client(action: any, name: any, status: any, mode: any, server_ip: any, server_port: any, crt: any, key: any, ca: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": action, "name": name, "status": status, "mode": mode, "server_ip": server_ip, "server_port": server_port, "crt": crt, "key": key, "ca": ca }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_openvpn_del(name: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": "del", "name": name }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_openvpn_dev( action: any, crt: any, key:any, ca :any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": "del_crt", "crt": crt ,"key" : key, "ca": ca}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_openvpn_list(folder: any) {
    const result = await this.ubusCall('linksafe', 'show_list_folder', { "param": folder})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async show_network_relay() {
    const result = await this.ubusCall('linksafe', 'show_network_relay')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_relay(statusv4: any, statusv6: any) {
    const result = await this.ubusCall('linksafe', 'config_network_relay', { "param": [{"statusv4": statusv4, "statusv6": statusv6}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  
  async show_mesh_topology() {
    const result = await this.ubusCall('linksafe', 'show_mesh_topology')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async show_web_data(option: any) {
    const result = await this.ubusCall('linksafe', 'show_web_data', { "param": option})
    if (result.code) {

      return {}
    }
    return result.data
  }

  async show_network_routing(option: any) {
    const result = await this.ubusCall('linksafe', 'show_network_routing', { "param": option})
    if (result.code) {
      return {}
    }
    return result.data
  }

}

export default new UbusApi("http://192.168.168.1/")

