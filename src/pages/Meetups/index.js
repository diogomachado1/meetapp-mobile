import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { isPast, endOfDay } from 'date-fns/esm';
import { Background } from '~/components/Background';
import api from '~/services/api';
import MeetupCard from '~/components/MeetupCard';
import {
  List,
  Container,
  PickerDay,
  Title,
  LoadingContainer,
  EmptyText,
} from './styles';
import Button from '~/components/Button';

// import { Container } from './styles';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function request() {
      setLoading(true);
      const response = await api.get(
        `/organizing?date=${selectedDate.toISOString()}`
      );
      setMeetups(response.data);
      setLoading(false);
    }
    request();
    console.tron.log();
  }, [selectedDate]);

  function nextDay() {
    setSelectedDate(addDays(selectedDate, 1));
  }

  function prevDay() {
    if (!isPast(subDays(endOfDay(selectedDate), 1))) {
      setSelectedDate(subDays(selectedDate, 1));
    }
  }

  return (
    <Background>
      <Container>
        <PickerDay>
          <Button
            disabled={isPast(subDays(endOfDay(selectedDate), 1))}
            color="#fff0"
            onPress={() => prevDay()}
          >
            <Icon name="chevron-left" size={35} color="#fff" />
          </Button>
          <Title>
            {format(selectedDate, "dd' de ' MMMM", {
              locale: br,
            })}
          </Title>
          <Button color="#fff0" onPress={() => nextDay()}>
            <Icon name="chevron-right" size={35} color="#fff" />
          </Button>
        </PickerDay>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingContainer>
        ) : (
          <>
            {meetups.length > 0 ? (
              <List
                data={meetups}
                renderItem={({ item }) => <MeetupCard meetup={item} />}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <EmptyText>Nenhum Meetup marcado para esse dia</EmptyText>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}
