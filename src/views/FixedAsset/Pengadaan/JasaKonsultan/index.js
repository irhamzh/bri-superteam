import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

const JasaKonsultan = (props) => {
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
            Seleksi Langsung
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Penunjukan Langsung
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2" style={{ height: '100vh' }}>
          <Row>
            <Col sm="6">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default JasaKonsultan
