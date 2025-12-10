import { CacheProvider as EmCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { FC } from 'react';
import { CacheProviderProps } from './cache-provider.d';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

export const CacheProvider: FC<CacheProviderProps> = ({ children }) => (
  <EmCacheProvider value={cacheRtl}>{children}</EmCacheProvider>
);
