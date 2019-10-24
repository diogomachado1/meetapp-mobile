import styled from 'styled-components/native';

export const Container = styled.View``;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

// eslint-disable-next-line no-unused-vars
export const List = styled.FlatList.attrs(props => ({
  contentContainerStyle: { paddingBottom: 20 },
}))`
  padding: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
`;
