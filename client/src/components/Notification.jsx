import styled from 'styled-components';
import { useGlobalContext } from '../context/blogContext';

const NotificationContainer = styled.div`
  padding: 1rem;
  margin: 2rem auto;
  margin-top: 7rem;
  width: 70%;
  max-width: 1170px;
  border-radius: 0.25rem;
  font-weight: bold;
  color: ${(props) => (props.type === 'error' ? '#b91c1c' : '#166534')};
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  /* background-color: ${(props) =>
    props.type === 'error' ? '#ffe5e5 ' : '#e5ffe5'};
  border: 3px solid
    ${(props) => (props.type === 'error' ? '#b91c1c' : '#166534')}; */
`;

const Notification = () => {
  const { notification } = useGlobalContext();
  const { message, type } = notification;
  if (!message) return null;
  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};

export default Notification;
