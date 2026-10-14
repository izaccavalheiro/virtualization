import { createGridAxis } from '../components/Grid/gridAxis';

describe('createGridAxis', () => {
  it('uses plain arithmetic for a fixed size', () => {
    const axis = createGridAxis(10, 50);

    expect(axis.total).toBe(500);
    expect(axis.offsetOf(3)).toBe(150);
    expect(axis.sizeOf(3)).toBe(50);
    expect(axis.startIndexAt(149)).toBe(2);
    expect(axis.startIndexAt(150)).toBe(3);
    expect(axis.endIndexAt(150)).toBe(3);
    expect(axis.endIndexAt(151)).toBe(4);
  });

  it('matches the fixed-size results when the size function is constant', () => {
    const fixed = createGridAxis(20, 30);
    const variable = createGridAxis(20, () => 30);

    expect(variable.total).toBe(fixed.total);
    for (let position = 0; position <= 600; position += 7) {
      expect(variable.startIndexAt(position)).toBe(fixed.startIndexAt(position));
      expect(variable.endIndexAt(position)).toBe(fixed.endIndexAt(position));
    }
  });

  it('sums variable sizes into offsets', () => {
    const axis = createGridAxis(4, (index) => [10, 20, 30, 40][index]);

    expect(axis.total).toBe(100);
    expect([0, 1, 2, 3, 4].map(axis.offsetOf)).toEqual([0, 10, 30, 60, 100]);
    expect([0, 1, 2, 3].map(axis.sizeOf)).toEqual([10, 20, 30, 40]);
    expect(axis.startIndexAt(0)).toBe(0);
    expect(axis.startIndexAt(29)).toBe(1);
    expect(axis.startIndexAt(30)).toBe(2);
    expect(axis.endIndexAt(31)).toBe(3);
    expect(axis.endIndexAt(60)).toBe(3);
  });

  it('clamps positions and indexes outside the axis', () => {
    const axis = createGridAxis(3, () => 10);

    expect(axis.startIndexAt(-5)).toBe(0);
    expect(axis.startIndexAt(1000)).toBe(3);
    expect(axis.endIndexAt(1000)).toBe(3);
    expect(axis.offsetOf(-1)).toBe(0);
    expect(axis.offsetOf(10)).toBe(30);
    expect(axis.sizeOf(10)).toBe(0);
  });

  it('treats negative and non-numeric sizes as zero', () => {
    const axis = createGridAxis(3, (index) => [10, -5, NaN][index]);

    expect(axis.total).toBe(10);
    expect([0, 1, 2].map(axis.sizeOf)).toEqual([10, 0, 0]);
  });

  it('handles an empty axis', () => {
    const axis = createGridAxis(0, () => 10);

    expect(axis.total).toBe(0);
    expect(axis.startIndexAt(0)).toBe(0);
    expect(axis.endIndexAt(0)).toBe(0);
  });
});
