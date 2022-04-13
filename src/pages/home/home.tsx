import React from 'react';
import { Flex } from '@semcore/flex-box';

import CreateForm from '@components/create-form';

const Home: React.FC = () => {
  return (
    <Flex my={5}>
      <CreateForm />
    </Flex>
  );
};

export default Home;
