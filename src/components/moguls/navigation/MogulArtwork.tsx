"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Mogul } from "@/lib/types";

export function MogulArtwork({ mogul }: { mogul: Mogul }) {
  if (!mogul.image) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
      <motion.div
        key={mogul.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.82, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 92%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0) 92%)",
        }}
      >
        <Image
          src={mogul.image}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
      </motion.div>
      {/* Additional ambient gradient to ensure left side is fully dark for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03040a] via-[#03040a]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
}
