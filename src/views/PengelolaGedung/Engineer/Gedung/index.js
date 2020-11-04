import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import ME from './ME'
import Ruangan from './Ruangan'

const Gedung = () => {
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
            Mechanical Electrical
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Ruangan
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <ME />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Ruangan />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Gedung
