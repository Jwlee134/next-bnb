import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;
    if (!keyword) {
      res.status(400).send("키워드가 없습니다.");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
        }&language=ko&input=${encodeURI(keyword as string)}`
      );
      // console.log(data);
      const results = data.predictions.map((prediction: any) => {
        return {
          description: prediction.description,
          placeId: prediction.place_id,
        };
      });
      res.status(200).send(results);
    } catch (error) {
      res.status(404).send("관련 위치 정보를 가져올 수 없습니다.");
    }
  }
  res.status(405).end();
};
