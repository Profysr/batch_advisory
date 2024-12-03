import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export async function GET() {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Failed to read db.json:", error);
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const updatedData = await req.json();
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to write to db.json:", error);
    return NextResponse.json(
      { error: "Failed to save data." },
      { status: 500 }
    );
  }
}
