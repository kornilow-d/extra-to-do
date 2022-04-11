import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';

type CreateFormInputsTypes = {
  title: string;
};

const CreateForm: React.FC = () => {
  const { register, handleSubmit } = useForm<CreateFormInputsTypes>();
  const onSubmit: SubmitHandler<CreateFormInputsTypes> = (data) =>
    console.log(data);

  const [title, setTitle] = useState('');

  return (
    <Card w='100%' p={5}>
      <Text tag='p' size={300} mb={3} bold>
        Form
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Input>
            <Input.Value
              placeholder='Title task'
              value={title}
              {...register('title', { required: true })}
              onChange={setTitle}
            />
          </Input>
        </Box>

        <Button theme='success' use='primary' type='submit'>
          Create
        </Button>
      </form>
    </Card>
  );
};

export default CreateForm;
