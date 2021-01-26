import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Row, Form, FormGroup } from 'reactstrap'
import { Bar, Pie } from 'react-chartjs-2'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Service from '../../../config/services'
import { AlertMessage, formatDateSystem, getYearOptions, invalidValues } from '../../../helpers'

const Procurement = () => {
  const [dataDashboardToday, setDataDashboardToday] = useState({})
  const [dataDashboard, setDataDashboard] = useState({})
  const [bulan, setBulan] = useState(null)
  const [tahun, setTahun] = useState(null)
  const [monthYear, setMonthYear] = useState('')
  const today = formatDateSystem(new Date())

  useEffect(() => {
    ;(async function getDataDashboard() {
      try {
        Swal.showLoading()
        const resData = await Service.getDashboardProcurement()
        const { data } = resData.data
        setDataDashboard(data)

        const filteredDate = [{ id: 'atDate$createdAt', value: `${today}` }]
        const filterString = JSON.stringify(filteredDate)
        const params = `?filtered=${filterString}`
        const paramsEncoded = encodeURI(params)
        const resDataToday = await Service.getDashboardProcurement(paramsEncoded)
        Swal.close()
        setDataDashboardToday(resDataToday.data?.data)
      } catch (error) {
        AlertMessage.error(error)
      }
    })()
  }, [])

  let {
    totalApprovedKabag: totalApprovedKabagToday,
    totalApprovedWakabag: totalApprovedWakabagToday,
    totalBelumBerjalan: totalBelumBerjalanToday,
    totalProsesPersetujuan: totalProsesPersetujuanToday,
    totalSelesai: totalSelesaiToday,
  } = dataDashboardToday

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

  if (!totalApprovedKabagToday) totalApprovedKabagToday = 0
  if (!totalApprovedWakabagToday) totalApprovedWakabagToday = 0
  if (!totalBelumBerjalanToday) totalBelumBerjalanToday = 0
  if (!totalProsesPersetujuanToday) totalProsesPersetujuanToday = 0
  if (!totalSelesaiToday) totalSelesaiToday = 0

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

  const dataToday = {
    labels: ['Belum Berjalan', 'Proses Persetujuan', 'Belum Selesai', 'Selesai'],
    datasets: [
      {
        data: [
          totalBelumBerjalanToday,
          totalProsesPersetujuanToday,
          totalApprovedKabagToday,
          totalSelesaiToday,
        ],
        backgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#00FA9A', '#FFCE56', '#36A2EB'],
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
      setMonthYear(`${tahun}-${bulan}`)
      const filteredDate = [{ id: 'month-year$createdAt', value: `${tahun}-${bulan}` }]
      const filterString = JSON.stringify(filteredDate)
      const params = `?filtered=${filterString}`
      const paramsEncoded = encodeURI(params)
      Swal.showLoading()
      const resData = await Service.getDashboardProcurement(paramsEncoded)
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
                <h4 className="text-primary text-center">Data Procurement Hari Ini</h4>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <div className="chart-wrapper" style={{ marginTop: `${40}px` }}>
                  {/* {pie.labels.length == 0 && (
                    <div className="alert alert-secondary text-center"> Data belum tersedia </div>
                  )} */}

                  <Pie height={80} data={dataToday} />
                </div>
              </Col>
            </Row>

            <div
              style={{
                marginTop: '30px',

                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to={`/dashboard/procurement/belum-berjalan?date=${today}`}
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
                        style={{ fontSize: '30px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h4>
                        Belum
                        <br />
                        Berjalan
                      </h4>
                      <span style={{ color: 'white', fontSize: '30px' }}>
                        {totalBelumBerjalanToday}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to={`/dashboard/procurement/proses-persetujuan?date=${today}`}
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
                        style={{ fontSize: '30px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h4>
                        Proses
                        <br />
                        Persetujuan
                      </h4>
                      <span style={{ color: 'white', fontSize: '30px' }}>
                        {totalProsesPersetujuanToday}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to={`/dashboard/procurement/belum-selesai?date=${today}`}
                style={{ textDecoration: 'none' }}
              >
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
                        style={{ fontSize: '30px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h4>
                        Belum
                        <br />
                        Selesai
                      </h4>
                      <span style={{ color: 'white', fontSize: '30px' }}>
                        {totalApprovedKabagToday}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link
                to={`/dashboard/procurement/selesai?date=${today}`}
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
                        className="icon-badge"
                        style={{ fontSize: '30px', color: 'white', marginRight: '30px' }}
                      />
                    </div>
                    <div>
                      <h4>
                        Selesai
                        <br />
                        <br />
                      </h4>
                      <span style={{ color: 'white', fontSize: '30px' }}>{totalSelesaiToday}</span>
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
                          options={getYearOptions()}
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
                flexWrap: 'wrap',
              }}
            >
              <Link
                to={`/dashboard/procurement/belum-berjalan${
                  monthYear ? `?monthYear=${monthYear}` : ''
                }`}
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
                to={`/dashboard/procurement/proses-persetujuan${
                  monthYear ? `?monthYear=${monthYear}` : ''
                }`}
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

              <Link
                to={`/dashboard/procurement/belum-selesai${
                  monthYear ? `?monthYear=${monthYear}` : ''
                }`}
                style={{ textDecoration: 'none' }}
              >
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

              <Link
                to={`/dashboard/procurement/selesai${monthYear ? `?monthYear=${monthYear}` : ''}`}
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
                to={`/dashboard/procurement/approved-proses-persetujuan${
                  monthYear ? `?monthYear=${monthYear}` : ''
                }`}
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
                to={`/dashboard/procurement/approved-selesai${
                  monthYear ? `?monthYear=${monthYear}` : ''
                }`}
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
      </Col>
    </Row>
  )
}

export default Procurement
