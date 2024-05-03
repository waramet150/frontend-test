"use client";
import styles from "./page.module.css";
import { Table } from "antd";
import { Rate } from "antd";
import { Form, Input } from "antd";
import { Col, Row } from "antd";
import React, { useState } from "react";

export default function Home() {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      sorter: {
        compare: (a, b) => a.ticketId - b.ticketId,
        multiple: 1,
      },
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Module",
      dataIndex: "module",
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
    },
    {
      title: "Technician",
      dataIndex: "technician",
    },
    {
      title: "Evolution",
      dataIndex: "evolution",
      sorter: {
        compare: (a, b) => a.evolution - b.evolution,
        multiple: 2,
      },
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
    },
  ];

  const data = [
    {
      key: "1",
      ticketId: 129,
      customer: "NutWONG",
      subject: "ไม่สามารถ TECO job ได้",
      module: "PP",
      requestType: "Incident",
      technician: "Nutchanart Wongsuban",
      evolution: <Rate disabled defaultValue={5} />,
      lastUpdate: "03/05/2024",
    },
    {
      key: "2",
      ticketId: 127,
      customer: "NutWONG",
      subject: "ไม่สามารถเปิด PO",
      module: "MM",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: <Rate disabled defaultValue={3} />,
      lastUpdate: "03/05/2024",
    },
    {
      key: "3",
      ticketId: 15,
      customer: "NutWONG",
      subject: "ไม่สามารถเปิด PO",
      module: "MM",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: <Rate disabled defaultValue={2} />,
      lastUpdate: "03/05/2024",
    },
    {
      key: "4",
      ticketId: 103,
      customer: "NutWONG",
      subject: "ไม่สามารถเปิด PO",
      module: "MM",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: <Rate disabled defaultValue={5} />,
      lastUpdate: "03/05/2024",
    },
    {
      key: "5",
      ticketId: 1,
      customer: "NutWONG",
      subject: "ไม่สามารถเปิด PO",
      module: "MM",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: <Rate disabled defaultValue={3} />,
      lastUpdate: "03/05/2024",
    },
  ];

  const [filterData, setFilterData] = useState(data);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onFilterTechnician = (value) => {
    console.log(value);
    const filter = data.filter((item) =>
      item.technician.toLowerCase().includes(value)
    );

    setFilterData(filter);
  };

  const onFilterSap = (value) => {
    const filter = data.filter((item) =>
      item.module.toLowerCase().includes(value)
    );

    setFilterData(filter);
  };

  const onFilterRequest = (value) => {
    const filter = data.filter((item) =>
      item.requestType.toLowerCase().includes(value)
    );

    setFilterData(filter);
  };

  const onFilterCustomer = (value) => {
    const filter = data.filter((item) =>
      item.customer.toLowerCase().includes(value)
    );

    setFilterData(filter);
  };

  return (
    <main className={styles.main}>
      <div style={{ width: "100%" }}>
        <span style={{ fontWeight: "bolder" }}>Ticket Evolution</span>
        <div style={{ marginTop: "16px" }}>
          <Form
            layout={"vertical"}
            form={form}
            style={{
              width: "100%",
            }}
          >
            <Row gutter={[32, 16]}>
              <Col span={12}>
                <Form.Item label="Technician :">
                  <Input
                    onChange={(e) => {
                      onFilterTechnician(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="SAP Module :">
                  <Input
                    onChange={(e) => {
                      onFilterSap(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Request Type :">
                  <Input
                    onChange={(e) => {
                      onFilterRequest(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer :">
                  <Input
                    onChange={(e) => {
                      onFilterCustomer(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <Table columns={columns} dataSource={filterData} onChange={onChange} />
    </main>
  );
}
