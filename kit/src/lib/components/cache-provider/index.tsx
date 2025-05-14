import { CacheProvider as EmCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { FC } from 'react';
import { CacheProviderProps } from './cache-provider.d';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export const CacheProvider: FC<CacheProviderProps> = ({ children }) => (
  <EmCacheProvider value={cache}>{children}</EmCacheProvider>
);
