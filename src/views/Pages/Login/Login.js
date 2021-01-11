/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Row, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { signIn } from '../../../modules/auth/actions'
import { CfInputGroup } from '../../../components'
import { loginSchema } from '../../../validations/mvUser'

const initialValues = {
  email: '',
  password: '',
}

class Login extends Component {
  handleLogin = (values) => {
    const { signIn } = this.props
    signIn(values)
  }

  render() {
    const { auth, isLoading, message } = this.props
    if (auth) return (window.location.href = '/')

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={loginSchema}
                      onSubmit={(values, actions) => {
                        setTimeout(() => {
                          this.handleLogin(values)
                          actions.setSubmitting(false)
                        }, 1000)
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>

                          <Field
                            classGroup="mb-3"
                            classIcon="icon-user"
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
                            placeholder="*****"
                            component={CfInputGroup}
                          />
                          <Row>
                            <Col xs="6">
                              <Button
                                type="submit"
                                color="primary"
                                className="px-4"
                                disabled={isSubmitting || isLoading}
                              >
                                {isSubmitting || isLoading ? (
                                  <>
                                    <Spinner size="sm" color="light" />
                                    &nbsp;
                                  </>
                                ) : (
                                  <></>
                                )}
                                {isSubmitting || isLoading ? 'Loading...' : 'Login'}
                              </Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              {/* <Button color="link" className="px-0">
                                Forgot password?
                              </Button> */}
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
                  </CardBody>
                </Card>
                {/* <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: '44%' }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  signIn: PropTypes.func,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  message: state.auth.message,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
