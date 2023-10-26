import React, { useState } from 'react'
import { Layout, Typography, Image, } from 'antd'
import { MainMenu } from '../main-menu'
import LancsnetIcon from '../../../assets/icon/LancsnetIcon'
import { useDispatch, useSelector } from 'react-redux'
import { appStateActions, appStateSelector } from '../../../redux/reducer/appStateSlice'
import { LoginButton } from '../login-button'
import { ThemeSwitch } from '../theme-switch'
import { Outlet, Link } from "react-router-dom";
import { LocaleSwitch } from "../../../translations/i18n"
import { Session } from 'inspector'
import ReactLogo from '../../../lancs.jpg'

const { Header, Footer, Sider, Content } = Layout

const AntdLayout = (props: any) => {
  const { children, ...restProps } = props
  const { theme, sideBarCollapsed } = useSelector(appStateSelector)
  const dispatch = useDispatch()
  const [selectmenu, setselectmenu] = useState('')

  const refreshData = async () => {
    const mainmenu = sessionStorage.getItem('menu')
    if (!mainmenu || mainmenu === "") {
      setselectmenu("")
    } else {
      setselectmenu(mainmenu)
    }
  }
  React.useEffect(() => {
    refreshData()
  }, [])
  // console.log('dad: ', selectmenu)
  // window.location.reload();
  return (
    <Layout {...restProps}>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsible
        collapsedWidth={64}
        defaultCollapsed={false}
        onCollapse={(_collapsed) => {
          dispatch(appStateActions.setSideBarCollapsed(_collapsed))
        }}
      >
        <span>
          {/* <LancsnetIcon
            style={{ fontSize: 32, color: '#1890ff', margin: 16 }}
          /> */}
          <Image src={ReactLogo} width="4em" preview={false} alt="lancsnet"></Image>
          {!sideBarCollapsed ? (
            <span style={{
              textAlign: 'center',
              fontSize: 'large',
              fontWeight: '600',
              color: '#006af0',
              // textTransform: 'uppercase',
              // textShadow: "1px 1px 0px #8268886e,1px 2px 0px #8268886e,1px 3px 0px #957dad,1px 4px 0px #957dad,1px 5px 0px #957dad,1px 6px 0px #826888,1px 10px 5px #826888,1px 15px 10px #826888,1px 20px 30px #826888,1px 25px 50px #826888",
            }}>Local Web</span>
          ) : null}
        </span>
        <MainMenu setmenu={selectmenu} />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          // theme={theme}
          style={{ padding: 16, display: 'flex', alignItems: 'center',  background: "linear-gradient(45deg, #07117e, #07117e" }}
        >
          <div style={{ flex: 1 }} />
          {/* <ThemeSwitch /> */}
          <LocaleSwitch />
        </Header>
        <Content style={{ padding: 16, minHeight: '100vh' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {/* &copy; 2023&nbsp;<strong>Diem Tho</strong> */}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AntdLayout
