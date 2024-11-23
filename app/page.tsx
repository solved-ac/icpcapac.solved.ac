"use client";

import { useEffect } from "react";

// Since we do SSG, we will redirect in client
const Page = () => {
  useEffect(() => {
    window.location.href = "/2025";
  }, []);

  return null;
};

export default Page;
