
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const URLS: Record<string, string> = {
  helmiya:
    "https://script.google.com/macros/s/AKfycbw9StqV6jO2xvpKVgEss25Md9KD1t3wBaUgMOoKqNu0Ilo82dRZ5D_P1S2IWwGDsp_yPw/exec",
  nasr:
    "https://script.google.com/macros/s/AKfycbyQ6ntKgCOfuRDZNsVVY5iIEygtun4UG-SSWgymFxhisI9n1y2LY1m_SbmrV4EF6uzw7g/exec",
  obour:
    "https://script.google.com/macros/s/AKfycbwqXpH5ZryTDONnHsiJYzHEqzY_5VrhXlbByiU05tablYosyGb5dLcOAZggIXQ0ZW-CXQ/exec",
  haram:
    "https://script.google.com/macros/s/AKfycbyzbQBnfSsdyvxN6UQ-N3udD_hHPH1OA7xvh6wGI3FG20tvJ64lp5QYhlI4kw1j4qKiKQ/exec",
  shobra:
    "https://script.google.com/macros/s/AKfycbxRuRHJuWsXM70bLEcX218w08yvD7pKaKVSk2srUNjDZQ3yJ9liKEgTqg00_G2d9J3Q/exec",
  october:
    "https://script.google.com/macros/s/AKfycbxTYJNyRCd-v1GpziWQa8JZbT0T5YWCbU09fFntU9PvLQBmwD5f2l7UPA9C_pw3mTuHvg/exec",
};

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const branch = String(payload.branch ?? "").trim();
    const url = URLS[branch];

    if (!url) {
      return reply({
        success: false,
        message: "الفرع غير معروف.",
      }, 400);
    }

    const name = String(payload.customerName ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const date = String(payload.date ?? "").trim();
    const startTime = String(payload.startTime ?? "").trim();

    if (!name || !phone || !date || !startTime) {
      return reply({
        success: false,
        message: "الاسم والهاتف والتاريخ والموعد مطلوبون.",
      }, 400);
    }

    let body: Record<string, unknown>;

    if (branch === "obour" || branch === "haram") {
      const slotId = String(payload.slotId ?? "").trim();

      if (!slotId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return reply({
          success: false,
          message: "بيانات الموعد غير مكتملة. اختاري الموعد من جديد.",
        }, 400);
      }

      body = {
        date,
        slotId,
        time: startTime,
        name,
        phone,
        whatsapp: phone,
        health: "",
        medicines: "",
        notes: "",
      };
    } else if (branch === "helmiya") {
      body = {
        branch: "الحلمية",
        date,
        startTime,
        customerName: name,
        phone,
        notes: "",
      };
    } else if (branch === "shobra" || branch === "october") {
      const sheetName = String(payload.sheetName ?? "").trim();
      const row = Number(payload.row);

      if (!sheetName || !Number.isInteger(row) || row < 2) {
        return reply({
          success: false,
          message: "بيانات صف الموعد غير مكتملة.",
        }, 400);
      }

      body = {
        sheetName,
        row,
        name,
        phone,
        whatsapp: String(payload.whatsapp ?? phone).trim(),
        health: String(payload.health ?? "").trim(),
        medicines: String(payload.medicines ?? "").trim(),
        notes: String(payload.notes ?? "").trim(),
        branch,
      };
    } else {
      const sheetName = String(payload.sheetName ?? "").trim();
      const row = Number(payload.row);

      if (!sheetName || !Number.isInteger(row) || row < 2) {
        return reply({
          success: false,
          message: "بيانات صف الموعد غير مكتملة.",
        }, 400);
      }

      body = {
        sheetName,
        row,
        startTime,
        customerName: name,
        phone,
        whatsapp: phone,
        healthCondition: "",
        medications: "",
        notes: "",
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();

    let result: Record<string, unknown>;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Booking response was not JSON:",
        text.slice(0, 200)
      );

      return reply({
        success: false,
        message: "نظام الحجز لم يُرجع ردًا صحيحًا.",
      }, 502);
    }

    if (!response.ok || result["success"] !== true) {
      return reply({
        success: false,
        message: String(
          result["message"] ??
          result["error"] ??
          "تعذر تسجيل الحجز."
        ),
      }, 502);
    }

    return reply({
      success: true,
      message: String(
        result["message"] ?? "تم تسجيل الحجز بنجاح."
      ),
      emailSent: result["emailSent"],
      emailError: result["emailError"],
    });
  } catch (error) {
    console.error("Booking submit error:", error);

    return reply({
      success: false,
      message: "تعذر الاتصال بنظام الحجز.",
    }, 502);
  }
}
