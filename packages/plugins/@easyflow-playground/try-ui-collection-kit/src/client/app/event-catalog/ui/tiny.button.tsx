import React from 'react';
import { Button } from '@chakra-ui/react';

export const TinyButton = (props) => {
  const { children, ...rest } = props;
  return (
    <Button
      size={'sm'}
      color={ props.variant === 'solid' || !props.variant ? 'fg.inverted': undefined }
      borderRadius={'lg'}
      shadow={'sm'}
      {...rest}
    >
      {children}
    </Button>
  );
};
