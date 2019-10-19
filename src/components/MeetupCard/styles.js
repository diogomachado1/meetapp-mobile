import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  width: 100%;
  background-color: #fff;
  margin: 10px 0;
  border-radius: 4px;
  overflow: hidden;
`;
export const ImageMeetup = styled.Image`
  width: 100%;
  height: 150px;
`;

export const Details = styled.View`
  padding: 20px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
export const Detail = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
export const Text = styled.Text`
  color: #999;
  margin-left: 5px;
`;

export const ButtonCard = styled(Button)`
  margin-top: 10px;
`;
