import React from 'react';
import {
  SimpleGrid,
  Box,
  Button,
  Stack,
  HStack,
  Text,
  Badge,
  Card,
  Portal,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import { useCategories } from '../hooks/useCategories';


const Categories = () => {
  const { categories, isSelected, changeCategory }: any = useCategories();

  if (!categories.context) {
    return <p>Loading...</p>;
  }

  return (
    <Stack>
      {categories.context.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            disabled={isSelected(item.name)}
            onClick={() => changeCategory(item.name)}
          >
            {item.name}
          </Button>
      ))}
    </Stack>
  );
};

export default Categories;

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
