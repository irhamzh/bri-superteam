import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'reactstrap'
import PropTypes from 'prop-types'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import withToggle, { WithToggleProps } from '../../HOC/withToggle'
import ModalForm from './ModalForm/ModalForm'

function DefaultHeader(props) {
  // eslint-disable-next-line
  const { modalForm, isLoading, signOut, className, children, ...attributes } = props

  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: 'BRI Corpu' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'BRI Corpu' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      {/* 
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav> 
      */}

      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
          <NavLink to="#" className="nav-link">
            <i className="icon-bell" />
            <Badge pill color="danger">
              5
            </Badge>
          </NavLink>
        </NavItem>

        <NavItem className="d-md-down-none">
          <NavLink to="#" className="nav-link">
            Hallo, Admin
          </NavLink>
        </NavItem>

        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img
              src="../../assets/img/avatars/6.jpg"
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center">
              <strong>Account</strong>
            </DropdownItem>
            <DropdownItem onClick={modalForm.toggle}>
              <i className="fa fa-user" />
              &nbsp; Change Password
            </DropdownItem>
            <DropdownItem onClick={signOut}>
              <i className="fa fa-lock" />
              &nbsp; Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>

      {/* <AppAsideToggler className="d-md-down-none" /> */}
      {/* <AppAsideToggler className="d-lg-none" mobile /> */}

      <ModalForm modalForm={modalForm} className={className} />
    </>
  )
}

DefaultHeader.propTypes = {
  children: PropTypes.node,
  modalForm: WithToggleProps,
}

export default withToggle({
  Component: DefaultHeader,
  toggles: {
    modalForm: false,
  },
})
