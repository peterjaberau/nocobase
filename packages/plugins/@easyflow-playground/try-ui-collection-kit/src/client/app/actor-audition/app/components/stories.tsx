import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useStories } from '../hooks/useStories';
import { StoriesItem } from './storiesItem';

export const Stories = () => {
  const { stories }: any = useStories();

  if (!stories.context) {
    return <p>Loading...</p>;
  }

  return (
    <Stack>
      {stories.context.map((item) => (
        <StoriesItem key={item.id} story={item} />
      ))}
    </Stack>
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
