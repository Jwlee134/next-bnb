import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
      );
      res.status(204).end();
    } catch (error) {
      res.status(500).send(error);
    }
  }
  res.status(405).end();
};
