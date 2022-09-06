import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box, Flex } from '@semcore/flex-box';
import CloseM from '@semcore/icon/Close/m';
import EditM from '@semcore/icon/Edit/m';
import Input from '@semcore/input';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';

import { ITask } from '@interfaces/task';

const options = [
  {
    value: 'not_set',
    label: 'No status',
    children: 'No status',
  },
  {
    value: 'in_progress',
    label: 'In progress',
    children: 'In progress',
  },
  {
    value: 'ready',
    label: 'Ready',
    children: 'Ready',
  },
];

const ControlWrapper = styled(Flex)({
  width: 'min-content',

  svg: {
    color: 'var(--gray-300)',
    transition: 'color 0.3s ease-in-out',
  },

  '& > svg:hover': {
    cursor: 'pointer',
    color: 'var(--gray-500)',
  },
});

const StyledCard = styled(Card)({
  boxSizing: 'border-box',
});

const schema = yup
  .object({ title: yup.string().required('Required') })
  .required();

type TaskType = {
  onUpdate: (item: ITask) => void;
  onRemove: (id: string) => void;
} & ITask;

const Task: React.FC<TaskType> = ({
  title,
  id,
  status,
  onUpdate,
  onRemove,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({ resolver: yupResolver(schema) });

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit: SubmitHandler<ITask> = (data) => {
    setIsEdit(false);
    onUpdate({ ...data, id });
  };

  return (
    <StyledCard w='100%' p={3}>
      <Flex
        tag='form'
        justifyContent='space-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box w='100%'>
          {isEdit ? (
            <>
              <Box>
                <Box mb={2}>
                  <Controller
                    name='title'
                    control={control}
                    defaultValue={title}
                    render={({ field }) => (
                      <Input state={isEmpty(errors) ? 'normal' : 'invalid'}>
                        <Input.Value {...field} placeholder='Title task' />
                      </Input>
                    )}
                  />
                  <Text color='var(--red)' size={100}>
                    {errors?.title?.message}
                  </Text>
                </Box>

                <Controller
                  name='status'
                  control={control}
                  defaultValue={status}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder='Select status'
                    />
                  )}
                />
              </Box>

              <Button mt={3} theme='success' use='primary' type='submit'>
                Save
              </Button>
            </>
          ) : (
            <Text>{title}</Text>
          )}
        </Box>

        <ControlWrapper pl={3}>
          <EditM onClick={() => setIsEdit(true)} />
          <CloseM onClick={() => onRemove(id)} ml={2} />
        </ControlWrapper>
      </Flex>
    </StyledCard>
  );
};

export default Task;
