import styled from '@emotion/styled';
import Card from '@semcore/card';

const StyledCard = styled(Card)({
  boxSizing: 'border-box',
});

type TaskType = {
  title: string;
};

const Task: React.FC<TaskType> = ({ title }) => {
  return (
    <StyledCard w='100%' p={5}>
      {title}
    </StyledCard>
  );
};

export default Task;
