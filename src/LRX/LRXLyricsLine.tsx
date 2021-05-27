import React from "react";
import {
  LRXGeneralLine,
  LRXGeneralLineEntry,
  OnEntryClickedCallback,
  If
} from "../common";

export interface LRXLyricsLineProps {
  line: LRXGeneralLine;
  onEntryClicked: OnEntryClickedCallback;
  activeEntry?: LRXGeneralLineEntry;
  timeHighlight?: boolean;
  currentTime?: number;
}

export function LRXLyricsLine({
  line,
  onEntryClicked = () => {},
  activeEntry,
  timeHighlight = false,
  currentTime = 0
}: LRXLyricsLineProps) {
  let currentPercentage = 0;
  if (timeHighlight && line && line.timecode) {
    let duration = line.timecode.end.value - line.timecode.start.value;
    let currentValue = currentTime - line.timecode.start.value;
    currentPercentage = (currentValue / duration) * 100;
  }

  let className = "lrx-lyrics-line" + (timeHighlight ? " time-highlight" : "");
  return (
    <span className={className}>
      <div
        className="progress-bar"
        style={{ width: `${currentPercentage}%` }}
      />
      <div className="avg-rate">{line.avgRate}</div>
      {line.content.map((entry, i) => {
        let active = false;
        let highlight = false;

        if (activeEntry) {
          if (activeEntry._id === entry._id) {
            active = true;
          }

          if (activeEntry.bm && entry.bm) {
            if (activeEntry.bm.n && entry.bm.n) {
              if (activeEntry.bm.n === entry.bm.n) {
                highlight = true;
              }
            }
          }
        }

        return entry.content.map((span) => (
          <span key={i}>
            <If condition={!!span.content.trim()}>
              <span
                className={
                  "lrx-lyrics-line-entry" +
                  (active ? " active" : "") +
                  (highlight ? " highlight" : "")
                }
                onClick={() => {
                  onEntryClicked(entry);
                }}
              >
                {span.content}&nbsp;
              </span>
            </If>
            <If condition={!span.content.trim()}>
              <span className="lrx-lyrics-line-empty-entry">
                {span.content}
              </span>
            </If>
          </span>
        ));
      })}
    </span>
  );
}
