/* import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    if (!latitude || !longitude) {
      res.status(400).send("위치 정보를 가져올 수 없습니다.");
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const {
        data: { results },
      } = await axios.get(url);
      const data = results.map((result) => result.formatted_address);
      console.log(data);
      res.status(200).end();
    } catch (error) {
      res.status(404).end();
    }
  }
  res.status(405).end();
};
 */
