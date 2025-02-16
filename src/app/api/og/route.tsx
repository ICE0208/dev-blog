import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // const fontBold = await nanumHumanBold;
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    if (!title) {
      return new Response("No title provided", { status: 500 });
    }
    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#020817",
            color: "#F8FAFC",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 80 }}>{heading}</div>
          <div style={{ marginTop: 40, fontSize: 34 }}>
            {"🧊 ICE28's Dev Blog"}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
