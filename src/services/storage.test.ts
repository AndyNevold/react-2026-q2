import { describe, it, expect, beforeEach } from 'vitest';
import { storageService } from './storage';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty data', () => {
    const result = storageService.get();
    expect(result).toBe('');
  });

  it('sets and gets a value', () => {
    storageService.set('pikachu');
    expect(storageService.get()).toBe('pikachu');
  });

  it('overwrites', () => {
    storageService.set('bulbasaur');
    storageService.set('charmander');
    expect(storageService.get()).toBe('charmander');
  });

  it('returns empty data when key does not exist', () => {
    localStorage.setItem('key', 'test');
    expect(storageService.get()).toBe('');
  });
});
