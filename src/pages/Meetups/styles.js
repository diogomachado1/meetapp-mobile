import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px 0 20px 0;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const List = styled.FlatList`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  line-height: 20px;
`;

export const PickerDay = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const EmptyText = styled.Text`
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
`;
