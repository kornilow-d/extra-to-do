import React, { useCallback } from 'react';
import { Box } from '@semcore/flex-box';

import TaskList from '@components/task-list';

const Home: React.FC = () => {
  return (
    <Box my={5}>
      <TaskList />
    </Box>
  );
};

export default Home;
