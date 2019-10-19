import React from 'react';

import logo from '~/assets/logo.png';

import { Container, Logo } from './styles';

export default function HeaderBar() {
  return (
    <Container>
      <Logo width="23" source={logo} />
    </Container>
  );
}
