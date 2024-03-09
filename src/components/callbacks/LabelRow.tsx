import React from "react";




const LabelRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="row">
      <div className="col-4 fw-semibold text-secondary">{label}</div>
      <div className="col-8">{value}</div>
    </div>
  );
};

export default LabelRow;
