import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import vodafoneCashLogo from "@/assets/cash-logo.asset.json";

export const Route = createFileRoute("/confirm")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: Number(search["amount"]) || 0,
    phone: String(search["phone"] ?? ""),
  }),
  head: () => ({
    meta: [
      { title: "تأكيد التحويل | محفظتي" },
      { name: "description", content: "راجع تفاصيل التحويل قبل التأكيد" },
      { property: "og:title", content: "تأكيد التحويل | محفظتي" },
      { property: "og:description", content: "راجع تفاصيل التحويل قبل التأكيد" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const { amount, phone } = Route.useSearch();
  const [greeting, setGreeting] = useState(false);
  const total = amount.toFixed(1);

  return (
    <main dir="rtl" className="mx-auto flex h-dvh max-w-[430px] flex-col overflow-hidden bg-[#f2f2f4] text-foreground shadow-2xl">
      {/* Header */}
      <header className="relative flex h-[52px] shrink-0 items-center justify-center bg-white">
        <h1 className="text-[20px] font-normal">تأكيد</h1>
        <Link
          to="/transfer"
          aria-label="رجوع"
          className="absolute left-4 top-1/2 grid size-[46px] -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)]"
        >
          <ChevronRight size={26} strokeWidth={2.5} />
        </Link>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-4">
        {/* Amount */}
        <div className="mt-6 flex items-baseline justify-center gap-2">
          <span className="text-[34px] font-bold leading-none">جنيه</span>
          <span className="text-[48px] font-bold leading-none text-[#2e8b9a]">{amount}</span>
        </div>
        <p className="mt-1.5 text-center text-[16px] text-foreground/45">مبلغ التحويل</p>

        {/* From / To card */}
        <div className="mt-6 rounded-[18px] bg-white px-4">
          <div className="flex items-center justify-between py-4">
            <div className="text-right">
              <p className="text-[14px] text-foreground/45">من</p>
              <p className="mt-1 text-[20px] font-bold tracking-wide" dir="ltr">01065083834</p>
            </div>
            <img
              src={vodafoneCashLogo.url}
              alt="فودافون كاش"
              width={46}
              height={56}
              className="h-[56px] w-auto object-contain"
            />
          </div>
          <div className="h-px bg-foreground/10" />
          <div className="flex items-center justify-between py-4">
            <div className="text-right">
              <p className="text-[14px] text-foreground/45">إلى</p>
              <p className="mt-1 text-[20px] font-bold tracking-wide" dir="ltr">{phone || "01065083834"}</p>
              <p className="mt-1 text-[15px] text-foreground/60" dir="ltr">Haba A**** M****** S****</p>
              <p className="mt-1 text-[15px] text-foreground/60">Me</p>
            </div>
            <img
              src={vodafoneCashLogo.url}
              alt="فودافون كاش"
              width={46}
              height={56}
              className="h-[56px] w-auto object-contain"
            />
          </div>
        </div>

        {/* Fees card */}
        <div className="mt-4 rounded-[18px] bg-white px-4">
          <div className="flex items-center justify-between py-4">
            <span className="text-[17px]">الرسوم</span>
            <span className="text-[17px] font-bold">0.0 جنيه</span>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span className="text-[17px]">المبلغ الكلي المستحق</span>
            <span className="text-[17px] font-bold">{total} جنيه</span>
          </div>
        </div>

        {/* Greeting card */}
        <div className="mt-4 flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
          <img
            src="/images/greeting-stamps.png"
            alt="كروت معايدة"
            width={180}
            height={73}
            className="h-[64px] w-auto object-contain"
          />
          <div className="flex items-center gap-3">
            <span className="text-[16px]">اضف كارت معايدة؟</span>
            <button
              type="button"
              role="switch"
              aria-checked={greeting}
              aria-label="اضف كارت معايدة"
              onClick={() => setGreeting((v) => !v)}
              className={`relative h-[30px] w-[52px] rounded-full transition-colors ${greeting ? "bg-[#e60000]" : "bg-[#c7c7cc]"}`}
            >
              <span
                className={`absolute top-[3px] size-[24px] rounded-full bg-white shadow transition-all ${greeting ? "right-[25px]" : "right-[3px]"}`}
              />
            </button>
          </div>
        </div>

        <p className="mt-4 text-[13px] text-foreground/45">* لمستخدمين فودافون كاش فقط</p>
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/70">
          تأكد من ادخال الرقم الصحيح وفي حالة التحويل الخاطئ لن تتمكن من اعادة المبلغ مرة اخرى.
        </p>
      </div>

      {/* Confirm */}
      <div className="px-5 pb-9 pt-2">
        <button
          type="button"
          className="h-[52px] w-full rounded-[14px] bg-[#e60000] text-[18px] font-normal text-white transition-transform active:scale-[0.98]"
        >
          تأكيد
        </button>
      </div>
    </main>
  );
}
