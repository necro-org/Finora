import { Link } from "react-router";
import type { BarProps } from "@mui/x-charts/BarChart";
import { useAnimateBar } from "@mui/x-charts/hooks";

export default function LinkBarElement({
  ownerState,
  href,
  id,
  dataIndex,
  x,
  y,
  xOrigin,
  yOrigin,
  width,
  height,
  skipAnimation,
  layout,
  ...rectProps
}: BarProps) {
  const animatedProps = useAnimateBar({
    x,
    y,
    xOrigin,
    yOrigin,
    width,
    height,
    skipAnimation,
    layout,
  });

  const bar = (
    <rect
      {...rectProps}
      data-series={id}
      data-index={dataIndex}
      filter={ownerState.isHighlighted ? "brightness(120%)" : undefined}
      opacity={ownerState.isFaded ? 0.3 : 1}
      {...animatedProps}
    />
  );

  if (!href) return bar;

  return <Link to={href}>{bar}</Link>;
}
