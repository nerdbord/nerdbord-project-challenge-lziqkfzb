import { InputJSONType } from '@/lib/types';

export const saveForm = async ({
  formName,
  fields,
  addressToSend,
}: {
  formName: string;
  fields: InputJSONType[];
  addressToSend: string;
}) => {
  const response = await fetch(`/api/save-form`, {
    method: 'POST',
    body: JSON.stringify({
      formName,
      fields,
      addressToSend,
    }),
  });
  return response;
};
