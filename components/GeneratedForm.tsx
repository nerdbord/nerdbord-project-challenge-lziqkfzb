'use client';

import type { InputJSONType } from '@/lib/types';
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

// Allow streaming responses up to 30 seconds
interface GeneratedFormProps {
  formFields: InputJSONType[];
  formName: string;
}

export const GeneratedForm = ({ formFields, formName }: GeneratedFormProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ChakraProvider>
      <Card align="center" padding="20px">
        <VStack spacing={8}>
          <CardHeader>
            <Heading size="md">{formName}</Heading>
          </CardHeader>
          <form>
            <VStack spacing={4}>
              {formFields.map((input) => {
                switch (input.type) {
                  case 'checkbox':
                    if (!input.options || input.options?.length < 2) {
                      return (
                        <FormControl isRequired={input.required}>
                          <FormLabel>{input.label}</FormLabel>
                          <Checkbox isRequired={input.required} name={input.name}></Checkbox>
                        </FormControl>
                      );
                    } // TODO: łapać i recznie wpisywać przy onSubmit
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <CheckboxGroup>
                          <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            {input.options.map((option, index) => (
                              <Checkbox
                                key={`${option}${index}`}
                                name={`${input.name}.${option}`}
                                value={option}
                              >
                                {option}
                              </Checkbox>
                            ))}
                          </Stack>
                        </CheckboxGroup>
                      </FormControl>
                    );
                  case 'color':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="color" name={input.name} />
                      </FormControl>
                    );
                  case 'date':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="date" name={input.name} />
                      </FormControl>
                    );
                  case 'email':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="email" name={input.name} />
                      </FormControl>
                    );
                  case 'password':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="password" name={input.name} />
                      </FormControl>
                    );
                  case 'number':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <NumberInput min={input.minValue} max={input.maxValue}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    );
                  case 'text':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="text" name={input.name} placeholder={input.placeholder} />
                      </FormControl>
                    );
                  case 'time':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel> <Input type="time" name={input.name} />
                        ;
                      </FormControl>
                    );
                  case 'url':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="url" name={input.name} />;
                      </FormControl>
                    );
                  case 'week':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel> <Input type="week" name={input.name} />
                        ;
                      </FormControl>
                    );
                  case 'month':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="month" name={input.name} />;
                      </FormControl>
                    );
                  case 'tel':
                    return (
                      <FormControl isRequired={input.required}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="tel" name={input.name} />;
                      </FormControl>
                    );
                  case 'select': {
                    if (input.options) {
                      return (
                        <FormControl isRequired={input.required}>
                          <FormLabel>{input.label}</FormLabel>
                          <Select placeholder="Select option">
                            {input?.options.map((option, index) => (
                              <option key={`${option}${index}`} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    }
                  }
                  case 'radio':
                    if (input.options) {
                      return (
                        <FormControl isRequired={input.required}>
                          <FormLabel>{input.label}</FormLabel>
                          <RadioGroup name={input.name}>
                            <Stack direction="row">
                              {input?.options.map((option, index) => (
                                <Radio key={`${option}${index}`} value={option}>
                                  {option}
                                </Radio>
                              ))}
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      );
                    }

                  default:
                    <></>;
                }
              })}{' '}
              <Button type="submit" variant="solid">
                Submit
              </Button>
            </VStack>
          </form>
        </VStack>
      </Card>
    </ChakraProvider>
  );
};
