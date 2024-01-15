import { identity } from './store';

export const initializeFromStorage = () => {
  const principal = localStorage.getItem("ii_principal");
  const aid = localStorage.getItem("ii_aid");

  if (principal !== null && aid !== null) {
    identity.set({
      connected: true,
      principal,
      aid,
    });
  }
};
