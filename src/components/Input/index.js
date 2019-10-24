import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

// eslint-disable-next-line react/prop-types
function Input({ style, icon, ...rest }, ref) {
  return (
    <Container styled={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

// Input.propTypes = {
//   icon: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// };

// Input.defaultProps = {
//   icon: null,
//   style: {},
// };
export default forwardRef(Input);
