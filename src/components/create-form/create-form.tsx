import { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box, IBoxProps } from '@semcore/flex-box';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import isEmpty from 'lodash/isEmpty';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { ITask } from '@interfaces/task';

const StyledCard = styled(Card)({
  boxSizing: 'border-box',
});

const schema = yup
  .object({
    title: yup.string().required('Required'),
  })
  .required();

type CreateFormPropsTypes = {
  onCreate: (item: ITask) => void;
  onCancel: () => void;
} & IBoxProps;

type CreateFormTypes = {
  title: string;
};

const CreateForm: React.FC<CreateFormPropsTypes> = ({
  onCreate,
  onCancel,
  ...props
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormTypes>({
    resolver: yupResolver(schema),
  });

  const forwardRef = useRef<{ focus: Function }>(null);

  useEffect(() => {
    forwardRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<CreateFormTypes> = (data) => {
    onCreate({ id: uuidv4(), ...data });
    onCancel();
  };

  return (
    <StyledCard {...props} w='100%' p={5}>
      <Box tag='form' onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input state={isEmpty(errors) ? 'normal' : 'invalid'}>
                <Input.Value
                  {...field}
                  ref={forwardRef}
                  placeholder='Title task'
                />
              </Input>
            )}
          />
          <Text size={100}>{errors?.title?.message}</Text>
        </Box>

        <Button theme='success' use='primary' type='submit'>
          Save
        </Button>

        <Button use='secondary' ml={3} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </StyledCard>
  );
};

export default CreateForm;
