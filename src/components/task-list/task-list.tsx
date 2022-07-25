import React, { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

import CreateForm from '@components/create-form';
import Task from '@components/task';
import { ITask } from '@interfaces/task';

import { add, remove, update } from '../../features/tasks';
import { RootState } from '../../store';

const StyledList = styled(Box)({
  '& > :not(:last-child)': {
    marginBottom: '16px',
  },
});

const TaskList: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const taskList = useSelector((state: RootState) => state.tasks.list);
  const dispatch = useDispatch();

  const closeCreateForm = useCallback(() => setVisible(false), []);

  const createTask = useCallback((task: ITask) => dispatch(add(task)), []);
  const updateTask = useCallback((task: ITask) => dispatch(update(task)), []);
  const removeTask = useCallback((id: string) => dispatch(remove(id)), []);

  return (
    <Card mt={4} p={5}>
      <Text tag='p' size={300} bold mb={4}>
        To Do
      </Text>

      <Button
        theme='success'
        use='primary'
        onClick={() => setVisible(true)}
        mb={4}
      >
        Create Task
      </Button>

      <StyledList>
        {taskList.map((item) => (
          <Task
            key={item.id}
            {...item}
            onRemove={removeTask}
            onUpdate={updateTask}
          />
        ))}

        {visible && (
          <CreateForm onCreate={createTask} onCancel={closeCreateForm} />
        )}
      </StyledList>
    </Card>
  );
};

export default TaskList;
