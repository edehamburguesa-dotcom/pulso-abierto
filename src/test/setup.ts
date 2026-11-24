// src/test/setup.ts
import { expect, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useFavoritesStore } from '../store/favoritesStore';

expect.extend(matchers);

beforeEach(() => {
  localStorage.clear();
  useFavoritesStore.setState({ favorites: [] });
});