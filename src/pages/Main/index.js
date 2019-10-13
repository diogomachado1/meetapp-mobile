import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '~/components/Button';
import { signOut } from '~/store/modules/auth/actions';

// import { Container } from './styles';

export default function Main() {
  const dispatch = useDispatch();
  return <Button onPress={() => dispatch(signOut())}>Sair</Button>;
}
