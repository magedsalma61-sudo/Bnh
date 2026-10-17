
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Item = Record<string, unknown>;

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

const DATE_BRANCHES = ["obour", "haram", "shobra"];

function isRecord(value: unknown): value is Item {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeSlotStatus(value: unknown): string {
  if (value === true) return "محجوز";
  if (value === false) return "متاح";
  if (typeof value !== "string") return "";

  const normalized = value.trim().toLowerCase();

  if (normalized === "true") return "محجوز";
  if (normalized === "false") return "متاح";
  if (normalized === "متاح" || normalized === "محجوز") return normalized;

  return "";
}

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function GET(request: NextRequest) {
  const branch = (
    request.nextUrl.searchParams.get("branch") ?? ""
  ).trim().toLowerCase();

  const scriptUrl = URLS[branch];

  if (!scriptUrl) {
    return reply({
      success: false,
      slots: [],
      message: "الفرع غير معروف.",
    }, 400);
  }

  const date = (
    request.nextUrl.searchParams.get("date") ?? ""
  ).trim();

  const isDateBranch = DATE_BRANCHES.includes(branch);

  if (
    isDateBranch &&
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return reply({
      success: false,
      slots: [],
      message: "اختاري تاريخ الكشف أولًا.",
    }, 400);
  }

  try {
    const url = new URL(scriptUrl);

    if (isDateBranch) {
      url.searchParams.set("date", date);
    } else {
      url.searchParams.set("action", "slots");
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
      redirect: "follow",
      headers: { Accept: "application/json" },
    });

    const text = await response.text();

    if (!response.ok) {
      return reply({
        success: false,
        slots: [],
        message: "تعذر الاتصال بنظام المواعيد.",
      }, 502);
    }

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Apps Script returned non-JSON:",
        text.slice(0, 200)
      );

      return reply({
        success: false,
        slots: [],
        message: "استجابة نظام المواعيد غير صحيحة. تأكدي من نشر آخر نسخة.",
      }, 502);
    }

    if (
      !isRecord(data) ||
      data["success"] !== true ||
      !Array.isArray(data["slots"])
    ) {
      return reply({
        success: false,
        slots: [],
        message: isRecord(data)
          ? String(data["message"] ?? "تعذر قراءة المواعيد.")
          : "صيغة استجابة المواعيد غير صحيحة.",
      }, 502);
    }

    const slots = data["slots"]
      .filter(isRecord)
      .map((item, index) => {
        if (isDateBranch && branch !== "shobra") {
          return {
            slotId: String(item["slotId"] ?? ""),
            sheetName: String(item["date"] ?? date),
            row: 0,
            date: String(item["date"] ?? date).trim(),
            day: branch === "haram" ? "الثلاثاء" : "الاثنين",
            startTime: String(item["time"] ?? "").trim(),
            endTime: "",
            status: "متاح",
          };
        }

        const bookedStatus =
          branch === "shobra" || branch === "october"
            ? normalizeSlotStatus(item["booked"])
            : "";
        const explicitStatus = normalizeSlotStatus(item["status"]);
        const hasAvailabilityField =
          item["booked"] !== undefined || item["status"] !== undefined;
        const status =
          bookedStatus ||
          explicitStatus ||
          (branch === "shobra" &&
          !hasAvailabilityField &&
          String(item["slotId"] ?? "").trim()
            ? "متاح"
            : "");

        return {
          sheetName: String(item["sheetName"] ?? ""),
          row: Number(item["row"] ?? index),
          date: String(item["date"] ?? "").trim(),
          day: String(item["day"] ?? ""),
          startTime: String(
            item["startTime"] ?? item["time"] ?? ""
          ).trim(),
          endTime: String(item["endTime"] ?? ""),
          status,
        };
      })
      .filter(
        (slot) =>
          slot.date !== "" &&
          slot.startTime !== "" &&
          slot.status === "متاح" &&
          (branch !== "october" ||
            slot.date >= new Date().toISOString().slice(0, 10))
      );

    return reply({
      success: true,
      count: slots.length,
      slots,
    });
  } catch (error) {
    console.error("Booking slots error:", error);

    return reply({
      success: false,
      slots: [],
      message: "تعذر الاتصال بنظام المواعيد.",
    }, 502);
  }
}
