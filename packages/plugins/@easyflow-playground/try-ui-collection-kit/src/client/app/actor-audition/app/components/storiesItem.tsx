import React from 'react';
import {
  Button,
} from '@chakra-ui/react';
import { useStories } from '../hooks/useStories';


export const StoriesItem = ({ story }) => {
  const { isSelectedStory, changeStory }: any = useStories();
  const { id, name } = story;


  return (
    <Button
      variant="outline"
      disabled={isSelectedStory(id)}
      onClick={() => changeStory(id)}
    >
      {name}
    </Button>
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
