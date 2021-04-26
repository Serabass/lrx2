import React, { useContext, useEffect, useState } from "react";
import { chords } from "./chords";
import { Alert, Button, Col, Row } from "antd";
import * as svguitar from "svguitar";
import { ChordStyle } from "svguitar";
import { Chord, parseChord } from "./chord-parser";
import { LRXChord } from "../common";
import { buildChordName } from "../LRX";
import { transposeChord } from "./transpose-chord";
import { LRXContext } from "../LRX/LRXContext";

export interface ChordFingeringProps {
  chord: LRXChord;
}

export function ChordFingering2({ chord }: ChordFingeringProps) {
  let ctx = useContext(LRXContext);
  let ref = React.createRef<HTMLDivElement>();
  let transposed = transposeChord(chord, ctx.transpose);
  let transposedChordName = buildChordName(transposed);
  let [index, setIndex] = useState(0);
  let chordEntities = chords[transposedChordName];

  if (!chordEntities) {
    return (
      <Alert
        message={`Chord ${transposedChordName} is not recognized [1]`}
        type="warning"
      />
    );
  }

  if (chordEntities.length === 0) {
    return (
      <Alert
        message={`Chord ${transposedChordName} is not recognized [2]`}
        type="warning"
      />
    );
  }

  let entity = chordEntities[index];
  let o: Chord = entity as Chord;

  if (!entity) {
    setIndex(0);
    return <div />;
  }

  if (typeof entity === "string") {
    o = parseChord(entity as string);
  }

  let fingers = o.fingers;

  useEffect(() => {
    function createElement(ref: HTMLDivElement) {
      if (ref) {
        ref.innerHTML = "";
        let c = new svguitar.SVGuitarChord(ref);
        c.chord({
          // array of [string, fret, text | options]
          fingers,

          // optional: barres for barre chords
          barres: o.barres,

          // title of the chart (optional)
          title: transposedChordName
        })
          .configure({
            // Customizations (all optional, defaults shown)

            /**
             * Select between 'normal' and 'handdrawn'
             */
            style: ChordStyle.handdrawn,

            /**
             * The number of strings
             */
            strings: 6,

            /**
             * The number of frets
             */
            frets: 6,
            /**
             * Default position if no positon is provided (first fret is 1)
             */
            position: o.position,

            /**
             * These are the labels under the strings. Can be any string.
             */
            tuning: ["e", "A", "D", "G", "B", "E"],

            /**
             * The position of the fret label (eg. "3fr")
             */
            fretLabelPosition: "right" as any,

            /**
             * The font size of the fret label
             */
            fretLabelFontSize: 38,

            /**
             * The font size of the string labels
             */
            tuningsFontSize: 28,

            /**
             * Size of a nut relative to the string spacing
             */
            nutSize: 0.65,

            /**
             * Color of a finger / nut
             */
            nutColor: "#000",

            /**
             * The color of text inside nuts
             */
            nutTextColor: "#FFF",

            /**
             * The size of text inside nuts
             */
            nutTextSize: 22,

            /**
             * stroke color of a nut. Defaults to the nut color if not set
             */
            nutStrokeColor: "#000000",

            /**
             * stroke width of a nut
             */
            nutStrokeWidth: 0,

            /**
             * stroke color of a barre chord. Defaults to the nut color if not set
             */
            barreChordStrokeColor: "#000000",

            /**
             * stroke width of a barre chord
             */
            barreChordStrokeWidth: 0,

            /**
             * Height of a fret, relative to the space between two strings
             */
            fretSize: 1.2,

            /**
             * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
             * This is only applied if it's larger than the letters inside of the padding (eg the starting fret)
             */
            sidePadding: 0.2,

            /**
             * The font family used for all letters and numbers
             */
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

            /**
             * Default title of the chart if no title is provided
             */
            title: "F# minor",

            /**
             * Font size of the title. This is only the initial font size. If the title doesn't fit, the title
             * is automatically scaled so that it fits.
             */
            titleFontSize: 48,

            /**
             * Space between the title and the chart
             */
            titleBottomMargin: 0,

            /**
             * Global color of the whole chart. Can be overridden with more specifig color settings such as
             * @link titleColor or @link stringColor etc.
             */
            color: "#000000",

            /**
             * The background color of the chord diagram. By default the background is transparent. To set the background to transparent either set this to 'none' or undefined
             */
            backgroundColor: "none",

            /**
             * Barre chord rectangle border radius relative to the nutSize (eg. 1 means completely round endges, 0 means not rounded at all)
             */
            barreChordRadius: 0.25,

            /**
             * Size of the Xs and Os above empty strings relative to the space between two strings
             */
            emptyStringIndicatorSize: 0.6,

            /**
             * Global stroke width
             */
            strokeWidth: 2,

            /**
             * The width of the top fret (only used if position is 1)
             */
            topFretWidth: 10,

            /**
             * The color of the title (overrides color)
             */
            titleColor: "#000000",
            /**
             * The color of the strings (overrides color)
             */
            stringColor: "#000000",
            /**
             * The color of the fret position (overrides color)
             */
            fretLabelColor: "#000000",
            /**
             * The color of the tunings (overrides color)
             */
            tuningsColor: "#000000",
            /**
             * The color of the frets (overrides color)
             */
            fretColor: "#000000",
            /**
             * When set to true the distance between the chord diagram and the top of the SVG stayes the same,
             * no matter if a title is defined or not.
             */
            fixedDiagramPosition: false
          })
          .draw();
      }
    }

    if (ref.current) {
      createElement(ref.current);
    }
  }, [
    ctx.transpose,
    index,
    ref,
    fingers,
    o.barres,
    o.fingers,
    transposedChordName
  ]);

  if (!entity) {
    setIndex(0);
  }

  return (
    <Col md={24}>
      <Row>
        <Col>
          <div ref={ref} style={{ width: "180px" }} />
        </Col>
      </Row>
      <Row>
        <Col md={6} style={{ textAlign: "left" }}>
          <Button
            size="small"
            disabled={index <= 0}
            onClick={() => {
              setIndex(--index);
            }}
          />
        </Col>
        <Col md={12} style={{ textAlign: "center" }}>
          {index + 1} of {chordEntities.length}
        </Col>
        <Col md={6} style={{ textAlign: "right" }}>
          <Button
            size="small"
            disabled={index >= chordEntities.length - 1}
            onClick={() => {
              setIndex(++index);
            }}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default ChordFingering2;
