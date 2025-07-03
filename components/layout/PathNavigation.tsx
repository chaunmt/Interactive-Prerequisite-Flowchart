'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

interface Props {
  locations?: string[];
}

export function PathNavigation({ locations = [] }: Props) {
  let cumulativePath = '';

  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      {/* Home icon linking to “/” */}
      <BreadcrumbItem href="/" icon={HiHome}>
        Home
      </BreadcrumbItem>

      {locations.map((location) => {
        // build up “/first”, “/first/second”, etc.
        cumulativePath += `/${location}`;

        return (
          <BreadcrumbItem key={cumulativePath} href={cumulativePath}>
            {location}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
