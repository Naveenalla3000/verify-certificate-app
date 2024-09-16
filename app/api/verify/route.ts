import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("Request received");
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    console.log(`Search params: ${searchParams}`);
    const cid = searchParams.get("cid");
    console.log(`Certificate ID: ${cid}`);
    if (!cid) {
      return NextResponse.json(
        { message: "Invalid certificate ID" },
        { status: 400, statusText: "Bad Request" }
      );
    }
    const certmetricsResponse = await axios.get(
      `https://api.certmetrics.com/amazon/verification/certification/${cid}`
    );
    if (certmetricsResponse.status !== 200) {
      return NextResponse.json(
        { message: "Failed to verify certification" },
        { status: 500, statusText: "Internal Server Error" }
      );
    }
    const certmetricsData = certmetricsResponse.data;
    if (!certmetricsData) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404, statusText: "Not Found" }
      );
    }
    return NextResponse.json(
      {
        certification: {
          firstName: certmetricsData.firstName,
          lastName: certmetricsData.lastName,
          certName: certmetricsData.certName,
          certExpireDate: certmetricsData.certExpireDate,
          certActiveDate: certmetricsData.certActiveDate,
          certStatus: certmetricsData.certStatus,
        },
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: "An unknown error occurred" });
    }
  }
}
