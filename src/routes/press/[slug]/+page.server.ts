import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const pressRelease = await prisma.pressPost.findUnique({
    where: { slug }
  });

  if (!pressRelease) {
    throw error(404, 'Press release not found');
  }

  return {
    title: pressRelease.title,
    content: pressRelease.content,
    date: pressRelease.date
  };
};

