export type BookingMode =
  | "sheet-row"
  | "date-slot"
  | "date-sheet-row"
  | "whatsapp";

type BookingBranchConfig = {
  name: string;
  address: string;
  mapUrl: string;
  whatsapp: string;
  appsScriptUrl: string | null;
  enabled: boolean;
  bookingMode: BookingMode;
  scheduleWeekday?: number;
  scheduleDay?: string;
  availabilityField?: "status" | "booked";
  excludePastSlots?: boolean;
  submitMode: "date-slot" | "helmiya" | "legacy-sheet" | "standard-sheet";
};

export const BOOKING_BRANCHES = {
  helmiya: {
    name: "الحلمية",
    address: "الحلمية الزيتون، بجوار بنك مصر، شارع محمد فوزي.",
    mapUrl: "https://maps.google.com",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbw9StqV6jO2xvpKVgEss25Md9KD1t3wBaUgMOoKqNu0Ilo82dRZ5D_P1S2IWwGDsp_yPw/exec",
    enabled: true,
    bookingMode: "sheet-row",
    submitMode: "helmiya",
  },
  nasr: {
    name: "مدينة نصر",
    address: "مدينة نصر، شارع الشهيد، بجوار مدخل المنطقة السكنية.",
    mapUrl: "https://maps.google.com",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbyQ6ntKgCOfuRDZNsVVY5iIEygtun4UG-SSWgymFxhisI9n1y2LY1m_SbmrV4EF6uzw7g/exec",
    enabled: true,
    bookingMode: "sheet-row",
    submitMode: "standard-sheet",
  },
  obour: {
    name: "العبور",
    address: "العبور، شارع المركز الطبي، أعلى كشك الصيدلية.",
    mapUrl: "https://maps.google.com",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbwqXpH5ZryTDONnHsiJYzHEqzY_5VrhXlbByiU05tablYosyGb5dLcOAZggIXQ0ZW-CXQ/exec",
    enabled: true,
    bookingMode: "date-slot",
    scheduleWeekday: 1,
    scheduleDay: "الاثنين",
    submitMode: "date-slot",
  },
  haram: {
    name: "الهرم",
    address: "الهرم، شارع الهرم، بجوار سنترال الهرم.",
    mapUrl: "https://maps.google.com",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbyzbQBnfSsdyvxN6UQ-N3udD_hHPH1OA7xvh6wGI3FG20tvJ64lp5QYhlI4kw1j4qKiKQ/exec",
    enabled: true,
    bookingMode: "date-slot",
    scheduleWeekday: 2,
    scheduleDay: "الثلاثاء",
    submitMode: "date-slot",
  },
  maadi: {
    name: "المعادي",
    address: "المعادي، شارع 9، أمام البنك الأهلي.",
    mapUrl: "https://bit.ly/3RPH9X6",
    whatsapp: "201115504662",
    appsScriptUrl: null,
    enabled: true,
    bookingMode: "whatsapp",
    submitMode: "standard-sheet",
  },
  fayoum: {
    name: "الفيوم",
    address: "الفيوم، أمام المستشفى العام، المدخل الثاني.",
    mapUrl: "https://maps.app.goo.gl/M6GGZbRPNjLa2qyk7",
    whatsapp: "201553394429",
    appsScriptUrl: null,
    enabled: true,
    bookingMode: "whatsapp",
    submitMode: "standard-sheet",
  },
  shobra: {
    name: "شبرا مصر",
    address:
      "تقاطع خلوصي مع الترعة البولاقية أمام مدرسة رمسيس. شبرا 3 دقائق من مترو روض الفرج.",
    mapUrl: "https://maps.app.goo.gl/FNrmpeFMkCua4jjn7",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbxRuRHJuWsXM70bLEcX218w08yvD7pKaKVSk2srUNjDZQ3yJ9liKEgTqg00_G2d9J3Q/exec",
    enabled: true,
    bookingMode: "date-sheet-row",
    scheduleWeekday: 3,
    availabilityField: "booked",
    submitMode: "legacy-sheet",
  },
  october: {
    name: "6 أكتوبر",
    address:
      "ميدان الحصري عمارة 3 المحور المركزي أعلى راية ستور الدور الثالث ميدان الحصري.",
    mapUrl: "https://maps.app.goo.gl/4dN6EwYtuespmcTw8",
    whatsapp: "201281441562",
    appsScriptUrl:
      "https://script.google.com/macros/s/AKfycbxTYJNyRCd-v1GpziWQa8JZbT0T5YWCbU09fFntU9PvLQBmwD5f2l7UPA9C_pw3mTuHvg/exec",
    enabled: true,
    bookingMode: "sheet-row",
    availabilityField: "booked",
    excludePastSlots: true,
    submitMode: "legacy-sheet",
  },
} as const satisfies Record<string, BookingBranchConfig>;

export type BranchId = keyof typeof BOOKING_BRANCHES;

export function isBranchId(value: string): value is BranchId {
  return Object.prototype.hasOwnProperty.call(BOOKING_BRANCHES, value);
}

export function isDateBasedBranch(branch: BranchId): boolean {
  const mode = BOOKING_BRANCHES[branch].bookingMode;
  return mode === "date-slot" || mode === "date-sheet-row";
}

export function isDirectWhatsAppBranch(branch: BranchId): boolean {
  return BOOKING_BRANCHES[branch].bookingMode === "whatsapp";
}