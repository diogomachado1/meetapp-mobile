import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import {
  Container,
  ImageMeetup,
  Details,
  Title,
  Detail,
  Text,
  ButtonCard,
} from './styles';

export default function MeetupCard({ meetup, action, textAction, color }) {
  return (
    <Container>
      <ImageMeetup
        source={{
          uri: meetup.file.url,
        }}
      />
      <Details>
        <Title>{meetup.title}</Title>
        <Detail>
          <Icon name="event" size={20} color="#999" />
          <Text>
            {format(parseISO(meetup.date), "dd 'de' MMMM', ás' HH:mm'h'", {
              locale: br,
            })}
          </Text>
        </Detail>
        <Detail>
          <Icon name="place" size={20} color="#999" />
          <Text>{meetup.location}</Text>
        </Detail>
        <Detail>
          <Icon name="person" size={20} color="#999" />
          <Text>{meetup.user.name}</Text>
        </Detail>
        <ButtonCard onPress={action} color={color}>
          {textAction}
        </ButtonCard>
      </Details>
    </Container>
  );
}

MeetupCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meetup: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  textAction: PropTypes.string.isRequired,
  color: PropTypes.string,
};

MeetupCard.defaultProps = {
  color: '#F94D6A',
};
