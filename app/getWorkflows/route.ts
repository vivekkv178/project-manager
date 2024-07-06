import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchParams: any = req.nextUrl.searchParams;
  const user = searchParams.get("user");
  const repo = searchParams.get("repo");

  try {
    if (req.method === "GET") {
      const data = await axios({
        method: "get",
        url: `https://api.github.com/repos/${user}/${repo}/actions/workflows`,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_REST_API_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      return NextResponse.json(data?.data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
