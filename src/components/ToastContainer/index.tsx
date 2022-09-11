import { useTransition } from 'react-spring';
import { Box } from '@chakra-ui/react';

import { ToastMessage } from '@/contexts/ToastContext';
import Toast from './Toast';

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
    <Box position='absolute' right='0' bottom='0' padding='1.5rem' overflow='hidden'>
      {messagesWithTransitions((style, item) => (
        <Toast key={item.id} message={item} style={style} />
      ))}
    </Box>
  );
};

export default ToastContainer;
