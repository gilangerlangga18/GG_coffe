import React from "react";

const CustomImage = ({ src, alt, width, height, sx }) => {
  return <img src={src} alt={alt} width={width} height={height} style={sx} />;
};

export default CustomImage;
