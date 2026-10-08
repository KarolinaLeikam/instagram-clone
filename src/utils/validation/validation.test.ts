import { describe, it, expect } from 'vitest';
import { emailRegex, passwordRegex, userRegex } from './validation';

describe('Тесты регулярных выражений (Validation)', () => {
  describe('emailRegex', () => {
    it('принимает правильный email', () => {
      expect(emailRegex.test('user@mail.com')).toBe(true);
      expect(emailRegex.test('admin+ivan.ivanov2026@sub.domain.co.uk')).toBe(
        true
      );
    });
    it('отклоняет некорректный email', () => {
      expect(emailRegex.test('plainaddress')).toBe(false);
      expect(emailRegex.test('missing-domain@')).toBe(false);
      expect(emailRegex.test('@missing-username.com')).toBe(false);
    });
  });

  describe('passwordRegex', () => {
    it('принимает надежный пароль', () => {
      expect(passwordRegex.test('Karolina-1999')).toBe(true);
      expect(passwordRegex.test('StrongPass1!')).toBe(true);
    });
    it('отклоняет слишком простой пароль', () => {
      expect(passwordRegex.test('password')).toBe(false);
      expect(passwordRegex.test('Password1')).toBe(false);
      expect(passwordRegex.test('Pass1!')).toBe(false);
    });
  });
  describe('userRegex', () => {
    it('принимает коректный юзернэйнм', () => {
      expect(userRegex.test('karolina')).toBe(true);
      expect(userRegex.test('karolina_ley')).toBe(true);
      expect(userRegex.test('karolina.08')).toBe(true);
    });
    it('отклоняет некоректный юзернэйнм', () => {
      expect(userRegex.test('pa')).toBe(false);
      expect(userRegex.test('_karolina')).toBe(false);
      expect(userRegex.test('karolina..ley')).toBe(false);
      expect(userRegex.test('karolina.')).toBe(false);
    });
  });
});
