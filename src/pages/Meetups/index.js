import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays } from 'date-fns';
import br from 'date-fns/locale/pt-BR';
import { useIsFocused } from '@react-navigation/core';

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

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isFocused = useIsFocused();

  const requestDate = useCallback(async () => {
    setLoading(true);
    const response = await api.get(
      `/organizing?date=${format(selectedDate, 'yyyy-MM-dd')}`
    );
    setPage(1);
    setSize(response.data.count);
    setMeetups(response.data.rows);
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    requestDate();
  }, [requestDate, isFocused]);

  useEffect(() => {
    async function request() {
      setLoading(true);
      const response = await api.get(
        `/organizing?date=${format(selectedDate, 'yyyy-MM-dd')}&page=${page}`
      );
      setMeetups([...meetups, ...response.data.rows]);
      setLoading(false);
    }
    if (page !== 1) {
      request();
    }
    console.tron.log(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function nextDay() {
    setSelectedDate(addDays(selectedDate, 1));
  }

  function prevDay() {
    if (!isPast(subDays(endOfDay(selectedDate), 1))) {
      setSelectedDate(subDays(selectedDate, 1));
    }
  }

  function nextPage() {
    if (meetups.length < size) {
      setPage(page + 1);
    }
  }

  async function subscribe(meetup) {
    try {
      await api.post(`/meetups/${meetup.id}/subscriptions`);
      Alert.alert(`Inscrição feita com sucesso`);
    } catch (error) {
      Alert.alert(error.response.data.error);
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

        <List
          ListFooterComponent={() =>
            loading && (
              <LoadingContainer>
                <ActivityIndicator size="large" color="#fff" />
              </LoadingContainer>
            )
          }
          ListEmptyComponent={
            <>
              {!loading && (
                <EmptyText>Nenhum Meetup marcado para esse dia</EmptyText>
              )}
            </>
          }
          onEndReachedThreshold={0.05}
          onEndReached={nextPage}
          data={meetups}
          renderItem={({ item }) => (
            <MeetupCard
              action={() => subscribe(item)}
              textAction="Realizar inscrição"
              meetup={item}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Container>
    </Background>
  );
}
