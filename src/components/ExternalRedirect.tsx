"use client";

import { useEffect } from "react";

export function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <p className="text-center text-foreground">
        外部サイトへ移動しています…
        <br />
        <a href={url} className="mt-2 inline-block font-bold text-primary underline">
          移動しない場合はこちら
        </a>
      </p>
    </main>
  );
}
