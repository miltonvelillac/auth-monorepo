import { useSyncExternalStore } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function useSignInController() {
  const { store, onSuccess } = useAuthContext();

  const state = useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState,
  );

  return {
    state,
    setUsername: (value: string) => store.setCredential('username', value),
    setPassword: (value: string) => store.setCredential('password', value),
    submit: async () => {
      const result = await store.submit();

      if (result && onSuccess) {
        onSuccess(result);
      }

      return result;
    },
    reset: () => store.reset(),
  };
}
