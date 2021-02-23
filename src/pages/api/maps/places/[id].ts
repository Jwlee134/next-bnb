import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      res.status(400).send("해당 항목의 위치 정보를 가져올 수 없습니다.");
      return;
    }
    try {
      const {
        data: {
          result: {
            geometry: {
              location: { lat, lng },
            },
          },
        },
      } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );
      const result = { latitude: lat, longitude: lng };
      res.status(200).send(result);
    } catch (error) {
      res.status(404).end();
    }
  }
  res.status(405).end();
};
