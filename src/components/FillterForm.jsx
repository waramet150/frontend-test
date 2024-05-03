import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { Col, Row, Slider } from "antd";

const FillterForm = ({ onFilterSap }) => {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout = {};
  const buttonItemLayout = null;

  return (
    <div style={{ width: "100%" }}>
      <span style={{ fontWeight: "bolder" }}>Ticket Evolution</span>
      <div style={{ marginTop: "16px" }}>
        <Form
          {...formItemLayout}
          layout={"vertical"}
          form={form}
          onValuesChange={onFormLayoutChange}
          style={{
            width: "100%",
          }}
        >
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Form.Item label="Technician :">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SAP Module :">
                <Input
                  onChange={(e) => {
                    console.log(e.target.value);
                    onFilterSap(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Request Type :">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Customer :">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default FillterForm;
