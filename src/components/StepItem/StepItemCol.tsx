import React, { useState } from "react";

type StepItemColProps = {
  header?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const StepItemCol: React.FC<StepItemColProps> = ({ header = "", className='', children }) => {
  return (
    <div className={`step-item-col ${className}`}>
      <div className="header">{header}</div>
      <div className="body">{children}</div>
    </div>
  );
};

export default StepItemCol;
