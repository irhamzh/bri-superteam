import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Brismart from './Brismart'
import Internal from './Internal'

const Evaluasi = () => {
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
            Evaluasi Brismart
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Evaluasi Internal
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Brismart />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Internal />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default Evaluasi
