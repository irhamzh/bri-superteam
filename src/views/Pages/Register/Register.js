import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Spinner } from 'reactstrap'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { signUp } from '../../../modules/auth/actions'
import { CfInputGroup } from '../../../components'

const initialValues = {
  email: '',
  password: '',
  passwordConfim: '',
}

const registerSchema = Yup.object().shape({
  name: Yup.string().required('name belum diisi'),
  role: Yup.string().required('role belum diisi'),
  email: Yup.string().email('gunakan email yang valid').required('email belum diisi'),
  password: Yup.string().required('password belum diisi').min(6),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

class Register extends Component {
  handleRegister = (values) => {
    const { signUp } = this.props
    signUp(values)
  }

  render() {
    const { auth, isLoading, message } = this.props
    if (auth) return (window.location.href = '/')

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        this.handleRegister(values)
                        actions.setSubmitting(false)
                      }, 1000)
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <h1>Register</h1>
                        <p className="text-muted">Create your account</p>

                        <Field
                          classGroup="mb-3"
                          classIcon="icon-user"
                          type="text"
                          name="name"
                          placeholder="Name"
                          component={CfInputGroup}
                        />
                        <Field
                          classGroup="mb-3"
                          classIcon="icon-envelope"
                          type="email"
                          name="email"
                          placeholder="example@mail.com"
                          component={CfInputGroup}
                        />

                        <Field
                          classGroup="mb-4"
                          classIcon="icon-lock"
                          type="password"
                          name="password"
                          placeholder="Password"
                          component={CfInputGroup}
                        />
                        <Field
                          classGroup="mb-4"
                          classIcon="icon-lock"
                          type="password"
                          name="passwordConfirm"
                          placeholder="Confirm Password"
                          component={CfInputGroup}
                        />
                        <Row>
                          <Col xs="12">
                            <Button
                              type="submit"
                              color="success"
                              className="px-4"
                              disabled={isSubmitting || isLoading}
                              block
                            >
                              {isSubmitting || isLoading ? (
                                <>
                                  <Spinner size="sm" color="light" />
                                  &nbsp;
                                </>
                              ) : (
                                <></>
                              )}
                              {isSubmitting || isLoading ? 'Loading...' : 'Create Account'}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>

                  <br />
                  {message ? (
                    <span className="form-text text-danger">
                      <b>{message}</b>
                    </span>
                  ) : null}
                  <br />
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="12">
                      <Link to="/login">
                        <Button className="btn-info mb-1" block>
                          <span>Login</span>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Register.propTypes = {
  auth: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  signUp: PropTypes.func,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  message: state.auth.message,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  signUp: (credentials) => dispatch(signUp(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
