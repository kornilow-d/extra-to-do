import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import * as yup from 'yup';

const schema = yup
  .object({
    title: yup.string().required('Required'),
  })
  .required();

type CreateFormInputsTypes = {
  title: string;
};

const CreateForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormInputsTypes>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateFormInputsTypes> = (data) =>
    console.log(data);

  return (
    <Card w='100%' p={5}>
      <Text tag='p' size={300} mb={3} bold>
        Form
      </Text>

      <Box tag='form' onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input>
                <Input.Value placeholder='Title task' {...field} />
              </Input>
            )}
          />
          <Text size={100}>{errors?.title?.message}</Text>
        </Box>

        <Button theme='success' use='primary' type='submit'>
          Create
        </Button>
      </Box>
    </Card>
  );
};

export default CreateForm;
