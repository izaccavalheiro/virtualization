export interface GridAxis {
  total: number;
  offsetOf: (index: number) => number;
  sizeOf: (index: number) => number;
  // Index of the cell containing `position`.
  startIndexAt: (position: number) => number;
  // Index of the first cell that starts at or after `position`.
  endIndexAt: (position: number) => number;
}

// Positions along one grid axis (rows or columns). A fixed size keeps the
// O(1) arithmetic; a size function is summed once into an offsets table.
export function createGridAxis(
  count: number,
  size: number | ((index: number) => number)
): GridAxis {
  if (typeof size === 'number') {
    return {
      total: count * size,
      offsetOf: index => index * size,
      sizeOf: () => size,
      startIndexAt: position => Math.floor(position / size),
      endIndexAt: position => Math.ceil(position / size)
    };
  }

  const offsets = new Float64Array(count + 1);
  for (let i = 0; i < count; i++) {
    offsets[i + 1] = offsets[i] + (Math.max(0, size(i)) || 0);
  }

  const clamp = (index: number) => Math.min(Math.max(index, 0), count);

  return {
    total: offsets[count],
    offsetOf: index => offsets[clamp(index)],
    sizeOf: index => offsets[clamp(index + 1)] - offsets[clamp(index)],
    startIndexAt: position => {
      // Last offset <= position.
      let low = 0;
      let high = count;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (offsets[mid] <= position) {
          low = mid;
        } else {
          high = mid - 1;
        }
      }
      return low;
    },
    endIndexAt: position => {
      // First offset >= position.
      let low = 0;
      let high = count;
      while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (offsets[mid] >= position) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      return low;
    }
  };
}
