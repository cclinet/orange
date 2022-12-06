// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send(0);
}
