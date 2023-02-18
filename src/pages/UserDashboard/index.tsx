import fetchData from './services/fetchData';
import { MainDiv } from './user-dashboard.styled';
import ProgressBar from '@/components/ProgressBar';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';

const UserDashboard = () => {
  const { data, isLoading } = useQuery(['student-summary-guid'], fetchData);

  if (isLoading) return <Spinner />

  console.log({ data });

  return (
    <>
      <MainDiv>
        {data?.history?.map((h: any) => (
          <>
            <p><b>{ h.course.toUpperCase() }</b></p>
            <ProgressBar key={h.progress} progress={h.progress} />
          </>
        ))}
      </MainDiv>
    </>
  );
}

export default UserDashboard;
