import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/core';

import { withNavigationFocus } from 'react-navigation';
import { Background } from '~/components/Background';
import MeetupCard from '~/components/MeetupCard';
import { Container, List, LoadingContainer, EmptyText } from './styles';
import api from '~/services/api';

// import { Container } from './styles';
function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const request = useCallback(async () => {
    setLoading(true);
    const response = await api.get(`/subscriptions`);
    setSubscriptions(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    request();
  }, [isFocused, request]);

  async function unsubscribe(subscribe) {
    try {
      await api.delete(`/subscriptions/${subscribe.id}`);
      Alert.alert(`Inscrição cancelada com sucesso`);
      request();
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <List
          ListFooterComponent={() =>
            loading && (
              <LoadingContainer>
                <ActivityIndicator size="large" color="#fff" />
              </LoadingContainer>
            )
          }
          ListEmptyComponent={
            !loading && (
              <EmptyText>
                Nenhum Meetup inscrito para os proximos dias
              </EmptyText>
            )
          }
          data={subscriptions}
          renderItem={({ item }) => (
            <MeetupCard
              action={() => unsubscribe(item)}
              textAction="Cancelar inscrição"
              meetup={item.meetup}
              color="#D44059"
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Subscriptions);
