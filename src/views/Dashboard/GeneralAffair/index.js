import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row, Form, FormGroup } from 'reactstrap'
import { Bar, Pie } from 'react-chartjs-2'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Service from '../../../config/services'
import { AlertMessage, invalidValues } from '../../../helpers'

const GeneralAffair = () => {
  const [dataDashboard, setDataDashboard] = useState({})
  const [bulan, setBulan] = useState(null)
  const [tahun, setTahun] = useState(null)

  useEffect(() => {
    ;(async function getDataDashboard() {
      try {
        const resData = await Service.getDashboardGeneralAffair()
        const { data } = resData.data
        setDataDashboard(data)
      } catch (error) {
        AlertMessage.error(error)
      }
    })()
  }, [])

  let {
    totalApprovedKabag,
    totalApprovedWakabag,
    totalBelumBerjalan,
    totalProsesPersetujuan,
    totalSelesai,
  } = dataDashboard

  if (!totalApprovedKabag) totalApprovedKabag = 0
  if (!totalApprovedWakabag) totalApprovedWakabag = 0
  if (!totalBelumBerjalan) totalBelumBerjalan = 0
  if (!totalProsesPersetujuan) totalProsesPersetujuan = 0
  if (!totalSelesai) totalSelesai = 0

  const data = {
    labels: ['Belum Berjalan', 'Proses Persetujuan', 'Belum Selesai', 'Selesai'],
    datasets: [
      {
        data: [totalBelumBerjalan, totalProsesPersetujuan, totalApprovedKabag, totalSelesai],
        backgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
      },
    ],
  }

  const dataBar = {
    labels: ['Approved (Proses Persetujuan)', 'Approved (Kegiatan Selesai)'],
    datasets: [
      {
        barThickness: 90,
        maxBarThickness: 110,
        label: 'Data Fixed Asset',
        backgroundColor: ['rgba(0, 250, 154,0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(0, 250, 154, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(0, 250, 154,0.4)', 'rgba(54, 162, 235, 0.4)'],
        hoverBorderColor: ['rgba(0, 250, 154, 1)', 'rgba(54, 162, 235, 1)'],
        data: [totalApprovedWakabag, totalApprovedKabag],
      },
    ],
  }

  const filterData = async (e) => {
    e.preventDefault()
    if (invalidValues.includes(bulan)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }
    if (invalidValues.includes(tahun)) {
      AlertMessage.custom({ title: 'Error!', text: 'Pilih Bulan dan Tahun!', icon: 'error' })
      return false
    }

    try {
      const filteredDate = [{ id: 'month-year$createdAt', value: `${tahun}-${bulan}` }]
      const filterString = JSON.stringify(filteredDate)
      const params = `?filtered=${filterString}`
      const paramsEncoded = encodeURI(params)
      Swal.showLoading()
      const resData = await Service.getDashboardGeneralAffair(paramsEncoded)
      Swal.close()
      const { data } = resData.data
      setDataDashboard(data)
    } catch (error) {
      AlertMessage.error(error)
    }
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <Form onSubmit={(e) => filterData(e)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Select
                          isClearable
                          placeholder="Pilih Bulan..."
                          options={[
                            { label: 'Januari', value: '1' },
                            { label: 'Februari', value: '2' },
                            { label: 'Maret', value: '3' },
                            { label: 'April', value: '4' },
                            { label: 'Mei', value: '5' },
                            { label: 'Juni', value: '6' },
                            { label: 'Juli', value: '7' },
                            { label: 'Agustus', value: '8' },
                            { label: 'September', value: '9' },
                            { label: 'Oktober', value: '10' },
                            { label: 'November', value: '11' },
                            { label: 'Desember', value: '12' },
                          ]}
                          name="bulan"
                          onChange={(e) => setBulan(e?.value)}
                        />
                      </FormGroup>
                    </Col>
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
                          onChange={(e) => setTahun(e?.value)}
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
              <Link
                to="/dashboard/general-affair/belum-berjalan"
                style={{ textDecoration: 'none' }}
              >
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
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Belum
                        <br />
                        Berjalan
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>{totalBelumBerjalan}</span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to="/dashboard/general-affair/proses-persetujuan"
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
                      <i
                        className="icon-paper-clip"
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Proses
                        <br />
                        Persetujuan
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>
                        {totalProsesPersetujuan}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/general-affair/belum-selesai" style={{ textDecoration: 'none' }}>
                <Card style={{ backgroundColor: '#FFCE56', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i
                        className="icon-pin"
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Belum
                        <br />
                        Selesai
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>{totalApprovedKabag}</span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link to="/dashboard/general-affair/selesai" style={{ textDecoration: 'none' }}>
                <Card style={{ backgroundColor: '#36A2EB', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i
                        className="icon-badge"
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Selesai
                        <br />
                        <br />
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>{totalSelesai}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <div className="chart-wrapper" style={{ marginTop: `${40}px` }}>
                  <Bar
                    data={dataBar}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                              min: 0,
                              // max: 100,
                            },
                          },
                        ],
                      },
                    }}
                  />
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
              <Link
                to="/dashboard/general-affair/approved-proses-persetujuan"
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
                      <i
                        className="icon-calendar"
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Approved oleh Wakabag
                        <br />
                        (Proses Persetujuan)
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>
                        {totalApprovedWakabag}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to="/dashboard/general-affair/approved-selesai"
                style={{ textDecoration: 'none' }}
              >
                <Card style={{ backgroundColor: '#36A2EB', padding: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <i
                        className="icon-calendar"
                        style={{ fontSize: '50px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h3>
                        Approved oleh Kabag
                        <br />
                        (Kegiatan Selesai)
                      </h3>
                      <span style={{ color: 'white', fontSize: '30px' }}>{totalApprovedKabag}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* <Card style={{ backgroundColor: 'yellow' }}>
          <CardBody>
            <div>Jumlah pekerja yang akan pensiun di bulan depan: 40 orang</div>
          </CardBody>
        </Card>

        <Card style={{ backgroundColor: 'yellow' }}>
          <CardBody>
            <div>Jumlah kenaikan JG di bulan depan: 40 orang</div>
          </CardBody>
        </Card>

        <Card style={{ backgroundColor: 'yellow' }}>
          <CardBody>
            <div>Jumlah kenaikan PG di bulan depan: 40 orang</div>
          </CardBody>
        </Card>

        <Card style={{ backgroundColor: 'yellow' }}>
          <CardBody>
            <div>Jumlah PGS berakhir di bulan depan: 40 orang</div>
          </CardBody>
        </Card> */}
      </Col>
    </Row>
  )
}

export default GeneralAffair
