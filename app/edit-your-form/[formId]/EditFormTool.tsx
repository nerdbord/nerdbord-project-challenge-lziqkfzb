'use client';
import { useState, ChangeEvent, useTransition, useEffect, FormEvent } from 'react';
import { createPortal } from 'react-dom';

import { nanoid } from 'nanoid';
import { saveForm } from '@/lib/supabase/supabaseRequests';

import type { InputJSONType, InputTypeAttribute } from '@/lib/types';
import { availableInputTypeArray } from '@/lib/types';
import {
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  ChakraProvider,
  VStack,
  Stack,
  Input,
  Select,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardHeader,
  Heading,
  Button,
} from '@chakra-ui/react';

import { Edit } from '@/components/icons/Edit';
import { InputField } from '@/components/InputField';
import { Button as BrandButton } from '@/components/Button';
import { Trash } from '@/components/icons/Trash';
import toast from 'react-hot-toast';

interface EditFormToolProps {
  formFields: InputJSONType[];
  formName: string;
}

export const EditFormTool = ({ formFields, formName }: EditFormToolProps) => {
  const [editedFields, setEditedFields] = useState<InputJSONType[]>(formFields);
  const [editedName, setEditedName] = useState(formName);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [nowEditedField, setNowEditedField] = useState<InputJSONType | null>(null);
  const [addressToSend, setAddressToSend] = useState('');

  useEffect(() => {
    setModalRoot(document.getElementById('modalRoot'));
  }, [modalRoot]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Form Filled correctly');
  };
  const handleSaveForm = () => {
    startTransition(async () => {
      await saveForm({ formName: editedName, fields: editedFields, addressToSend });
    });
  };

  const handleFormNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleInputLabelChange = (e: ChangeEvent<HTMLTextAreaElement>, keyID: string) => {
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
    newEditedFieldsValues[fieldIndex].minValue = Number(e.target.value as any);
    setEditedFields(newEditedFieldsValues);
  };
  const handleInputMaxValueChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].maxValue = Number(e.target.value as any);
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputPlaceholderChange = (e: ChangeEvent<HTMLInputElement>, keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues[fieldIndex].placeholder = e.target.value;
    setEditedFields(newEditedFieldsValues);
  };

  const handleInputOptionsChange = (
    e: ChangeEvent<HTMLInputElement>,
    keyID: string,
    index: number,
  ) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);

    if (!newEditedFieldsValues[fieldIndex].options) {
      newEditedFieldsValues[fieldIndex].options = [];
    }

    if (newEditedFieldsValues[fieldIndex].options) {
      if (newEditedFieldsValues[fieldIndex].options.length > index) {
        newEditedFieldsValues[fieldIndex].options[index] = e.target.value;
        setEditedFields(newEditedFieldsValues);
      } //TODO: error handler
    }
  };

  const handleAddOption = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    if (!newEditedFieldsValues[fieldIndex].options) newEditedFieldsValues[fieldIndex].options = [];
    newEditedFieldsValues[fieldIndex].options.push('');
    setEditedFields(newEditedFieldsValues);
  };
  const handleDeleteOption = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    if (!newEditedFieldsValues[fieldIndex].options) {
      return;
    }
    newEditedFieldsValues[fieldIndex].options.pop();
    setEditedFields(newEditedFieldsValues);
  };

  const handleAddEmptyField = () => {
    const newEditedFieldsValues = [...editedFields];
    newEditedFieldsValues.push({
      keyID: nanoid(),
      label: 'Etykieta',
      type: 'text',
      name: 'newField',
      required: false,
    });
    setEditedFields(newEditedFieldsValues);
  };
  const handleDeleteField = (keyID: string) => {
    const newEditedFieldsValues = [...editedFields];
    const fieldIndex = newEditedFieldsValues.findIndex((field) => field.keyID === keyID);
    newEditedFieldsValues.splice(fieldIndex, 1);
    setEditedFields(newEditedFieldsValues);
  };

  return (
    <>
      <ChakraProvider>
        <div className="flex min-h-screen flex-row justify-center bg-[#cccccc]/30 py-10 pb-[168px]">
          <Card align="center" padding="20px">
            <VStack spacing={8} justifyContent={'center'} alignItems={'center'}>
              <CardHeader className="relative rounded-md hover:ring hover:ring-brand hover:signal focus:signal">
                <Heading size="md" className="">
                  {editedName}
                </Heading>
                <div className="hidden justify-end signal:flex">
                  <button type="button" onClick={() => setIsEditNameModalOpen(true)}>
                    <Edit />
                  </button>
                </div>
              </CardHeader>
              <form onSubmit={onSubmit}>
                <VStack spacing={4}>
                  {editedFields.map((input) => {
                    switch (input.type) {
                      case 'checkbox':
                        if (!input.options || input.options?.length < 2) {
                          return (
                            <FormControl
                              isRequired={input.required}
                              key={input.keyID}
                              className="rounded-md px-[12px] pb-[8px] hover:ring hover:ring-brand hover:signal focus:signal"
                            >
                              <FormLabel>{input.label}</FormLabel>
                              <Checkbox isRequired={input.required} name={input.name}></Checkbox>
                              <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                                <button //TODO: let's try to put this two buttons in one reusable component
                                  type="button"
                                  onClick={() => {
                                    setNowEditedField(
                                      editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                    );
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <Edit />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteField(input.keyID)}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </FormControl>
                          );
                        }
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <CheckboxGroup>
                              <Stack
                                spacing={[1, 5]}
                                direction={['column', 'row']}
                                flexWrap={'wrap'}
                              >
                                {input.options.map((option, index) => (
                                  <Checkbox
                                    key={input.keyID + index}
                                    name={`${input.name}.${option}`}
                                    value={option}
                                  >
                                    {option}
                                  </Checkbox>
                                ))}
                              </Stack>
                            </CheckboxGroup>
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'color':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="color" name={input.name} />
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'date':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="date" name={input.name} />
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'email':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="email" name={input.name} />
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'password':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="password" name={input.name} />
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'number':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <NumberInput min={input.minValue} max={input.maxValue}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'text':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="text" name={input.name} placeholder={input.placeholder} />
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'time':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>{' '}
                            <Input type="time" name={input.name} />;
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'url':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="url" name={input.name} />;
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'week':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="week" name={input.name} />;
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'month':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="month" name={input.name} />;
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'tel':
                        return (
                          <FormControl
                            isRequired={input.required}
                            key={input.keyID}
                            className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                          >
                            <FormLabel>{input.label}</FormLabel>
                            <Input type="tel" name={input.name} />;
                            <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                              <button
                                type="button"
                                onClick={() => {
                                  setNowEditedField(
                                    editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                  );
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit />
                              </button>
                              <button type="button" onClick={() => handleDeleteField(input.keyID)}>
                                <Trash />
                              </button>
                            </div>
                          </FormControl>
                        );
                      case 'select': {
                        if (input.options) {
                          return (
                            <FormControl
                              isRequired={input.required}
                              key={input.keyID}
                              className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                            >
                              <FormLabel>{input.label}</FormLabel>
                              <Select placeholder="Select option">
                                {input?.options.map((option, index) => (
                                  <option key={input.keyID + option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Select>
                              <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNowEditedField(
                                      editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                    );
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <Edit />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteField(input.keyID)}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </FormControl>
                          );
                        }
                      }
                      case 'radio':
                        if (input.options) {
                          return (
                            <FormControl
                              isRequired={input.required}
                              key={input.keyID}
                              className="rounded-md hover:ring hover:ring-brand hover:signal focus:signal"
                            >
                              <FormLabel>{input.label}</FormLabel>
                              <RadioGroup name={input.name}>
                                <Stack direction="row" flexWrap={'wrap'}>
                                  {input?.options.map((option, index) => (
                                    <Radio key={input.keyID + index} value={option.toString()}>
                                      {option}
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                              <div className="hidden justify-end gap-[8px] py-[4px] signal:flex">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNowEditedField(
                                      editedFields.find((obj) => obj.keyID === input.keyID) || null,
                                    );
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <Edit />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteField(input.keyID)}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </FormControl>
                          );
                        }

                      default:
                        <p key={input.keyID}> UNEXPECTED TYPE OF FIELD </p>;
                    }
                  })}
                  <div className="flex">
                    <Button type="submit" variant="solid">
                      Submit
                    </Button>
                    <button
                      className="rounded-lg border border-brand bg-brand p-1 text-white"
                      type="button"
                      onClick={handleAddEmptyField}
                    >
                      Add Field
                    </button>
                  </div>
                </VStack>
              </form>
            </VStack>
          </Card>
        </div>
      </ChakraProvider>
      <div className="fixed bottom-[94px] flex w-full border-t border-[#cccccc] bg-white px-[16px] py-[12px] sm:max-w-[450px]">
        <form onSubmit={handleSaveForm} className="flex w-full flex-col gap-[12px]">
          <InputField
            label="Where should we send the results?"
            name="addressToSend"
            value={addressToSend}
            onChange={(e) => setAddressToSend(e.currentTarget.value)}
            required={true}
          />
          <BrandButton disabled={!addressToSend} type="submit">
            {isPending ? 'Procesing...' : 'Submit'}
          </BrandButton>
        </form>
      </div>
      {isEditNameModalOpen &&
        modalRoot &&
        createPortal(
          <>
            <div
              className="absolute left-0 top-0 h-full w-full bg-black-modal backdrop-blur-lg"
              onClick={() => setIsEditNameModalOpen(false)}
            ></div>
            <div className="fixed bottom-0 mx-auto flex max-h-[90vh] min-h-[65vh] w-full flex-col overflow-auto rounded-tl-3xl rounded-tr-3xl bg-white sm:max-w-[450px]">
              <div className="flex justify-center pb-[12px] pt-[8px]">
                <div
                  className="h-[5px] w-[56px] rounded-[10px] bg-gray"
                  onClick={() => setIsEditNameModalOpen(false)}
                ></div>
              </div>
              <div className="mb-[24px] inline-flex items-center justify-center border-b border-gray pb-[16px] pt-[8px] text-center text-lg font-bold leading-7 text-black">{`I'm a modal dialog`}</div>
              <div className="flex h-full w-full flex-grow flex-col justify-between pb-[34px]">
                <div className="px-[16px]">
                  <InputField
                    label="Form name"
                    name="formName"
                    value={editedName}
                    onChange={handleFormNameChange}
                  />
                </div>
                <div className="flex w-full border-t border-gray px-[16px] py-[12px]">
                  <BrandButton variant="filled" onClick={() => setIsEditNameModalOpen(false)}>
                    Apply changes
                  </BrandButton>
                </div>
              </div>
            </div>
          </>,
          modalRoot,
        )}
      {isModalOpen &&
        modalRoot &&
        createPortal(
          <>
            <div
              className="absolute left-0 top-0 h-full w-full bg-black-modal backdrop-blur-lg"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="fixed bottom-0 mx-auto flex max-h-[90vh] min-h-[65vh] w-full flex-col overflow-auto rounded-tl-3xl rounded-tr-3xl bg-white sm:max-w-[450px]">
              <div className="flex justify-center pb-[12px] pt-[8px]">
                <div
                  className="h-[5px] w-[56px] rounded-[10px] bg-gray"
                  onClick={() => setIsModalOpen(false)}
                ></div>
              </div>
              <div className="mb-[24px] inline-flex items-center justify-center border-b border-gray pb-[16px] pt-[8px] text-center text-lg font-bold leading-7 text-black">{`I'm a modal dialog`}</div>
              <div className="flex h-full w-full flex-grow flex-col justify-between pb-[34px]">
                <div className="px-[16px]">
                  {nowEditedField && (
                    <div key={nowEditedField.keyID} className="flex flex-col gap-[12px]">
                      <textarea
                        className="h-[4em] w-full resize-none rounded-lg border border-gray p-[0.3em]"
                        defaultValue={nowEditedField.label}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputLabelChange(e, nowEditedField.keyID)
                        }
                      />
                      <div className="flex justify-between">
                        <div className="gao-[8px] flex">
                          <h5>isRequired?</h5>
                          <input
                            type="checkbox"
                            defaultChecked={nowEditedField.required}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputRequiredChange(e, nowEditedField.keyID)
                            }
                          />
                        </div>
                        <div className="flex gap-[8px]">
                          <h5>Input Type</h5>
                          <select
                            value={nowEditedField.type}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                              handleInputTypeChange(e, nowEditedField.keyID)
                            }
                          >
                            {availableInputTypeArray.map((type, index) => (
                              <option key={`${nowEditedField.keyID}${index}`}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {nowEditedField.type === 'text' && (
                        <InputField
                          name="placeholder"
                          label="Placeholder"
                          value={nowEditedField.placeholder}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputPlaceholderChange(e, nowEditedField.keyID)
                          }
                        />
                      )}
                      {nowEditedField.type === 'number' && (
                        <>
                          <InputField
                            name="minValue"
                            label="minValue"
                            value={nowEditedField.minValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputMinValueChange(e, nowEditedField.keyID)
                            }
                            type="number"
                          />
                          <InputField
                            name="maxValue"
                            label="maxValue"
                            value={nowEditedField.minValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputMaxValueChange(e, nowEditedField.keyID)
                            }
                            type="number"
                          />
                        </>
                      )}
                      {(nowEditedField.type === 'radio' ||
                        nowEditedField.type === 'checkbox' ||
                        nowEditedField.type === 'select') && (
                        <div>
                          {nowEditedField.options?.map((option, index) => (
                            <InputField
                              name={`Option ${index}`}
                              label={`Option ${index}`}
                              value={option}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputOptionsChange(e, nowEditedField.keyID, index)
                              }
                              key={`${nowEditedField.keyID}${index}`}
                            />
                          ))}
                          <button
                            className="rounded-lg border border-brand bg-brand p-1 text-white"
                            type="button"
                            onClick={() => handleAddOption(nowEditedField.keyID)}
                          >
                            Add option
                          </button>
                          <button
                            className="rounded-lg border border-brand bg-brand p-1 text-white"
                            type="button"
                            onClick={() => handleDeleteOption(nowEditedField.keyID)}
                          >
                            Delete option
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full border-t border-gray px-[16px] py-[12px]">
                <BrandButton variant="filled" onClick={() => setIsModalOpen(false)}>
                  Apply changes
                </BrandButton>
              </div>
            </div>
          </>,
          modalRoot,
        )}
    </>
  );
};
