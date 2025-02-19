import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filePath: string[] }> }
) {
  try {
    // 환경변수에서 이미지 서버 URL을 가져옵니다.
    const baseUrl = process.env.IMAGE_SERVER_BASEURL;
    if (!baseUrl) {
      // 환경변수 없으면 에러를 반환합니다.
      return new NextResponse("IMAGE_SERVER_BASEURL is not set", {
        status: 500,
      });
    }

    // 이미지 아이디가 들어온 URL을 구성합니다.
    const { filePath } = await params;
    const imagePath = filePath.join("/");
    console.log(imagePath);
    const imageUrl = `${baseUrl}/static/uploads/${imagePath}`;

    // 이미지 요청을 보냅니다.
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      // 이미지 요청 실패 시 에러 반환
      return new NextResponse("Failed to fetch the image.", { status: 404 });
    }

    // 이미지가 잘 받아졌으면 반환합니다.
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type");

    // 이미지와 함께 적절한 MIME 타입을 반환합니다.
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType || "application/octet-stream", // 기본 binary로 설정
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred while fetching the image.", {
      status: 500,
    });
  }
}
