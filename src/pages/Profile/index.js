import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '~/components/Button';
import { signOut } from '~/store/modules/auth/actions';
import { Background } from '~/components/Background';

// import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <Background>
      <Text> Profile </Text>
      <Button onPress={() => dispatch(signOut())}>Sair</Button>
    </Background>
  );
}
