import React from 'react';

const GradientProgressBar = ({ percentage }) => {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  const interval = Math.floor(normalizedPercentage / 10);

  const colors = ['red', 'black', 'yellow'];
  const colorIndex = interval % colors.length;

  const gradientColor = colors[colorIndex];
  const nextColor = colors[(colorIndex + 1) % colors.length];

  const style = {
    background: `linear-gradient(to right, ${gradientColor} ${percentage}%, ${nextColor} ${percentage}%)`,
    height: '20px',
    width: '100%',
  };

  return <div style={style}></div>;
};



export default GradientProgressBar;
