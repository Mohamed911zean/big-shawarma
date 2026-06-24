"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin, Minus, Plus, ShoppingBag, Store, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AmbientEnergy, PageHero, ShowcaseNav } from "../components/showcase-parts";
import LeafletLocationMap from "../components/map/dynamic-location-map";
import { getCartLineKey, useStorefront } from "../context/storefront-context";
import { addressBook, branches, currency } from "../data/storefront";

export default function CheckoutPage() {
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
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const cityNames = Object.keys(addressBook);
  const areas = checkout.address.city ? Object.keys(addressBook[checkout.address.city as keyof typeof addressBook] ?? {}) : [];
  const neighborhoods =
    checkout.address.city && checkout.address.area
      ? (addressBook[checkout.address.city as keyof typeof addressBook]?.[checkout.address.area as never] as readonly string[] | undefined) ?? []
      : [];

  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    const phoneOk = /^01[0125][0-9]{8}$/.test(checkout.phone.replace(/\s/g, ""));
    if (cart.length === 0) errors.push("لا يمكن تأكيد الطلب قبل إضافة منتجات للسلة.");
    if (!checkout.name.trim()) errors.push("اكتب اسم العميل.");
    if (!phoneOk) errors.push("اكتب رقم موبايل مصري صحيح يبدأ بـ 01 ويتكون من 11 رقم.");
    if (checkout.orderType === "delivery") {
      if (!checkout.address.city) errors.push("اختر المدينة.");
      if (!checkout.address.area) errors.push("اختر المنطقة.");
      if (!checkout.address.neighborhood) errors.push("اختر الحي.");
      if (!checkout.address.street.trim()) errors.push("اكتب اسم الشارع.");
      if (!checkout.location) errors.push("حدد موقعك على الخريطة أو استخدم GPS.");
    }
    if (checkout.orderType === "pickup" && !checkout.branchId) errors.push("اختر فرع الاستلام.");
    return errors;
  }, [cart.length, checkout]);

  const canReview = validationErrors.length === 0;
  const selectedBranch = branches.find((branch) => branch.id === checkout.branchId) ?? branches[0];

  function confirmOrder() {
    const order = submitOrder();
    setReviewOpen(false);
    setSubmittedId(order.id);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />
      <PageHero
        eyebrow="طلب جاهز للعرض على صاحب البيزنس"
        title="تأكيد طلب كامل بدون واتساب وبدون باك إند"
        copy="السلة، بيانات العميل، اختيار التوصيل أو الاستلام، GPS، ومراجعة نهائية قبل حفظ طلب ديمو محلي."
      />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#111] p-5 shadow-[10px_10px_0_#FFB800]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black">ملخص السلة</h2>
            <strong className="text-2xl text-[#FFB800]">{currency(subtotal)}</strong>
          </div>
          <div className="mt-5 space-y-4">
            {cart.length === 0 ? (
              <div className="rounded-bl-[28px] rounded-tr-[28px] border border-white/15 bg-white/5 p-5 text-center">
                <ShoppingBag className="mx-auto text-[#FFB800]" />
                <p className="mt-3 font-bold text-[#9CA3AF]">السلة فارغة. أضف منتجات أولاً.</p>
                <Link href="/menu" className="mt-4 inline-flex rounded-bl-[20px] rounded-tr-[20px] bg-[#FFB800] px-5 py-3 font-black text-black shadow-[5px_5px_0_#E11D48]">اذهب للمنيو</Link>
              </div>
            ) : (
              cart.map((line) => {
                const key = getCartLineKey(line);
                return (
                  <div key={key} className="rounded-bl-[24px] rounded-tr-[24px] border border-white/15 bg-white/5 p-4">
                    <h3 className="font-black">{line.name}</h3>
                    <p className="mt-1 text-sm text-[#9CA3AF]">{line.options.join("، ") || "بدون تعديلات"}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <strong className="text-[#FFB800]">{currency(line.price * line.quantity)}</strong>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(key, -1)} className="grid h-8 w-8 place-items-center rounded-full bg-[#E11D48]" type="button"><Minus size={16} /></button>
                        <span className="font-black">{line.quantity}</span>
                        <button onClick={() => updateQuantity(key, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-[#FFB800] text-black" type="button"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        <form className="grid gap-5 rounded-bl-[54px] rounded-tr-[54px] border-[4px] border-white bg-[#111] p-5 shadow-[10px_10px_0_#E11D48]" onSubmit={(event) => { event.preventDefault(); if (canReview) setReviewOpen(true); }}>
          {submittedId && (
            <div className="rounded-bl-[24px] rounded-tr-[24px] bg-[#25D366] p-4 font-black text-black shadow-[5px_5px_0_#FFB800]">
              تم حفظ طلب الديمو رقم {submittedId}. يمكن لصاحب البيزنس مراجعته من صفحة طلبات الديمو.
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className={`flex min-h-16 cursor-pointer items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 p-4 font-black ${checkout.orderType === "delivery" ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[5px_5px_0_#E11D48]" : "border-white/15 bg-white/5 text-white"}`}>
              <input className="sr-only" type="radio" checked={checkout.orderType === "delivery"} onChange={() => updateCheckout({ orderType: "delivery" })} />
              <Truck size={18} />
              توصيل
            </label>
            <label className={`flex min-h-16 cursor-pointer items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 p-4 font-black ${checkout.orderType === "pickup" ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[5px_5px_0_#E11D48]" : "border-white/15 bg-white/5 text-white"}`}>
              <input className="sr-only" type="radio" checked={checkout.orderType === "pickup"} onChange={() => updateCheckout({ orderType: "pickup" })} />
              <Store size={18} />
              استلام من الفرع
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="اسم العميل" value={checkout.name} onChange={(value) => updateCheckout({ name: value })} required />
            <TextField label="رقم الموبايل" value={checkout.phone} onChange={(value) => updateCheckout({ phone: value })} required inputMode="tel" />
          </div>

          {checkout.orderType === "delivery" ? (
            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <SelectField label="المدينة" value={checkout.address.city} options={cityNames} onChange={(value) => updateCheckout({ address: { ...checkout.address, city: value, area: "", neighborhood: "" } })} />
                <SelectField label="المنطقة" value={checkout.address.area} options={areas} onChange={(value) => updateCheckout({ address: { ...checkout.address, area: value, neighborhood: "" } })} disabled={!checkout.address.city} />
                <SelectField label="الحي" value={checkout.address.neighborhood} options={[...neighborhoods]} onChange={(value) => updateAddress({ neighborhood: value })} disabled={!checkout.address.area} />
                <TextField label="اسم الشارع" value={checkout.address.street} onChange={(value) => updateAddress({ street: value })} required />
                <TextField label="رقم المبنى" value={checkout.address.buildingNumber} onChange={(value) => updateAddress({ buildingNumber: value })} />
                <TextField label="الدور" value={checkout.address.floor} onChange={(value) => updateAddress({ floor: value })} />
                <TextField label="الشقة" value={checkout.address.apartment} onChange={(value) => updateAddress({ apartment: value })} />
                <TextField label="رقم الشقة" value={checkout.address.apartmentNumber} onChange={(value) => updateAddress({ apartmentNumber: value })} />
              </div>
              <LeafletLocationMap selectedLocation={checkout.location} onLocationChange={setLocation} selectedBranchId={checkout.branchId} onBranchSelect={(branchId) => updateCheckout({ branchId })} />
              {checkout.location && (
                <p className="flex items-center gap-2 text-sm font-black text-[#25D366]">
                  <MapPin size={17} />
                  تم تحديد الموقع: {checkout.location.lat.toFixed(5)}, {checkout.location.lng.toFixed(5)}
                </p>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {branches.map((branch) => (
                <label key={branch.id} className={`cursor-pointer rounded-bl-[28px] rounded-tr-[28px] border-2 p-5 transition ${checkout.branchId === branch.id ? "border-[#FFB800] bg-[#FFB800] text-black shadow-[6px_6px_0_#E11D48]" : "border-white/15 bg-white/5 text-white"}`}>
                  <input className="sr-only" type="radio" checked={checkout.branchId === branch.id} onChange={() => updateCheckout({ branchId: branch.id })} />
                  <strong className="text-xl font-black">{branch.name}</strong>
                  <p className="mt-2 font-bold opacity-80">{branch.address}</p>
                  <p className="mt-2 text-sm font-black">{branch.hours}</p>
                </label>
              ))}
            </div>
          )}

          <textarea value={checkout.notes} onChange={(event) => updateCheckout({ notes: event.target.value })} placeholder="ملاحظات الطلب" rows={4} className="resize-none rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />

          {validationErrors.length > 0 && (
            <div className="rounded-bl-[24px] rounded-tr-[24px] border-2 border-[#E11D48] bg-[#E11D48]/15 p-4 text-sm font-bold text-white">
              {validationErrors.map((error) => <p key={error}>- {error}</p>)}
            </div>
          )}

          <button disabled={!canReview} className="flex items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800] transition disabled:cursor-not-allowed disabled:bg-[#9CA3AF] disabled:shadow-none" type="submit">
            <Check />
            مراجعة الطلب وتأكيده
          </button>
        </form>
      </section>

      <AnimatePresence>
        {reviewOpen && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 40, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }} className="w-full max-w-3xl rounded-bl-[58px] rounded-tr-[58px] border-[4px] border-white bg-[#111] p-6 shadow-[10px_10px_0_#FFB800]">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">مراجعة الطلب</h2>
                <button onClick={() => setReviewOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-black" type="button"><X /></button>
              </div>
              <div className="mt-5 grid gap-4 text-lg font-bold text-[#D1D5DB]">
                <p><span className="font-black text-white">العميل:</span> {checkout.name} - {checkout.phone}</p>
                <p><span className="font-black text-white">نوع الطلب:</span> {checkout.orderType === "delivery" ? "توصيل" : `استلام من ${selectedBranch.name}`}</p>
                <p><span className="font-black text-white">الدفع:</span> كاش</p>
                <p><span className="font-black text-white">الإجمالي:</span> <span className="text-[#FFB800]">{currency(subtotal)}</span></p>
              </div>
              <div className="mt-6 max-h-52 space-y-3 overflow-auto">
                {cart.map((line) => <div key={getCartLineKey(line)} className="flex justify-between rounded-bl-[18px] rounded-tr-[18px] bg-white/5 p-3 font-black"><span>{line.name} x {line.quantity}</span><span>{currency(line.price * line.quantity)}</span></div>)}
              </div>
              <button onClick={confirmOrder} className="mt-6 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]" type="button">
                <Check />
                حفظ طلب الديمو
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function TextField({ label, value, onChange, required, inputMode }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; inputMode?: "tel" | "text" }) {
  return (
    <label className="grid gap-2 font-black">
      <span>{label}{required ? " *" : ""}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} inputMode={inputMode} className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
    </label>
  );
}

function SelectField({ label, value, options, onChange, disabled }: { label: string; value: string; options: string[]; onChange: (value: string) => void; disabled?: boolean }) {
  return (
    <label className="grid gap-2 font-black">
      <span>{label} *</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-[#191919] px-5 py-4 font-bold text-white outline-none focus:border-[#FFB800] disabled:cursor-not-allowed disabled:opacity-45">
        <option value="">اختر {label}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
