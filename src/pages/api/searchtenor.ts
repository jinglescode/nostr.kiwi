import type { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let results = await fetch(
    `https://tenor.googleapis.com/v2/search?key=${process.env.TENOR_API}&q=${req.query.search}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
  res.status(200).json(results);
}
