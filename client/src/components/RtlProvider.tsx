import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtl from "stylis-plugin-rtl";
import { ReactNode } from "react";

// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: "css-ar", stylisPlugins: [rtl] },
  ltr: { key: "css-en" },
};

interface RtlProviderProps {
  children: ReactNode;
}
export function RtlProvider({ children }: RtlProviderProps) {
  //   const { locale } = useRouter();
  const dir = "rtl";
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache} children={children} />;
}
