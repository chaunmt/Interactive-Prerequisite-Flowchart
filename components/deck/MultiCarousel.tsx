"use client";

import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Button, Card } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";
import { Course } from "@/data/types";

interface Props {
  items?: Course[];
}

export function MultiCarousel({ items = [] }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
  };

  return (
    <Carousel
      responsive={responsive}
      ssr={true}
      autoPlay={false}
      infinite={true}
      showDots={false}
    >
      {items.map((course) => (
        <Card
          key={course.uid}
          className="h-[16rem] max-w-sm bg-gray-50 dark:bg-purple-900 hover:bg-gray-50"
        >
          <h5 className="text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-300">
            {course.code} {course.name}
          </h5>
          <p className="font-normal text-stone-700 dark:text-stone-400 h-[6rem] overflow-hidden">
            {course.info}
          </p>
          <Link
            href={`/courses/${course.subject}/${course.number}`}
            target="_blank"
          >
            <Button className="gap-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-800">
              <span>Learn more</span>
              <FaArrowRight />
            </Button>
          </Link>
        </Card>
      ))}
    </Carousel>
  );
}
