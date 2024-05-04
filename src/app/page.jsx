'use client';
import styles from './page.module.css';
import { Rate, Button, Table } from 'antd';
import { Form, Input } from 'antd';
import { Col, Row } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import { utils, writeFileXLSX } from 'xlsx';
import { RedoOutlined, FileExcelOutlined } from '@ant-design/icons';

export default function Home () {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      sorter: {
        compare: (a, b) => a.ticketId - b.ticketId,
        multiple: 1
      }
    },
    {
      title: 'Customer',
      dataIndex: 'customer'
    },
    {
      title: 'Subject',
      dataIndex: 'subject'
    },
    {
      title: 'Module',
      dataIndex: 'module'
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType'
    },
    {
      title: 'Technician',
      dataIndex: 'technician'
    },
    {
      title: 'Evolution',
      dataIndex: 'evolution',
      sorter: {
        compare: (a, b) => a.evolution - b.evolution,
        multiple: 2
      },
      render: evolution => <Rate disabled defaultValue={evolution} />
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate'
    }
  ];

  const data = [
    {
      key: '1',
      ticketId: 129,
      customer: 'NutWONG',
      subject: 'ไม่สามารถ TECO job ได้',
      module: 'PP',
      requestType: 'Incident',
      technician: 'Nutchanart Wongsuban',
      evolution: 5,
      lastUpdate: '03/05/2024'
    },
    {
      key: '2',
      ticketId: 127,
      customer: 'NutWONG',
      subject: 'ไม่สามารถเปิด PO',
      module: 'MM',
      requestType: 'New Requirement',
      technician: 'Mat',
      evolution: 3,
      lastUpdate: '03/05/2024'
    },
    {
      key: '3',
      ticketId: 15,
      customer: 'Babe',
      subject: 'ไม่สามารถเปิด PO',
      module: 'MM',
      requestType: 'New Requirement',
      technician: 'Nutchanart Wongsuban',
      evolution: 2,
      lastUpdate: '03/05/2024'
    },
    {
      key: '4',
      ticketId: 103,
      customer: 'Babe',
      subject: 'ไม่สามารถเปิด PO',
      module: 'PP',
      requestType: 'New Requirement',
      technician: 'Nutchanart Wongsuban',
      evolution: 2,
      lastUpdate: '03/05/2024'
    },
    {
      key: '5',
      ticketId: 1,
      customer: 'SAM',
      subject: 'ไม่สามารถเปิด PO',
      module: 'MM',
      requestType: 'New Requirement',
      technician: 'Nutchanart Wongsuban',
      evolution: 3,
      lastUpdate: '03/05/2024'
    }
  ];

  const [filterData, setFilterData] = useState(data);

  const [searchValues, setSearchValues] = useState({
    inputTech: '', // เก็บค่า input
    inputSap: '',
    inputRequest: '',
    inputCustomer: ''
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearchValues(prev => ({ ...prev, [name]: value }));
    // set value and name
  };

  useEffect(
    () => {
      handleSearch();
    },
    [searchValues]
  ); // เมื่อ searchValues เปลี่ยนแปลงเท่านั้น

  const handleSearch = () => {
    const filtered = data.filter(item => {
      return (
        item.technician
          .toLowerCase()
          .includes(searchValues.inputTech.toLowerCase()) &&
        item.module
          .toLowerCase()
          .includes(searchValues.inputSap.toLowerCase()) &&
        item.requestType
          .toLowerCase()
          .includes(searchValues.inputRequest.toLowerCase()) &&
        item.customer
          .toLowerCase()
          .includes(searchValues.inputCustomer.toLowerCase())
      );
    });
    setFilterData(filtered);
    console.log(filtered);
  };
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = currentDate.getMonth().toString().padStart(2, '0');

  /* get state data and export to XLSX */
  const exportFile = useCallback(
    () => {
      const ws = utils.json_to_sheet(filterData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');
      writeFileXLSX(
        wb,
        `Ticket_Evolution_${day}_${month}_${currentDate.getFullYear()}.xlsx`
      );
    },
    [filterData]
  );

  return (
    <main className={styles.main}>
      <div style={{ width: '100%' }}>
        <span style={{ fontWeight: 'bolder' }}>Ticket Evolution</span>
        <div style={{ marginTop: '16px' }}>
          <Form
            layout={'vertical'}
            form={form}
            style={{
              width: '100%'
            }}
          >
            <Row gutter={[32, 16]}>
              <Col span={12}>
                <Form.Item label='Technician :'>
                  <Input
                    value={searchValues.inputTech}
                    name='inputTech'
                    onChange={handleInputChange}
                    // รับ value จาก input
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='SAP Module :'>
                  <Input
                    value={searchValues.inputSap}
                    name='inputSap'
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='Request Type :'>
                  <Input
                    value={searchValues.inputRequest}
                    name='inputRequest'
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Customer :'>
                  <Input
                    value={searchValues.inputCustomer}
                    name='inputCustomer'
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', marginBottom: '24px' }}>
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              setFilterData(data);
              // clear value
              setSearchValues({
                inputTech: '',
                inputSap: '',
                inputRequest: '',
                inputCustomer: ''
              });
            }}
            icon={<RedoOutlined />}
          >
            refresh
          </Button>
        </div>
        <div style={{ flex: '0' }}>
          <Button
            style={{ color: 'green' }}
            icon={<FileExcelOutlined style={{ color: 'green' }} />}
            onClick={() => {
              exportFile();
            }}
          >
            Export Exel
          </Button>
        </div>
      </div>

      <Table
        style={{ width: '100%' }}
        id='aa'
        columns={columns}
        dataSource={filterData}
        onChange={onChange}
      />

      {/* <table ref={tbl}>
        <thead>
          <tr>
            {columns.map((column) => {
              return <td key={column.dataIndex}>{column.title}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {filterData.map((row) => {
            return (
              <tr key={row.key}>
                <td>{row.ticketId}</td>
                <td>{row.customer}</td>
                <td>{row.subject}</td>
                <td>{row.module}</td>
                <td>{row.requestType}</td>
                <td>{row.technician}</td>
                <td>{row.evolution}</td>
                <td>{row.lastUpdate}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </main>
  );
}
