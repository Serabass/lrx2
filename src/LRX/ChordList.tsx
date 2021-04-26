import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { If, LRXChord } from "../common";
import { ChordFingering2 } from "../chords/cf";

export interface ChordListProps {
  list: LRXChord[];
}

export function ChordList({ list }: ChordListProps) {
  let [showChords, setShowChords] = useState<boolean>(false);
  return (
    <Row>
      <Col md={24}>
        <Row>
          <Col md={24}>
            <Button onClick={() => setShowChords(!showChords)} type="dashed">
              Аккорды
            </Button>
          </Col>
        </Row>
        <If condition={showChords}>
          <Row style={{ padding: 20 }}>
            {list.map((chord, i) => (
              <Col md={6} key={i} offset={1}>
                <ChordFingering2 chord={chord} />
              </Col>
            ))}
          </Row>
        </If>
      </Col>
    </Row>
  );
}
