import React, { useCallback } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@semcore/button';
import Card from '@semcore/card';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

import CreateForm from '@components/create-form';
import Task from '@components/task';
import { ITask } from '@interfaces/task';

const StyledList = styled(Box)({
  '& > :not(:last-child)': {
    marginBottom: '16px',
  },
});

const TaskList: React.FC = () => {
  const [list, setList] = useState<ITask[]>([]);
  const [visible, setVisible] = useState(false);

  const closeCreateForm = useCallback(() => setVisible(false), []);

  const createTask = useCallback(
    (item: ITask) => setList((prevState) => [...prevState, { ...item }]),
    []
  );

  const updateTask = useCallback((task: ITask) => {
    setList((prevState) =>
      prevState.map((item) => (item.id === task.id ? { ...task } : item))
    );
  }, []);

  const removeTask = useCallback(
    (id: string) =>
      setList((prevState) => prevState.filter((item) => item.id !== id)),
    []
  );

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
        {list.map((item, index) => (
          <Task
            key={index}
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
