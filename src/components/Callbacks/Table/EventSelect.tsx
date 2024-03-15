import React from "react";
import { Form } from "react-bootstrap";

export type Option = {
  text: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const EventSelect = ({ options, value, onChange }: SelectProps) => {
  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </Form.Control>
  );
};

export default EventSelect;
