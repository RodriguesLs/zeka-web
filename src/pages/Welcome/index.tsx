import useAuth from '@/hooks/useAuth';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import localStorageService from '@/services/localStorageService';
import { StyledDiv, StyledP } from './welcome.styled';

const Welcome = () => {
  moment.updateLocale('pt', {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthsShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    weekdaysShort: [
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb'
    ]
  });

  const { role, user } = useAuth();
  const localizer = momentLocalizer(moment);

  const events = [
    {
      'title': 'All Day Event very long title',
      'allDay': true,
      'start': new Date(2023, 1, 0),
      'end': new Date(2023, 1, 1)
    },
    {
      'title': 'Long Event',
      'start': new Date(2023, 1, 7),
      'end': new Date(2023, 1, 10)
    },
    {
      'title': 'DTS STARTS',
      'start': new Date(2023, 2, 13, 0, 0, 0),
      'end': new Date(2023, 2, 20, 0, 0, 0)
    },
    {
      'title': 'DTS ENDS',
      'start': new Date(2023, 10, 6, 0, 0, 0),
      'end': new Date(2023, 10, 13, 0, 0, 0)
    },
    {
      'title': 'Some Event',
      'start': new Date(2023, 1, 9, 0, 0, 0),
      'end': new Date(2023, 1, 9, 0, 0, 0)
    },
    {
      'title': 'Conference',
      'start': new Date(2023, 1, 11),
      'end': new Date(2023, 1, 13),
      desc: 'Big conference for important people'
    },
    {
      'title': 'Meeting',
      'start': new Date(2023, 1, 12, 10, 30, 0, 0),
      'end': new Date(2023, 1, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
      'title': 'Lunch',
      'start': new Date(2023, 1, 12, 12, 0, 0, 0),
      'end': new Date(2023, 1, 12, 13, 0, 0, 0),
      desc: 'Power lunch'
    },
    {
      'title': 'Meeting',
      'start': new Date(2023, 1, 12, 14, 0, 0, 0),
      'end': new Date(2023, 1, 12, 15, 0, 0, 0)
    },
    {
      'title': 'Happy Hour',
      'start': new Date(2023, 1, 12, 17, 0, 0, 0),
      'end': new Date(2023, 1, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day'
    },
    {
      'title': 'Dinner',
      'start': new Date(2023, 1, 12, 20, 0, 0, 0),
      'end': new Date(2023, 1, 12, 21, 0, 0, 0)
    },
    {
      'title': 'Birthday Party',
      'start': new Date(2023, 1, 13, 7, 0, 0),
      'end': new Date(2023, 1, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 2',
      'start': new Date(2023, 1, 13, 7, 0, 0),
      'end': new Date(2023, 1, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 3',
      'start': new Date(2023, 1, 13, 7, 0, 0),
      'end': new Date(2023, 1, 13, 10, 30, 0)
    },
    {
      'title': 'Late Night Event',
      'start': new Date(2023, 1, 17, 19, 30, 0),
      'end': new Date(2023, 1, 18, 2, 0, 0)
    },
    {
      'title': 'Multi-day Event',
      'start': new Date(2023, 1, 20, 19, 30, 0),
      'end': new Date(2023, 1, 22, 2, 0, 0)
    }
  ]

  if (!user) {
    localStorageService().signOut();

    // setToken('');
    // setUser(null);
    // setRole(null);
    // setOrganizationId(0);
  }

  const realName = user?.avatar_name || user?.email?.split('@')[0];

  const StyledNonStudent = () => {
    return (
      <StyledDiv>
        <StyledP>Em caso de dúvidas, entre em contato com suporte@zekaedu.com.br</StyledP>
      </StyledDiv>
    );
  };

  return (
    <>
      <h1>
        Seja bem-vindo a ZEKA, <b>{realName}</b>
      </h1>
      {role !== 'student' && <StyledNonStudent />}
      {role === 'student' && (
        <>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            messages={{
              next: 'Prox',
              previous: 'Ant',
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
            }}
          />
          <StyledP>Em caso de dúvidas, entre em contato com suporte@zekaedu.com.br</StyledP>
        </>
      )}
    </>
  );
};

export default Welcome;
