import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { background-color: #d1d5db; }
  50% { background-color: #9ca3af; }
  100% { background-color: #d1d5db; }
`;

const SkeletonContainer = styled.li`
  border-radius: 0.5rem;
  padding: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
  margin-bottom: 2.5rem;
`;

const SkeletonTitle = styled.div`
  height: 1rem;
  width: 70%;
  background-color: #9ca3af;
  margin-bottom: 0.5rem;
`;

const SkeletonParagraph = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: #9ca3af;
  margin-bottom: 0.5rem;
`;

const SkeletonButton = styled.div`
  height: 2rem;
  width: 20%;
  background-color: #9ca3af;
`;

const SkeletonBlog = () => {
  return (
    <ul className="max-w-6xl w-9/12 mx-auto p-4 grid gap-4 pt-24">
      {Array.from({ length: 4 }, (_, index) => (
        <SkeletonContainer key={index}>
          <SkeletonTitle />
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonButton />
        </SkeletonContainer>
      ))}
    </ul>
  );
};

export default SkeletonBlog;
