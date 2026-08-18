// pages/api/search.ts

import { client } from 'lib/sanity.client';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query.q;

  if (!q || typeof q !== 'string') {
    return res.status(200).json([]);
  }

  const results = await client.fetch(
    `*[_type == "post" && title match $search]{    
  _id,
  title,
  excerpt,
  "slug": slug.current,
  "category": category->{title, "slug": slug.current}
      }`,
    { search: `${q}*` }
  );

  res.status(200).json(results);
}