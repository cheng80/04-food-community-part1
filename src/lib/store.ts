"use client";

import { useSyncExternalStore } from "react";
import { ME_ID, SEED_NOW, seedRestaurants, users, type Restaurant, type User } from "./data";

// ponytail: 외부 DB·OAuth 없이 시연하는 클라이언트 스토어(localStorage). 실서비스는 서버 API로 교체.
export interface AppState {
  loggedIn: boolean;
  me: User;
  restaurants: Restaurant[];
}

export type RestaurantInput = Pick<Restaurant, "name" | "address" | "content" | "photos">;

const KEY = "hidden-restaurants:v1";
const seed: AppState = { loggedIn: false, me: users[0], restaurants: seedRestaurants };

let state: AppState | null = null;
const listeners = new Set<() => void>();

function load(): AppState {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return { ...seed, ...(JSON.parse(saved) as AppState) };
  } catch {}
  return seed;
}

function set(next: AppState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 용량 초과(큰 사진) 시 현재 탭 메모리에만 유지
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => (state ??= load());
const getServerSnapshot = () => seed;

export function useAppState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noop = () => () => {};
/** localStorage 상태가 반영된 뒤(true)에만 로그인 여부로 분기 */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

const subscribeMinute = (l: () => void) => {
  const t = setInterval(l, 60_000);
  return () => clearInterval(t);
};
/** 상대 시간 표기 기준 시각. 프리렌더는 SEED_NOW 고정 */
export function useNow() {
  return useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => SEED_NOW,
  );
}

export function findUser(s: AppState, id: string): User | undefined {
  return id === ME_ID ? s.me : users.find((u) => u.id === id);
}

const current = () => getSnapshot();

export const actions = {
  login: () => set({ ...current(), loggedIn: true }),
  logout: () => set({ ...current(), loggedIn: false }),
  updateProfile: (me: Pick<User, "nickname" | "avatarUrl">) => set({ ...current(), me: { ...current().me, ...me } }),
  createRestaurant(input: RestaurantInput) {
    const id = `r-${Date.now().toString(36)}`;
    const s = current();
    set({ ...s, restaurants: [{ ...input, id, authorId: ME_ID, createdAt: Date.now() }, ...s.restaurants] });
    return id;
  },
  updateRestaurant(id: string, input: RestaurantInput) {
    const s = current();
    set({ ...s, restaurants: s.restaurants.map((r) => (r.id === id ? { ...r, ...input, summary: undefined } : r)) });
  },
  deleteRestaurant(id: string) {
    const s = current();
    set({ ...s, restaurants: s.restaurants.filter((r) => r.id !== id) });
  },
};
