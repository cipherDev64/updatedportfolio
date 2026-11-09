import { m } from "framer-motion";
import { ease } from "../components/Motion";

export default function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <m.div initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease }}>
      <p className="text-[15px] font-semibold text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-1 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
        {title}
      </h2>
    </m.div>
  );
}
