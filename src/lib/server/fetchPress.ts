import { prisma } from '$lib/server/prisma';

export const fetchBlogPosts = async () => {
  return prisma.pressPost.findMany({
    select: {
      slug: true,
      title: true,
      date: true
    },
    orderBy: { date: 'desc' }
  });
};
