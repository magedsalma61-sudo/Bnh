import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzoJr1ojl-L1kUSTdoOL_1wYrMNdfgwJ4AVtuSnPHvbYAe7jGU0sjRvO27CI_2__qtTeQ/exec";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "لم يتم الحصول على رد صحيح من Google.",
        },
        { status: 502 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "حدث خطأ أثناء التسجيل.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message || "تم التسجيل بنجاح.",
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ في الاتصال بالخادم.",
      },
      { status: 500 }
    );
  }
}
