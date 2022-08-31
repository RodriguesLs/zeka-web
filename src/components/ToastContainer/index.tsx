import { useTransition } from 'react-spring';

import { ToastMessage } from '@/contexts/ToastContext';
import Toast from './Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer = ({ messages }: ToastContainerProps) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
    onRest: () => messages,
  });

  return (
    <Container>
      {messagesWithTransitions((style, item) => (
        <Toast key={item.id} message={item} style={style} />
      ))}
    </Container>
  );
};

export default ToastContainer;
