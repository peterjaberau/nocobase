import React from 'react';
import { Text, Badge, HStack, Box, VStack, Button, Icon, Image, IconButton } from '@chakra-ui/react';
import { BadgeProps } from '@chakra-ui/react';
import { ArrowUpRightOnBox, TriangleRightMini, XMark } from '../../icons';

export type CardProps = {
  type?: 'default' | 'large' | 'filler' | 'mini';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  image?: string;
  themeImage?: {
    light: string;
    dark: string;
  };
  imageDimensions?: {
    width: number;
    height: number;
  };
  title?: string;
  text?: string;
  href?: string;
  children?: React.ReactNode;
  badge?: BadgeProps;
  highlightText?: string[];
  closeable?: boolean;
  onClose?: () => void;
  isExternal?: boolean;
};

export const CardDefaultLayout = ({
  icon,
  image,
  title,
  text,
  href,
  children,
  badge,
  rightIcon,
  isExternal,
  highlightText = [],
}: CardProps) => {
  return (
    <HStack
      w="full"
      borderRadius="md"
      shadow="xs"
      paddingY="2"
      paddingX={'2'}
      backgroundColor={'bg.subtle'}
    >
      <HStack flex={1} gap={1}>
        {icon && (
          <Icon padding={'4.5px'} shadow={'xs'}>
            {icon}
          </Icon>
        )}
        {image && <Image src={image} />}
        <VStack  overflow={'auto'} justify={'center'} alignItems={'left'} gap={0.5}>
          {title && <Text  mb={0} textStyle={'sm'} fontWeight={'500'} >{title}</Text>}
          {text && <Text  mb={0} textStyle={'xs'} >{text}</Text>}
          {children}
        </VStack>
      </HStack>

      <HStack flex={1} justify={'flex-end'} gap={1}>
        {badge && <Badge {...badge} />}

        {rightIcon && (
          <Icon padding={'4.5px'} shadow={'xs'}>
            {icon}
          </Icon>
        )}
        {!rightIcon && isExternal && <ArrowUpRightOnBox />}
        {!rightIcon && !isExternal && <TriangleRightMini />}
      </HStack>
    </HStack>
  );
};

export const CardLayoutMini = ({
  icon,
  image,
  title,
  text,
  closeable = false,
  onClose,
  isExternal,
  imageDimensions = { width: 45, height: 36 },
}: CardProps) => {
  return (
    <HStack w="full" borderRadius="md" shadow="sm" paddingY="2" paddingX={'2'} backgroundColor={'bg.subtle'}>
      <HStack flex={1} gap={1}>
        {icon && (
          <Icon padding={'4.5px'} shadow={'xs'}>
            {icon}
          </Icon>
        )}
        {image && (
          <Image src={image} width={imageDimensions.width} height={imageDimensions.height} alt={title || text || ''} />
        )}
        <VStack flex={1} overflow={'auto'} justify={'center'} alignItems={'left'}>
          {title && <Text  mb={0} textStyle={'sm'} >{title}</Text>}
          {text && <Text  textStyle={'xs'} >{text}</Text>}
        </VStack>
      </HStack>

      <HStack justify={'flex-end'} gap={1}>
        {!closeable && <Icon size={'sm'}>{isExternal ? <ArrowUpRightOnBox /> : <TriangleRightMini />}</Icon>}
        {closeable && (
          <IconButton variant="plain" onClick={onClose}>
            <XMark />
          </IconButton>
        )}
      </HStack>
    </HStack>
  );
};

export const CardLargeLayout = ({ title, text, image, icon, isExternal }: CardProps) => {
  return (
    <HStack w="full" borderRadius="md" shadow="xs" paddingY="2" paddingX={'2'} backgroundColor={'bg.subtle'}>
      <HStack flex={1} gap={1}>
        {icon && <Icon size={'md'}>{icon}</Icon>}
        {image && <Image src={image} width={'144px'} alt={title || text || ''} />}
        <VStack flex={1} overflow={'auto'} justify={'center'} alignItems={'left'}>
          <HStack gap={1}>
            {title && <Text  mb={0} textStyle={'sm'} >{title}</Text>}
            {isExternal && (
              <Icon size={'md'}>
                <ArrowUpRightOnBox />
              </Icon>
            )}
            {!isExternal && (
              <Icon size={'md'}>
                <TriangleRightMini />
              </Icon>
            )}
          </HStack>
          {text && <Text  textStyle={'xs'} >{text}</Text>}
        </VStack>
      </HStack>
    </HStack>
  );
};

export const CardUi = ({ type = 'default', ...props }: CardProps) => {
  switch (type) {
    case 'large':
      return <CardLargeLayout {...props} />;
    case 'mini':
      return <CardLayoutMini {...props} />;
    default:
      return <CardDefaultLayout {...props} />;
  }
};
