import { SvgComponentProps, DynamicSvg } from "dynamic-svg";
import React from "react";
import "./App.css";

export default function App() {
  const ref = React.useRef(null);
  const svgRef = React.useRef(null);

  React.useLayoutEffect(() => {
    console.log(svgRef.current);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }} ref={ref}>
      <DynamicSvg parentRef={ref} svgRef={svgRef} style={{ opacity: 0.1 }}>
        <Cross color="blue" />
      </DynamicSvg>
    </div>
  );
}

type CrossProps = SvgComponentProps & { color: string };

function Cross({ viewBox, color }: CrossProps) {
  console.log("rendering");

  return viewBox ? (
    <>
      <line
        x1={viewBox[0]}
        y1={viewBox[1]}
        x2={viewBox[2]}
        y2={viewBox[3]}
        style={{
          stroke: color,
          strokeWidth: 1,
        }}
      />
      <line
        x1={viewBox[0]}
        y1={viewBox[3]}
        x2={viewBox[2]}
        y2={viewBox[1]}
        style={{
          stroke: color,
          strokeWidth: 1,
        }}
      />
    </>
  ) : null;
}
