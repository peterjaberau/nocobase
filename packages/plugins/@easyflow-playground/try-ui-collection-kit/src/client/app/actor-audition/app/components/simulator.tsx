import React from 'react';
import {
  Button, Card, Stack, Text, HStack, Box, Heading, Image, Link, Badge
} from '@chakra-ui/react';
import { useSimulator } from '../hooks/useSimulator';


export const Simulator = () => {
  const { simulator, startSimulator, stopSimulator, isRunning, isDisabled, attachedStory }: any = useSimulator();


  return (
    simulator.context && (
      <Stack>
        <HStack justify="flex-start" align="center">
          <Button variant="outline" disabled={isRunning || isDisabled} onClick={() => startSimulator()}>
            Start
          </Button>
          <Button variant="outline" disabled={!isRunning || isDisabled} onClick={() => stopSimulator()}>
            Stop
          </Button>
        </HStack>
        <HStack justify="flex-start" align="center" wrap="wrap" >
         <Badge>state: {simulator.value}</Badge>
          <Badge>hasStory: {`${!isDisabled}`}</Badge>
          <Badge>Story: {attachedStory?.name || '-'}</Badge>
        </HStack>

      </Stack>
    )
  );
};


/*




        <Link
          key={item.id}
          to={`category/${item.name}`}
          className="hover:scale-105 transition-transform md:basis-[40%] basis-[90%]"
        >
          <figure className="flex flex-nowrap flex-col relative border-4 border-blue-800">
            <img
              src={item.image_src}
              alt="category Image"
              className="object-cover w-full category-image h-[17rem]"
            />
            <figcaption className="absolute bottom-0 bg-slate-700 text-white w-full h-20 p-5 uppercase opacity-80">

            </figcaption>
          </figure>
        </Link>



 */
