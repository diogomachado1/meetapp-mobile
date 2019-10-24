import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

export const Form = styled.ScrollView`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 30px;
`;

export const ErrorText = styled.Text`
  color: #f00;
`;

export const Separator = styled.View`
  margin: 20px 0;
  border-bottom-color: #979797aa;
  border-bottom-width: 1px;
`;

export const SaveButton = styled(Button).attrs({
  color: '#E5556E',
})`
  margin-top: 15px;
  height: 50px;
`;

export const ExitButton = styled(Button).attrs({
  color: '#D44059',
})`
  margin-top: 15px;
`;
