import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body: any = await req.json();
  const user = body.user;
  const repo = body.repo;
  const workflowId = body.workflow_id;

  try {
    if (req.method === "POST") {
      const data = await axios({
        method: "POST",
        url: `https://api.github.com/repos/${user}/${repo}/actions/workflows/${workflowId}/dispatches`,
        data: {
          ref: "main",
        },
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
