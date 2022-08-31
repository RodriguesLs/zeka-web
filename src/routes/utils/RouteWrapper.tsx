import { ComponentType, useEffect } from 'react';

interface RouteWrapperProps {
  component: ComponentType;
  title?: string;
}

const RouteWrapper = ({ component: Component, title = '' }: RouteWrapperProps) => {
  useEffect(() => {
    if (title) document.title = `Zeka | ${title}`;
    else document.title = 'Zeka Educação Digital';
  }, [title]);

  return <Component />;
};

export default RouteWrapper;
