"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <head>
        <title>cclin website</title>
      </head>
      <body className="grid h-screen px-4 bg-white place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </h1>
      </body>
    </html>
  );
}
