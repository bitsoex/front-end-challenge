import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Render loading placeholder for component
 * @param {number} rows Number of boxes to be render
 */

export default ({ rows }) => (
  <SkeletonTheme
    color="var(--Background-navy)"
    highlightColor="var(--Regular-navy)"
  >
    <p style={{ fontSize: "2rem" }}>
      <Skeleton count={rows} />
    </p>
  </SkeletonTheme>
);
