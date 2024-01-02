"use client";
import { useEffect, useState } from "react";

type ViewProps = {
  slug: string;
};

const Views = (props: ViewProps) => {
  const { slug } = props;
  const [viewed, setViewed] = useState(false);
  useEffect(() => {
    fetch("/api/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });
  }, [slug]);
  return null;
};

export default Views;
