/**
 * Copyright 2024 Michael Bachmann
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { SvgComponentProps } from "..";

export function DynamicSvg({
  children,
  svgRef: ref,
  ...props
}: {
  children?:
    | React.ReactElement<SvgComponentProps>
    | React.ReactElement<SvgComponentProps>[];
  svgRef?: React.MutableRefObject<SVGSVGElement | null>;
  style?: React.CSSProperties;
  props?: object;
}) {
  const internalSvgRef = React.useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const svgRef = ref || internalSvgRef;

  const childProps: SvgComponentProps = {
    viewBox: [0, 0, width, height],
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  React.useLayoutEffect(() => {
    const svg = svgRef.current;
    const parent = svg?.parentElement;
    if (parent != null) {
      const listener = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
        setHeight(entries[0].contentRect.height);
        requestAnimationFrame(() => {
          setWidth(entries[0].contentRect.width);
          setHeight(entries[0].contentRect.height);
          requestAnimationFrame(() => {
            setWidth(0);
            setHeight(0);
            requestAnimationFrame(() => {
              setWidth(entries[0].contentRect.width);
              setHeight(entries[0].contentRect.height);
            });
          });
        });
      });
      listener.observe(parent);
      return () => {
        listener.unobserve(parent);
        listener.disconnect();
      };
    }
  }, [svgRef]);

  return (
    <svg {...props} width={width} height={height} ref={svgRef}>
      {childrenWithProps}
    </svg>
  );
}
