import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const {
      body: { key },
    } = req;
    const s3 = new aws.S3({
      accessKeyId: process.env.ACCESSKEY_ID,
      secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
    });
    s3.deleteObject(
      {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
      },
      (err) => {
        if (err) {
          res.status(500).send("다시 시도해 주세요.");
        }
      }
    );
    res.status(200).end();
  }
  res.status(405).end();
};
