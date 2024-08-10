import { HTMLInputTypeAttribute } from 'react';

export type formJSONType = {
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  type: HTMLInputTypeAttribute;
  options?: string[];
};
