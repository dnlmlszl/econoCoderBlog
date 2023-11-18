import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { background-color: #d1d5db; }
  50% { background-color: #9ca3af; }
  100% { background-color: #d1d5db; }
`;

const pulse2 = keyframes`
  0% { background-color: #fff; }
  50% { background-color: #9ca3af; }
  100% { background-color: #fff; }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding: 2rem;
  height: 100vh;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const SkeletonColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const SkeletonTextBlock = styled.div`
  margin-bottom: 1rem;
  width: 80%;
`;

const SkeletonTitle = styled.div`
  height: 2.75rem;
  width: 90%;
  /* background-color: #9ca3af; */
  margin: 0 auto 1.5rem;
  animation: ${pulse2} 1s ease-in-out infinite;
`;

const SkeletonText = styled.div`
  height: 1.5rem;
  width: 70%;
  /* background-color: #9ca3af; */
  margin: 0 auto 1.5rem;
  animation: ${pulse2} 1s ease-in-out infinite;
`;

const SkeletonFormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 50%;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const SkeletonInput = styled(SkeletonText)`
  height: 2rem;
  width: 90%;
  margin-bottom: 1rem;
  background-color: #9ca3af;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SkeletonButton = styled(SkeletonText)`
  height: 2rem;
  width: 90%;
  background-color: #9ca3af;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SkeletonButtonHome = styled(SkeletonText)`
  height: 2rem;
  width: 30%;
  background-color: #9ca3af;
  animation: ${pulse2} 1s ease-in-out infinite;
`;

const SkeletonScreen = () => {
  return (
    <SkeletonWrapper>
      <SkeletonColumn>
        <SkeletonTextBlock>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
        </SkeletonTextBlock>
        <SkeletonTextBlock>
          <SkeletonText />
          <SkeletonText />
          <SkeletonButtonHome />
        </SkeletonTextBlock>
      </SkeletonColumn>
      <SkeletonFormContainer>
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonButton />
      </SkeletonFormContainer>
    </SkeletonWrapper>
  );
};

export default SkeletonScreen;

// import styled, { keyframes } from 'styled-components';

// const shimmer = keyframes`

//   0% { background-color: #d1d5db; }
//   50% { background-color: #9ca3af; }
//   100% { background-color: #d1d5db; }
// `;

// const SkeletonBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-basis: 50%;
//   align-items: center;
//   justify-content: center;
//   padding: 2rem;
// `;

// const Skeleton = styled.div`
//   background-color: #d1d5db;
//   background-image: linear-gradient(
//     to right,
//     #d1d5db 8%,
//     #9ca3af 18%,
//     #d1d5db 33%
//   );
//   background-size: 800px 104px;
//   border-radius: 4px;
//   animation: ${shimmer} 1.5s ease-in-out infinite;
//   width: ${(props) => props.width || '100%'};
//   height: ${(props) => props.height || '20px'};
//   margin: ${(props) => props.margin || '0.5rem 0'};
// `;

// const SkeletonScreen = () => {
//   return (
//     <section className="flex flex-col md:flex-row justify-center items-center w-full h-screen">
//       <SkeletonBlock>
//         <Skeleton height="40px" width="80%" $margin="2rem 0" />
//         <Skeleton height="20px" width="100%" $margin="1rem 0" />
//         <Skeleton height="20px" width="90%" />
//         <Skeleton height="20px" width="90%" />
//         <Skeleton height="20px" width="90%" />
//         <Skeleton height="40px" width="60%" $margin="2rem 0" />
//       </SkeletonBlock>
//       <SkeletonBlock>
//         <Skeleton height="40px" width="80%" $margin="2rem 0" />
//         <Skeleton height="100px" width="100%" $margin="1rem 0" />
//         <Skeleton height="20px" width="80%" />
//         <Skeleton height="20px" width="80%" />
//         <Skeleton height="20px" width="80%" />
//         <Skeleton height="40px" width="50%" $margin="2rem 0" />
//       </SkeletonBlock>
//     </section>
//   );
// };

// export default SkeletonScreen;
