import React from "react";
import {
  LRXLineBase,
  LRXGeneralLineEntry,
  OnEntryClickedCallback,
  LRXGeneralLine,
  LRXChordsLine
} from "../common";
import { LRXChordLine } from "./LRXChordLine";
import { LRXLyricsLine } from "./LRXLyricsLine";

export interface LRXLineProps {
  line: LRXLineBase;
  onEntryClicked: OnEntryClickedCallback;
  activeEntry?: LRXGeneralLineEntry;
  timeHighlight?: boolean;
  currentTime?: number;
}

export function LRXLine({
  line,
  onEntryClicked = () => {},
  activeEntry,
  timeHighlight = false,
  currentTime = 0
}: LRXLineProps) {
  switch (line.type) {
    case "EMPTY_LINE":
      return <p />;

    case "CHORDS_LINE":
      return <LRXChordLine line={line as LRXChordsLine} />;

    case "LINE":
      return (
        <LRXLyricsLine
          line={line as LRXGeneralLine}
          activeEntry={activeEntry}
          timeHighlight={timeHighlight}
          currentTime={currentTime}
          onEntryClicked={(entry) => {
            onEntryClicked(entry);
          }}
        />
      );

    default:
      return <p>UNK: {line.type}</p>;
  }
}
