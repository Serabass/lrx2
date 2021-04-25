import { Col, Divider, Row, Select } from "antd";
import { LRXDocument, If } from "../common";
import { LRX } from "./LRX";
import React, { useState } from "react";
import * as parser from "../parser";

interface ContentProps {
  els: HTMLScriptElement[];
}

export function Content({ els }: ContentProps) {
  let [activeTab, setActiveTab] = useState(0);
  let el = els[activeTab];
  let mp3 = el.dataset.mp3;
  let contents = el.innerHTML;
  let source = contents.replace(/^\s+/, "");
  let lrxDoc: LRXDocument = parser.parse(source) as LRXDocument;
  let editable = el.dataset.editable === "true";

  return (
    <Row>
      <Col md={24}>
        <Row>
          <Col md={24}>
            <Select
              value={activeTab}
              onChange={(value) => {
                setActiveTab(value);
              }}
            >
              {els.map((el, i) => {
                let contents = el.innerHTML;
                let source = contents.replace(/^\s+/, "");
                let lrxDoc: LRXDocument = parser.parse(source) as LRXDocument;
                return (
                  <Select.Option value={i} key={i}>
                    {lrxDoc.title.title}
                  </Select.Option>
                );
              })}
            </Select>
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <If condition={!editable}>
              <LRX doc={lrxDoc} audioUrl={mp3} />
            </If>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
