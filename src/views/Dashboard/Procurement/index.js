import React from 'react'
import { Button, Card, CardBody, Col, Row, Form, FormGroup } from 'reactstrap'
import { Bar, Line, Pie, Polar } from 'react-chartjs-2'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import Service from '../../../config/services'
import { AlertMessage, invalidValues } from '../../../helpers'

const data = {
  labels: ['Red', 'Green', 'Yellow', 'Blue'],
  datasets: [
    {
      data: [300, 50, 10, 120],
      backgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
    },
  ],
}

const Procurement = (props) => {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <Form onSubmit={(e) => {}}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Select
                          isClearable
                          placeholder="Pilih tahun..."
                          options={[
                            { value: 2018, label: '2018' },
                            { value: 2019, label: '2019' },
                            { value: 2020, label: '2020' },
                            { value: 2021, label: '2021' },
                            { value: 2022, label: '2022' },
                          ]}
                          name="tahun"
                          className=""
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Select
                          isClearable
                          placeholder="Pilih Bulan..."
                          options={[
                            { label: 'Januari', value: 'Januari' },
                            { label: 'Februari', value: 'Februari' },
                            { label: 'Maret', value: 'Maret' },
                            { label: 'April', value: 'April' },
                            { label: 'Mei', value: 'Mei' },
                            { label: 'Juni', value: 'Juni' },
                            { label: 'Juli', value: 'Juli' },
                            { label: 'Agustus', value: 'Agustus' },
                            { label: 'September', value: 'September' },
                            { label: 'Oktober', value: 'Oktober' },
                            { label: 'November', value: 'November' },
                            { label: 'Desember', value: 'Desember' },
                          ]}
                          name="bulan"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="1">
                      <Button type="submit" color="primary">
                        <i className="fa fa-filter" />
                      </Button>
                    </Col>
                    <Col sm="3" />
                  </Row>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <div className="chart-wrapper" style={{ marginTop: `${40}px` }}>
                  {/* {pie.labels.length == 0 && (
                    <div className="alert alert-secondary text-center"> Data belum tersedia </div>
                  )} */}

                  <Pie data={data} />
                </div>
              </Col>
            </Row>

            <div
              style={{
                marginTop: '30px',

                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'baseline',
              }}
            >
              <Link to="/dashboard/procurement/belum-berjalan" style={{ textDecoration: 'none' }}>
                <Card style={{ backgroundColor: '#FF6384', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i
                        className="icon-social-dropbox"
                        style={{ fontSize: '50px', color: 'white' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Belum
                        <br />
                        Berjalan
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>13</span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to="/dashboard/procurement/proses-persetujuan"
                style={{ textDecoration: 'none' }}
              >
                <Card style={{ backgroundColor: '#00FA9A', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i className="icon-paper-clip" style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    <div>
                      <h3>
                        Proses
                        <br />
                        Persetujuan
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>13</span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/procurement/belum-selesai" style={{ textDecoration: 'none' }}>
                <Card style={{ backgroundColor: '#FFCE56', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i className="icon-pin" style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    <div>
                      <h3>
                        Belum
                        <br />
                        Selesai
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>13</span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/procurement/selesai" style={{ textDecoration: 'none' }}>
                <Card style={{ backgroundColor: '#36A2EB', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i className="icon-badge" style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    <div>
                      <h3>
                        Selesai
                        <br />
                        <br />
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>13</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Procurement
