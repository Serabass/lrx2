import React, { useState } from "react";
// import "./lrx.sass";
import { LRXDocument, LRXGeneralLineEntry, If } from "../common";
import { LRXBlock } from "./LRXBlock";
import "antd/dist/antd.css";
import { Typography, Affix, Row, Col, Divider } from "antd";
import { ChordTransposer } from "../chords";
import { Info } from "../info";
import { extractChords } from "./extract-chords";
// import ChordFingering from "../chords/chord-fingering";
import { LRXContext } from "./LRXContext";
import { ChordList } from "./ChordList";

export interface LRXProps {
  doc: LRXDocument;
  audioUrl?: string;
}

export function LRX({ doc, audioUrl }: LRXProps) {
  let [transpose, setTranspose] = useState<number>(0);
  let [activeEntry, setActiveEntry] = useState<LRXGeneralLineEntry>();
  let [currentTime, setCurrentTime] = useState<number>(0);
  let maxRate = Math.max(...doc.blocks.map((b) => b.avgRate));
  let songChords = extractChords(doc);

  let activeReportLines = doc.report.lines.filter(
    (line) => line.n === activeEntry?.bm.n
  );

  return (
    <LRXContext.Provider value={{ transpose, setTranspose }}>
      <div className="wrapper">
        <Row>
          <Col md={24}>
            <If condition={!!audioUrl}>
              <audio
                src={audioUrl}
                controls
                style={{
                  width: "100%",
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  zIndex: 9999
                }}
                onTimeUpdate={(e) => {
                  setCurrentTime(e.currentTarget.currentTime);
                }}
              />
            </If>
          </Col>
        </Row>

        <Row>
          <Col md={24}>
            <pre className="lrx-document">
              <div className="lrx-toolbox">
                <ChordTransposer min={-6} max={6} buttonsType="dashed" />
              </div>
              <Divider />

              <Typography.Title level={2}>{doc.title.title}</Typography.Title>

              <div>
                <ChordList list={songChords} />
              </div>

              <div className="lrx-document-wrapper">
                {doc.blocks.map((block, i) => (
                  <LRXBlock
                    maxRate={maxRate}
                    block={block}
                    key={i}
                    transpose={transpose}
                    currentTime={currentTime}
                    activeEntry={activeEntry}
                    onEntryClicked={(entry) => {
                      setActiveEntry(entry);
                    }}
                  />
                ))}
              </div>
              <div className="lrx-document-info">
                <Affix>
                  <Info
                    activeEntry={activeEntry}
                    activeReportLines={activeReportLines}
                  />
                </Affix>
              </div>
            </pre>
          </Col>
        </Row>
      </div>
    </LRXContext.Provider>
  );
}
