import { ComponentType, useEffect } from 'react';
import { useTitlePage } from '@/contexts/TitlePageContext';

interface RouteWrapperProps {
  component: ComponentType;
  title?: string;
}

const RouteWrapper = ({ component: Component, title = '' }: RouteWrapperProps) => {
  const { changeTitlePage } = useTitlePage();

  useEffect(() => {
    if (title) document.title = `Zeka | ${title}`;
    else document.title = 'Zeka Educação Digital';

    changeTitlePage(title);
  }, [title]);

  return <Component />;
};

export default RouteWrapper;
