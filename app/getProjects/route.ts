import { NextResponse } from "next/server";
import { getDocument } from "@/lib/firebaseAdmin";
import { FIREBASE_CONSTANTS } from "@/lib/constants";

export async function GET(req: any, res: any) {
  try {
    if (req.method === "GET") {
      const data = await getDocument({
        collectionName: FIREBASE_CONSTANTS.PORTFOLIO_COLLECTION_NAME,
        documentId: FIREBASE_CONSTANTS.PORTFOLIO_COLELCTION_DOCUMENT_ID,
      });

      return NextResponse.json(
        { projects: data?.projectData },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
