import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Catering from './Catering'
import JasaPendidikan from './JasaPendidikan'
import Hotel from './Hotel'
import AkomodasiAsrama from './AkomodasiAsrama'

const FinanceProcurement = () => {
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
            Catering
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Jasa Pendidikan
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}
          >
            Hotel
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4')
            }}
          >
            Akomodasi Asrama
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Catering />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <JasaPendidikan />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <Hotel />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <AkomodasiAsrama />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default FinanceProcurement
