// TierListWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the TierList component
const TierList = dynamic(() => import("./view"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const TierListWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <TierList />;
};

export default TierListWrapper;
