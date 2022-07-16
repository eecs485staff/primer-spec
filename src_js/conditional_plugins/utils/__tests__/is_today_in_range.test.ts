import { Month, isTodayInRange } from '../is_today_in_range';

describe('isTodayInRange', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('today is March 29, 2022', () => {
    beforeEach(() => {
      jest.setSystemTime(new Date('March 29, 2022'));
    });

    test('date before lower bound', () => {
      const lower = { month: Month.APRIL, date: 1 };
      const upper = { month: Month.APRIL, date: 3 };
      expect(isTodayInRange(lower, upper)).toBe(false);
    });

    test('date equal to lower bound', () => {
      const lower = { month: Month.MARCH, date: 29 };
      const upper = { month: Month.MARCH, date: 30 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });

    test('date after lower bound but before upper bound', () => {
      const lower = { month: Month.MARCH, date: 28 };
      const upper = { month: Month.MARCH, date: 30 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });

    test('date after lower bound but before upper bound in a different month', () => {
      const lower = { month: Month.MARCH, date: 28 };
      const upper = { month: Month.APRIL, date: 2 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });

    test('date just before upper bound', () => {
      const lower = { month: Month.MARCH, date: 20 };
      const upper = { month: Month.MARCH, date: 30 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });

    test('date equal to upper bound', () => {
      const lower = { month: Month.MARCH, date: 20 };
      const upper = { month: Month.MARCH, date: 29 };
      expect(isTodayInRange(lower, upper)).toBe(false);
    });

    test('date after upper bound', () => {
      const lower = { month: Month.FEBRUARY, date: 2 };
      const upper = { month: Month.FEBRUARY, date: 20 };
      expect(isTodayInRange(lower, upper)).toBe(false);
    });
  });

  describe('today is April 2, 2022', () => {
    beforeEach(() => {
      jest.setSystemTime(new Date('April 2, 2022'));
    });

    test('date after lower bound', () => {
      const lower = { month: Month.MARCH, date: 29 };
      const upper = { month: Month.APRIL, date: 3 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });

    test('date equal to upper bound', () => {
      const lower = { month: Month.MARCH, date: 29 };
      const upper = { month: Month.APRIL, date: 2 };
      expect(isTodayInRange(lower, upper)).toBe(false);
    });

    test('date within multi-month bounds', () => {
      const lower = { month: Month.MARCH, date: 29 };
      const upper = { month: Month.MAY, date: 2 };
      expect(isTodayInRange(lower, upper)).toBe(true);
    });
  });
});
