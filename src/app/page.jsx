"use client";
import styles from "./page.module.css";
import { Rate, Button, Table } from "antd";
import { Form, Input } from "antd";
import { Col, Row } from "antd";
import React, { useCallback, useState, useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { RedoOutlined, FileExcelOutlined } from "@ant-design/icons";

export default function Home() {
  // const tbl = useRef();

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
      render: (evolution) => <Rate disabled defaultValue={evolution} />,
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
      evolution: 5,
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
      evolution: 3,
      lastUpdate: "03/05/2024",
    },
    {
      key: "3",
      ticketId: 15,
      customer: "Babe",
      subject: "ไม่สามารถเปิด PO",
      module: "MM",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: 2,
      lastUpdate: "03/05/2024",
    },
    {
      key: "4",
      ticketId: 103,
      customer: "Babe",
      subject: "ไม่สามารถเปิด PO",
      module: "PP",
      requestType: "New Requirement",
      technician: "Nutchanart Wongsuban",
      evolution: 2,
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
      evolution: 3,
      lastUpdate: "03/05/2024",
    },
  ];

  const [filterData, setFilterData] = useState(data);
  const [inputTech, setInputTech] = useState("");
  const [inputSap, setInputSap] = useState("");
  const [inputRequest, setInputRequest] = useState("");
  const [inputCustomer, setInputCustomer] = useState("");

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // const onFilterTechnician = (value) => {
  //   const filter = data.filter((item) =>
  //     item.technician.toLowerCase().includes(value)
  //   );

  //   setFilterData(filter);
  // };

  // const onFilterSap = (value) => {
  //   const filter = data.filter((item) =>
  //     item.module.toLowerCase().includes(value)
  //   );

  //   setFilterData(filter);
  // };

  // const onFilterRequest = (value) => {
  //   const filter = data.filter((item) =>
  //     item.requestType.toLowerCase().includes(value)
  //   );

  //   setFilterData(filter);
  // };

  // const onFilterCustomer = (value) => {
  //   const filter = data.filter((item) =>
  //     item.customer.toLowerCase().includes(value)
  //   );

  //   setFilterData(filter);
  // };

  const filterAll = (value, fieldName) => {
    let filter = [];

    if (fieldName === "tech") {
      filter = filterData.filter((item) => {
        return item.technician.toLowerCase().includes(value);
      });
    }

    if (fieldName === "module") {
      filter = filterData.filter((item) => {
        return item.module.toLowerCase().includes(value);
      });
    }

    if (fieldName === "request") {
      filter = filterData.filter((item) => {
        return item.requestType.toLowerCase().includes(value);
      });
    }

    if (fieldName === "customer") {
      filter = filterData.filter((item) => {
        return item.customer.toLowerCase().includes(value);
      });
    }

    console.log("filter :>> ", filter);

    setFilterData(filter);
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = currentDate.getMonth().toString().padStart(2, "0");

  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(filterData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(
      wb,
      `Ticket_Evolution_${day}_${month}_${currentDate.getFullYear()}.xlsx`
    );
  }, [filterData]);

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
                    value={inputTech}
                    onChange={(e) => {
                      // onFilterTechnician(e.target.value);
                      setInputTech(e.target.value);
                      filterAll(e.target.value, "tech");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="SAP Module :">
                  <Input
                    value={inputSap}
                    onChange={(e) => {
                      // onFilterSap(e.target.value);
                      setInputSap(e.target.value);
                      filterAll(e.target.value, "module");
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Request Type :">
                  <Input
                    value={inputRequest}
                    onChange={(e) => {
                      // onFilterRequest(e.target.value);
                      setInputRequest(e.target.value);
                      filterAll(e.target.value, "request");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer :">
                  <Input
                    value={inputCustomer}
                    onChange={(e) => {
                      // onFilterCustomer(e.target.value);
                      setInputCustomer(e.target.value);
                      filterAll(e.target.value, "customer");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setFilterData(data);
              setInputTech("");
              setInputSap("");
              setInputRequest("");
              setInputCustomer("");
            }}
            icon={<RedoOutlined />}
          >
            refresh
          </Button>
        </div>
        <div style={{ flex: "0" }}>
          <Button
            style={{ color: "green" }}
            icon={<FileExcelOutlined style={{ color: "green" }} />}
            onClick={() => {
              // // generate workbook from table element
              // const wb = utils.table_to_book(tbl.current);
              // // write to XLSX
              // writeFileXLSX(
              //   wb,
              //   `Ticket_Evolution_${day}_${month}_${currentDate.getFullYear()}.xlsx`
              // );
              exportFile();
            }}
          >
            Export Exel
          </Button>
        </div>
      </div>

      <Table
        style={{ width: "100%" }}
        id="aa"
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
