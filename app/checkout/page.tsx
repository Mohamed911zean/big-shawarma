"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, MapPin, Minus, Plus, ShoppingBag, Store, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AmbientEnergy } from "@/components/layout/ambient-energy";
import LeafletLocationMap from "@/components/map/dynamic-location-map";
import { getCartLineKey, useStorefront } from "@/context/storefront-context";
import { defaultDeliveryAreas, branches, currency } from "@/data/storefront";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    checkout,
    subtotal,
    updateQuantity,
    updateCheckout,
    updateAddress,
    setLocation,
    submitOrder,
  } = useStorefront();

  const [step, setStep] = useState<Step>(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const cityNames = Object.keys(defaultDeliveryAreas);
  const areas = checkout.address.city
    ? defaultDeliveryAreas[checkout.address.city] ?? []
    : [];

  const step1Errors = useMemo(() => {
    const errors: string[] = [];
    const phoneOk = /^01[0125][0-9]{8}$/.test(checkout.phone.replace(/\s/g, ""));
    if (!checkout.name.trim()) errors.push("اكتب اسم العميل.");
    if (!phoneOk) errors.push("اكتب رقم موبايل مصري صحيح يبدأ بـ 01 ويتكون من 11 رقم.");
    return errors;
  }, [checkout.name, checkout.phone]);

  const step2Errors = useMemo(() => {
    const errors: string[] = [];
    if (checkout.orderType === "delivery") {
      if (!checkout.address.city) errors.push("اختر المحافظة.");
      if (!checkout.address.area) errors.push("اختر المدينة / المركز.");
      if (!checkout.address.street.trim()) errors.push("اكتب اسم الشارع.");
      if (!checkout.location) errors.push("حدد موقعك على الخريطة أو استخدم GPS.");
    }
    if (checkout.orderType === "pickup" && !checkout.branchId) errors.push("اختر فرع الاستلام.");
    return errors;
  }, [checkout]);

  const allErrors = useMemo(() => {
    const errors: string[] = [];
    if (cart.length === 0) errors.push("لا يمكن تأكيد الطلب قبل إضافة منتجات للسلة.");
    return [...errors, ...step1Errors, ...step2Errors];
  }, [cart.length, step1Errors, step2Errors]);

  const canFinish = allErrors.length === 0;
  const selectedBranch = branches.find((b) => b.id === checkout.branchId) ?? branches[0];

  function confirmOrder() {
    const order = submitOrder();
    setReviewOpen(false);
    router.push("/checkout/success");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] pb-32 text-white">
      <AmbientEnergy />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-32 md:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800] shadow-[4px_4px_0_#E11D48]">
            إتمام الطلب
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">تأكيد طلبك خطوة بخطوة</h1>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Cart empty warning */}
        {cart.length === 0 && (
          <div className="mb-6 rounded-bl-[24px] rounded-tr-[24px] border-2 border-[#E11D48] bg-[#E11D48]/15 p-5">
            <p className="font-black">السلة فارغة.</p>
            <Link href="/menu" className="mt-3 inline-flex rounded-bl-[18px] rounded-tr-[18px] bg-[#FFB800] px-5 py-2.5 font-black text-black shadow-[4px_4px_0_#E11D48]">
              اذهب للمنيو
            </Link>
          </div>
        )}

        {/* Step 1 — Order type + customer info */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepPanel key="step1">
              <h2 className="mb-6 text-2xl font-black">نوع الطلب وبياناتك</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <OrderTypeCard
                  active={checkout.orderType === "delivery"}
                  onClick={() => updateCheckout({ orderType: "delivery" })}
                  icon={<Truck size={20} />}
                  label="توصيل لباب البيت"
                />
                <OrderTypeCard
                  active={checkout.orderType === "pickup"}
                  onClick={() => updateCheckout({ orderType: "pickup" })}
                  icon={<Store size={20} />}
                  label="استلام من الفرع"
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <TextField
                  label="اسم العميل *"
                  value={checkout.name}
                  onChange={(v) => updateCheckout({ name: v })}
                />
                <TextField
                  label="رقم الموبايل *"
                  value={checkout.phone}
                  onChange={(v) => updateCheckout({ phone: v })}
                  inputMode="tel"
                />
              </div>

              {step1Errors.length > 0 && <ErrorList errors={step1Errors} />}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={step1Errors.length > 0}
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#FFB800] px-6 py-3 font-black text-black shadow-[5px_5px_0_#E11D48] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  التالي
                  <ChevronLeft size={20} />
                </button>
              </div>
            </StepPanel>
          )}

          {/* Step 2 — Address / Branch */}
          {step === 2 && (
            <StepPanel key="step2">
              <h2 className="mb-6 text-2xl font-black">
                {checkout.orderType === "delivery" ? "عنوان التوصيل" : "اختر الفرع"}
              </h2>

              {checkout.orderType === "delivery" ? (
                <div className="grid gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="المحافظة *"
                      value={checkout.address.city}
                      options={cityNames}
                      onChange={(v) =>
                        updateCheckout({
                          address: { ...checkout.address, city: v, area: "", neighborhood: "" },
                        })
                      }
                    />
                    <SelectField
                      label="المدينة / المركز *"
                      value={checkout.address.area}
                      options={areas}
                      onChange={(v) =>
                        updateCheckout({
                          address: { ...checkout.address, area: v, neighborhood: "" },
                        })
                      }
                      disabled={!checkout.address.city}
                    />
                    <TextField
                      label="الحي / القرية"
                      value={checkout.address.neighborhood}
                      onChange={(v) => updateAddress({ neighborhood: v })}
                    />
                    <TextField
                      label="اسم الشارع *"
                      value={checkout.address.street}
                      onChange={(v) => updateAddress({ street: v })}
                    />
                    <TextField
                      label="رقم المبنى"
                      value={checkout.address.buildingNumber}
                      onChange={(v) => updateAddress({ buildingNumber: v })}
                    />
                    <TextField
                      label="الدور"
                      value={checkout.address.floor}
                      onChange={(v) => updateAddress({ floor: v })}
                    />
                  </div>
                  <LeafletLocationMap
                    selectedLocation={checkout.location}
                    onLocationChange={setLocation}
                    selectedBranchId={checkout.branchId}
                    onBranchSelect={(id) => updateCheckout({ branchId: id })}
                  />
                  {checkout.location && (
                    <p className="flex items-center gap-2 text-sm font-black text-[#25D366]">
                      <MapPin size={16} />
                      تم تحديد الموقع: {checkout.location.lat.toFixed(5)}, {checkout.location.lng.toFixed(5)}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {branches.map((branch) => (
                    <label
                      key={branch.id}
                      className={`cursor-pointer rounded-bl-[28px] rounded-tr-[28px] border-2 p-5 transition ${
                        checkout.branchId === branch.id
                          ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[6px_6px_0_#E11D48]"
                          : "border-white/15 bg-white/5 text-white"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        checked={checkout.branchId === branch.id}
                        onChange={() => updateCheckout({ branchId: branch.id })}
                      />
                      <strong className="text-xl font-black">{branch.name}</strong>
                      <p className="mt-2 font-bold opacity-80">{branch.address}</p>
                      <p className="mt-2 text-sm font-black">{branch.hours}</p>
                    </label>
                  ))}
                </div>
              )}

              {step2Errors.length > 0 && <ErrorList errors={step2Errors} />}

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 border-white/20 bg-white/5 px-6 py-3 font-black text-white"
                >
                  <ChevronRight size={20} />
                  رجوع
                </button>
                <button
                  type="button"
                  disabled={step2Errors.length > 0}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#FFB800] px-6 py-3 font-black text-black shadow-[5px_5px_0_#E11D48] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  التالي
                  <ChevronLeft size={20} />
                </button>
              </div>
            </StepPanel>
          )}

          {/* Step 3 — Review & confirm */}
          {step === 3 && (
            <StepPanel key="step3">
              <h2 className="mb-6 text-2xl font-black">مراجعة الطلب</h2>

              {/* Cart summary */}
              <div className="rounded-bl-[28px] rounded-tr-[28px] border-2 border-white/15 bg-[#111] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-black">ملخص السلة</span>
                  <strong className="text-[#FFB800]">{currency(subtotal)}</strong>
                </div>
                {cart.length === 0 ? (
                  <div className="mt-4 text-center">
                    <ShoppingBag className="mx-auto text-[#FFB800]" />
                    <p className="mt-2 text-sm font-bold text-[#9CA3AF]">السلة فارغة.</p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {cart.map((line) => {
                      const key = getCartLineKey(line);
                      return (
                        <div
                          key={key}
                          className="rounded-bl-[18px] rounded-tr-[18px] border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-black">{line.name}</p>
                              <p className="text-xs text-[#9CA3AF]">
                                {line.options.join("، ") || "بدون تعديلات"}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, -1)}
                                className="grid h-7 w-7 place-items-center rounded-full bg-[#E11D48]"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-black">{line.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, 1)}
                                className="grid h-7 w-7 place-items-center rounded-full bg-[#FFB800] text-black"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <p className="mt-1 text-left font-black text-[#FFB800]">
                            {currency(line.price * line.quantity)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Order summary */}
              <div className="mt-5 space-y-2 rounded-bl-[24px] rounded-tr-[24px] border border-white/10 bg-white/5 p-5 text-sm font-bold text-[#D1D5DB]">
                <p>
                  <span className="font-black text-white">العميل:</span> {checkout.name} — {checkout.phone}
                </p>
                <p>
                  <span className="font-black text-white">نوع الطلب:</span>{" "}
                  {checkout.orderType === "delivery" ? "توصيل" : `استلام من ${selectedBranch.name}`}
                </p>
                <p>
                  <span className="font-black text-white">الدفع:</span> كاش عند الاستلام
                </p>
              </div>

              {/* Notes */}
              <textarea
                value={checkout.notes}
                onChange={(e) => updateCheckout({ notes: e.target.value })}
                placeholder="ملاحظات إضافية على الطلب (اختياري)"
                rows={3}
                className="mt-5 w-full resize-none rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]"
              />

              {allErrors.length > 0 && <ErrorList errors={allErrors} />}

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 border-white/20 bg-white/5 px-6 py-3 font-black text-white"
                >
                  <ChevronRight size={20} />
                  رجوع
                </button>
                <button
                  type="button"
                  disabled={!canFinish}
                  onClick={() => setReviewOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800] disabled:cursor-not-allowed disabled:bg-[#9CA3AF] disabled:shadow-none"
                >
                  <Check />
                  تأكيد الطلب
                </button>
              </div>
            </StepPanel>
          )}
        </AnimatePresence>
      </div>

      {/* Final review modal */}
      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              className="w-full max-w-3xl rounded-bl-[58px] rounded-tr-[58px] border-[4px] border-white bg-[#111] p-6 shadow-[10px_10px_0_#FFB800]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">مراجعة أخيرة</h2>
                <button
                  type="button"
                  onClick={() => setReviewOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"
                >
                  <X />
                </button>
              </div>
              <div className="mt-5 grid gap-3 text-lg font-bold text-[#D1D5DB]">
                <p>
                  <span className="font-black text-white">العميل:</span> {checkout.name} — {checkout.phone}
                </p>
                <p>
                  <span className="font-black text-white">نوع الطلب:</span>{" "}
                  {checkout.orderType === "delivery" ? "توصيل" : `استلام من ${selectedBranch.name}`}
                </p>
                <p>
                  <span className="font-black text-white">الإجمالي:</span>{" "}
                  <span className="text-[#FFB800]">{currency(subtotal)}</span>
                </p>
              </div>
              <div className="mt-4 max-h-48 space-y-2 overflow-auto">
                {cart.map((line) => (
                  <div
                    key={getCartLineKey(line)}
                    className="flex justify-between rounded-bl-[16px] rounded-tr-[16px] bg-white/5 px-4 py-2 font-black"
                  >
                    <span>
                      {line.name} × {line.quantity}
                    </span>
                    <span className="text-[#FFB800]">{currency(line.price * line.quantity)}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={confirmOrder}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]"
              >
                <Check />
                تأكيد وإرسال الطلب
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Step Indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "بياناتك" },
    { n: 2, label: "العنوان" },
    { n: 3, label: "التأكيد" },
  ];
  return (
    <div className="mb-8 flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.n} className="flex flex-1 items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`grid h-10 w-10 place-items-center rounded-full border-2 font-black text-sm transition ${
                current > s.n
                  ? "border-[#25D366] bg-[#25D366] text-black"
                  : current === s.n
                  ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[3px_3px_0_#E11D48]"
                  : "border-white/20 bg-white/5 text-[#9CA3AF]"
              }`}
            >
              {current > s.n ? <Check size={16} /> : s.n}
            </div>
            <span
              className={`text-xs font-black ${
                current === s.n ? "text-[#FFB800]" : "text-[#9CA3AF]"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mb-5 flex-1 border-t-2 transition ${
                current > s.n + 1
                  ? "border-[#25D366]"
                  : current > s.n
                  ? "border-[#FFB800]"
                  : "border-white/15"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step Panel ────────────────────────────────────────────────────────────────

function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="rounded-bl-[40px] rounded-tr-[40px] border-[3px] border-white bg-[#111] p-6 shadow-[8px_8px_0_#E11D48]"
    >
      {children}
    </motion.div>
  );
}

// ─── Order Type Card ───────────────────────────────────────────────────────────

function OrderTypeCard({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-16 items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 p-4 font-black transition ${
        active
          ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[5px_5px_0_#E11D48]"
          : "border-white/15 bg-white/5 text-white hover:border-white/30"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Error List ────────────────────────────────────────────────────────────────

function ErrorList({ errors }: { errors: string[] }) {
  return (
    <div className="mt-4 rounded-bl-[20px] rounded-tr-[20px] border-2 border-[#E11D48] bg-[#E11D48]/15 p-4 text-sm font-bold text-white">
      {errors.map((e) => (
        <p key={e}>— {e}</p>
      ))}
    </div>
  );
}

// ─── Text Field ────────────────────────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "tel" | "text";
}) {
  return (
    <label className="grid gap-2 font-black">
      <span>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]"
      />
    </label>
  );
}

// ─── Select Field ──────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-2 font-black">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-[#191919] px-5 py-4 font-bold text-white outline-none focus:border-[#FFB800] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <option value="">اختر {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}