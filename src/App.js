import { useState } from "react";

import "./App.css";

function App() {
  const [intervalMin, setIntervalMin] = useState(80);
  const [subeventCount, setSubeventCount] = useState(1);
  const [subeventInterval, setSubeventInterval] = useState(80);
  const [responseSlotCount, setResponseSlotCount] = useState(20);
  const [responseSlotDelay, setResponseSlotDelay] = useState(24);
  const [responseSlotSpacing, setResponseSlotSpacing] = useState(20);

  const intervalMinMs = intervalMin * 1.25;
  const subeventIntervalMs = subeventInterval * 1.25;
  const responseSlotDelayMs = responseSlotDelay * 1.25;
  const responseSlotSpacingMs = responseSlotSpacing * 0.125;

  return (
    <div>
      <div>
        <form>
          <p>
            <label>
              Interval Min
              <input
                type="number"
                value={intervalMin}
                onChange={(e) => setIntervalMin(parseInt(e.target.value))}
              />
              (Interval Min ms: {intervalMinMs})
            </label>
          </p>

          <p>
            <label>
              Subevent Count
              <input
                type="number"
                value={subeventCount}
                onChange={(e) => setSubeventCount(parseInt(e.target.value))}
              />
            </label>
          </p>

          <p>
            <label>
              Subevent Interval
              <input
                type="number"
                value={subeventInterval}
                onChange={(e) => setSubeventInterval(parseInt(e.target.value))}
              />
              (Subevent Interval ms: {subeventIntervalMs})
            </label>
          </p>

          <p>
            <label>
              Response Slot Count
              <input
                type="number"
                value={responseSlotCount}
                onChange={(e) => setResponseSlotCount(parseInt(e.target.value))}
              />
            </label>
          </p>

          <p>
            <label>
              Response Slot Delay
              <input
                type="number"
                value={responseSlotDelay}
                onChange={(e) => setResponseSlotDelay(parseInt(e.target.value))}
              />
              (Response Slot Delay ms: {responseSlotDelayMs})
            </label>
          </p>

          <p>
            <label>
              Response Slot Spacing
              <input
                type="number"
                value={responseSlotSpacing}
                onChange={(e) => setResponseSlotSpacing(parseInt(e.target.value))}
              />
              (Response Slot Spacing ms: {responseSlotSpacingMs})
            </label>
          </p>
        </form>
      </div>

      <div>
        <svg viewBox={`0 0 ${intervalMinMs} 100`}>
          <g>
            <rect
              x={0}
              y={0}
              width={intervalMinMs}
              height="5"
              fill="transparent"
              stroke="black"
              strokeWidth={0.1}
              preserveAspectRatio="xMidYMid meet"
            />
            <text fontSize={1} x={2} y={2.5} alignmentBaseline="central">
              Advertising Interval
            </text>
          </g>

          {[...Array(subeventCount).keys()].map((i) => {
            const subeventOffset = subeventIntervalMs * i;

            return (
              <g id={`subevent-${i}`}>
                <rect
                  x={subeventOffset}
                  y={7}
                  width={subeventIntervalMs}
                  height="5"
                  fill="transparent"
                  stroke="black"
                  strokeWidth={0.1}
                  preserveAspectRatio="xMidYMid meet"
                />
                <text
                  fontSize={1}
                  x={subeventOffset + 2}
                  y={9.5}
                  alignmentBaseline="central"
                >
                  Subevent {i}
                </text>

                <g id={`response-slot-delay`}>
                  <rect
                    x={subeventOffset}
                    y={14}
                    width={responseSlotDelayMs}
                    height="5"
                    fill="transparent"
                    stroke="black"
                    strokeWidth={0.1}
                    preserveAspectRatio="xMidYMid meet"
                  />
                  <text
                    fontSize={1}
                    x={subeventOffset + 2}
                    y={16.5}
                    alignmentBaseline="central"
                  >
                    Response Delay
                  </text>
                </g>

                {[...Array(responseSlotCount).keys()].map((j) => {
                  const responseSlotOffset =
                    subeventOffset +
                    responseSlotDelayMs +
                    j * responseSlotSpacingMs;

                  return (
                    <g id={`response-slot-${j}`}>
                      <rect
                        x={responseSlotOffset}
                        y={21}
                        width={responseSlotSpacingMs}
                        height="5"
                        fill="transparent"
                        stroke="black"
                        strokeWidth={0.1}
                        preserveAspectRatio="xMidYMid meet"
                      />
                      <text
                        fontSize={1}
                        x={responseSlotOffset + 1}
                        y={22}
                        alignmentBaseline="central"
                        style={{ writingMode: "tb" }}
                      >
                        Slot {j}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default App;
