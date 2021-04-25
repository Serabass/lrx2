import React from "react";
import { Col, Row } from "antd";
import { chord } from "./chords/chord";
import { ChordFingering2 } from "./chords/cf";
import { ChordTransposer } from "./chords";

const Sandbox = function () {
  let chrd = chord`Am`;
  return (
    <Row>
      <Col md={24}>
        <Row>
          <Col md={24}>
            <ChordTransposer min={-6} max={6} />
          </Col>
        </Row>
        <Row>
          <Col offset={2} md={6}>
            <ChordFingering2 chord={chrd} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default (Sandbox);
