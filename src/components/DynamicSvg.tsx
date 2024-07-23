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
import { SvgComponentProps, useDynamicSvgProps } from "../hooks/dynamicSvg";

export function DynamicSvg<T extends Element>({
  children,
  parentRef,
  svgRef: cr,
  style,
}: {
  children?:
    | React.ReactElement<SvgComponentProps>
    | React.ReactElement<SvgComponentProps>[];
  parentRef: React.RefObject<T | null | undefined>;
  svgRef?: React.MutableRefObject<SVGSVGElement | null>;
  style?: React.CSSProperties;
}) {
  const props = useDynamicSvgProps<T>(parentRef, style);
  const internalSvgRef = React.useRef<SVGSVGElement | null>(null);
  const svgRef = cr || internalSvgRef;

  const childProps: SvgComponentProps = {
    viewBox: [0, 0, props.width, props.height],
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <svg {...props} ref={svgRef}>
      {childrenWithProps}
    </svg>
  );
}