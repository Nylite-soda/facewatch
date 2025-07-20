import { useState, useEffect } from "react";

/**
 * A simple hook to determine if the component is mounted on the client.
 * This is useful for preventing hydration mismatches with server-side rendering.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
