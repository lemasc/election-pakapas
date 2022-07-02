import axios from "axios";
import { unsealData } from "iron-session";
import { NextApiHandler } from "next";
import { sessionOptions, TokenData } from "../../../utils/survey";

const download: NextApiHandler = async (req, res) => {
  const { token } = req.query || {};
  if (typeof token !== "string") {
    return res.status(400).end("Bad Request");
  }
  const { name } = await unsealData<TokenData>(token, sessionOptions);
  const url = `https://election-pakapas-survey.vercel.app/api/story?token=${req.query.token}`;
  try {
    const { data } = await axios.get(url, {
      responseType: "stream",
    });
    res.setHeader("Content-Transfer-Encoding", "Binary");
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="survey-${new Date().valueOf()}.jpg`
    );
    data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).end("Internal Server Error");
  }
};

export default download;
