import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Swakelola from './Swakelola'
import PembelianLangsung from './PembelianLangsung'
import PenunjukanLangsung from './Penunjukan Langsung'
import PemilihanLangsung from './PemilihanLangsung'
import Lelang from './Lelang'

const BarangJasa = (props) => {
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
            Swakelola
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Pembelian Langsung
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}
          >
            Penunjukan Langsung
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4')
            }}
          >
            Pemilihan Langsung
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('5')
            }}
          >
            Lelang
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" style={{ height: '100%' }}>
          <Row>
            <Col sm="12">
              <Swakelola />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <PembelianLangsung />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <PenunjukanLangsung />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <PemilihanLangsung />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5" style={{ height: '100vh' }}>
          <Row>
            <Col sm="12">
              <Lelang />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default BarangJasa
