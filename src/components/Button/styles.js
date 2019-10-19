import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: ${({ color }) => color || '#3b9eff'};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
