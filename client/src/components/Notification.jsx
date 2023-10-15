import styled from 'styled-components';
import { useGlobalContext } from '../context/blogContext';

const NotificationContainer = styled.div`
  padding: 1rem;
  margin: 1rem auto;
  width: 70%;
  max-width: 1170px;
  border-radius: 0.25rem;
  color: ${(props) => (props.type === 'error' ? '#b91c1c' : '#166534')};
  background-color: ${(props) =>
    props.type === 'error' ? '#ffe5e5 ' : '#e5ffe5'};
  border: 1px solid
    ${(props) => (props.type === 'error' ? '#b91c1c' : '#166534')};
`;

const Notification = () => {
  const { notification } = useGlobalContext();
  const { message, type } = notification;
  if (!message) return null;
  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};

export default Notification;
