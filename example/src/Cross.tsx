import { SvgComponentProps, DynamicSvg } from "../../dist";

export default function Cross() {
  return (
    <DynamicSvg style={{ border: "1em solid red", flexGrow: 1 }}>
      <CrossGraphic color="blue" />
    </DynamicSvg>
  );
}

type CrossGraphicProps = SvgComponentProps & { color: string };

function CrossGraphic({ viewBox, color }: CrossGraphicProps) {
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
