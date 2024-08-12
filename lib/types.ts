export type InputJSONType = {
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  type: InputTypeAttribute;
  options?: string[];
  minValue?: number;
  maxValue?: number;
};

export type InputTypeAttribute =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'email'
  | 'password'
  | 'data'
  | 'number'
  | 'radio'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | 'month'
  | 'tel'
  | 'select';
