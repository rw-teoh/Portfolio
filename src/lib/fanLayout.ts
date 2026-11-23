export interface FanPillSize {
  width: number
  height: number
}

export interface FanPosition {
  x: number
  y: number
}

function solveArc(
  sizes: readonly FanPillSize[],
  startAngle: number,
  endAngle: number,
  gap: number,
  centreSize: FanPillSize,
): FanPosition[] {
  if (sizes.length === 0) return []

  const positionsAtRadius = (radius: number): FanPosition[] => {
    if (sizes.length === 1) return [{ x: 0, y: 0 }]
    return sizes.map((_, index) => {
      const progress = index / (sizes.length - 1)
      const angle = startAngle + (endAngle - startAngle) * progress
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    })
  }

  const hasClearance = (positions: readonly FanPosition[]) => {
    const allPositions = [...positions, { x: 0, y: 0 }]
    const allSizes = [...sizes, centreSize]
    for (let first = 0; first < allPositions.length; first += 1) {
      for (let second = first + 1; second < allPositions.length; second += 1) {
        const horizontalGap =
          Math.abs(allPositions[first].x - allPositions[second].x) -
          (allSizes[first].width + allSizes[second].width) / 2
        const verticalGap =
          Math.abs(allPositions[first].y - allPositions[second].y) -
          (allSizes[first].height + allSizes[second].height) / 2
        if (horizontalGap < gap && verticalGap < gap) return false
      }
    }
    return true
  }

  let lower = 0
  let upper = 1
  while (upper < 4096 && !hasClearance(positionsAtRadius(upper))) {
    upper *= 2
  }

  if (!hasClearance(positionsAtRadius(upper))) {
    return positionsAtRadius(upper)
  }

  for (let iteration = 0; iteration < 32; iteration += 1) {
    const middle = (lower + upper) / 2
    if (hasClearance(positionsAtRadius(middle))) upper = middle
    else lower = middle
  }

  return positionsAtRadius(upper)
}

export function solveHalfCircle(
  sizes: readonly FanPillSize[],
  centreSize: FanPillSize,
  gap = 8,
): FanPosition[] {
  return solveArc(sizes, Math.PI, 0, gap, centreSize)
}

export function solveQuarterCircle(
  sizes: readonly FanPillSize[],
  centreSize: FanPillSize,
  gap = 8,
): FanPosition[] {
  return solveArc(sizes, Math.PI, Math.PI / 2, gap, centreSize)
}
