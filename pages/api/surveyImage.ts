// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiHandler } from "next";
import { createCanvas, loadImage, registerFont } from "canvas";
import { join } from "path";

registerFont(join(process.cwd(), "fonts", "anakotmai-bold.ttf"), {
    family: "Anakotmai"
})

const handler: NextApiHandler = async (req, res) => {
    const canvas = createCanvas(960, 1706)
    const ctx = canvas.getContext("2d")
    const image = await loadImage(join(process.cwd(), "survey", "template-with-name.jpg"))
    ctx.drawImage(image, 0,0)
    ctx.font = '60px "Anakotmai"'
    ctx.fillText("Test", 250, 250)

    res.setHeader("Content-Type", "image/jpeg")
    canvas.createJPEGStream().pipe(res)
}

export default handler