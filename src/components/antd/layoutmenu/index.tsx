import React from 'react'
import { Layout } from 'antd'
import { MainMenu } from '../main-menu'
import LancsnetIcon from '../../../assets/icon/LancsnetIcon'
import { useDispatch, useSelector } from 'react-redux'
import { appStateActions, appStateSelector } from '../../../redux/reducer/appStateSlice'
import { ThemeSwitch } from '../theme-switch'

const { Header, Footer, Sider, Content } = Layout

const AntdLayoutMenu = (props:any) => {
  const { children, ...restProps } = props
  const { theme, sideBarCollapsed } = useSelector(appStateSelector)
  const dispatch = useDispatch()

  return (
    <Layout {...restProps}>
      <Sider
        theme={theme}
        breakpoint="lg"
        collapsible
        collapsedWidth={64}
        defaultCollapsed={false}
        onCollapse={(_collapsed) => {
          dispatch(appStateActions.setSideBarCollapsed(_collapsed))
        }}
      >
        <span>
          <LancsnetIcon
            style={{ fontSize: 32, color: '#1890ff', margin: 16 }}
          />
          {!sideBarCollapsed ? (
            <span style={{ color: '#fff', fontSize: 18 }}>Lancs Network</span>
          ) : null}
        </span>
        <MainMenu />
      </Sider>
      <Layout style={{minHeight: '100vh'}}>
        <Header
          // theme={theme}
          style={{ padding: 16, display: 'flex', alignItems: 'center' }}
        >
          <div style={{ flex: 1 }} />
          <ThemeSwitch />
        </Header>
        <Content style={{ padding: 16, minHeight: '100vh' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          &copy; 2022&nbsp;<strong>Lancs Network</strong>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AntdLayoutMenu
