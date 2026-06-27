export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">{kicker}</p>
      <h2 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">{title}</h2>
    </div>
  );
}
