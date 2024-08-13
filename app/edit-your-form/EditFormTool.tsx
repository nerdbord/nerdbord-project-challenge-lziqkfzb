'use client';
import { useState, ChangeEvent } from 'react';
import type { InputJSONType, InputTypeAttribute } from '@/lib/types';
import { availableInputTypeArray } from '@/lib/types';
import { FormGeneratedByUser } from '@/components/FormGeneratedByUser';

interface EditFormToolProps {
  formFields: InputJSONType[];
  formName: string;
}

export const EditFormTool = ({ formFields, formName }: EditFormToolProps) => {
  const [editedFields, setEditedFields] = useState<InputJSONType[]>(formFields);
  const [editedName, setEditedName] = useState(formName);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputLabelChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].label = e.target.value;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputRequiredChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].required = e.target.checked;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputTypeChange = (e: ChangeEvent<HTMLSelectElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].type = e.target.value as unknown as InputTypeAttribute;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputMinValueChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].minValue = ((e.target.value as any) - 0) as number;
    setEditedFields(newEditedFieldsValues);
  };
  const handleInputMaxValueChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].maxValue = ((e.target.value as any) - 0) as number;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputPlaceholderChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].placeholder = e.target.value;
    setEditedFields(newEditedFieldsValues);
  };

  return (
    <div className="flex min-w-[80%] gap-5 p-5">
      <FormGeneratedByUser formFields={formFields} formName={formName} />

      <form>
        <div className="flex flex-col">
          <label>
            FormName
            <input
              type="text"
              value={editedName}
              onChange={() => {
                setEditedName;
              }}
            />
          </label>
          {formFields.map((field) => {
            return (
              <div key={field.keyID}>
                <input
                  type="text"
                  defaultValue={field.label}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputLabelChange(e, field.keyID)
                  }
                />
                <input
                  type="checkbox"
                  defaultChecked={field.required}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputRequiredChange(e, field.keyID)
                  }
                />
                <select
                  value={field.type}
                  defaultValue={field.type || 'Select'}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleInputTypeChange(e, field.keyID)
                  }
                >
                  {availableInputTypeArray.map((type, index) => (
                    <option key={field.keyID + index}>{type}</option>
                  ))}
                </select>
                {field.type === 'text' && (
                  <label>
                    placeholder
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputPlaceholderChange(e, field.keyID)
                      }
                    />
                  </label>
                )}
                {field.type === 'number' && (
                  <>
                    <label>
                      minValue
                      <input
                        type="number"
                        value={field.minValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputMinValueChange(e, field.keyID)
                        }
                      />
                    </label>
                    <label>
                      maxValue
                      <input
                        type="number"
                        value={field.maxValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputMaxValueChange(e, field.keyID)
                        }
                      />
                    </label>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
