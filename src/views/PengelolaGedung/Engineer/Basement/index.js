import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import AC from './AC'
import WaterMeter from './WaterMeter'
import Listrik from './Listrik'
import Plumbing from './Plumbing'
import STP from './STP'

const Basement = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1')
            }}
          >
            Water Meter
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Listrik
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}
          >
            AC
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4')
            }}
          >
            Plumbing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('5')
            }}
          >
            STP
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <WaterMeter />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Listrik />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <AC />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Plumbing />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <STP />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Basement
