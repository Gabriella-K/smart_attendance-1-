import React, { useMemo } from 'react';

interface QrCodeGraphicProps {
  value: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export const QrCodeGraphic: React.FC<QrCodeGraphicProps> = ({
  value,
  size = 220,
  className = '',
  glow = false,
}) => {
  // Generate deterministic but visually realistic QR matrix based on input token
  const matrix = useMemo(() => {
    const gridSize = 25;
    const grid: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false));

    // Simple hash function for pseudo-random cell generation
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Fill data cells
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Leave room for 3 position markers at corners
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= gridSize - 8;
        const inBottomLeft = r >= gridSize - 8 && c < 8;
        const inCenterShield = r >= 10 && r <= 14 && c >= 10 && c <= 14;

        if (inTopLeft || inTopRight || inBottomLeft || inCenterShield) {
          continue;
        }

        const seed = hash + r * 37 + c * 19;
        grid[r][c] = seededRandom(seed) > 0.48;
      }
    }

    // Helper to draw position detection patterns
    const drawFinderPattern = (startR: number, startC: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isOuterBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isInnerSquare = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[startR + r][startC + c] = isOuterBorder || isInnerSquare;
        }
      }
    };

    drawFinderPattern(0, 0);
    drawFinderPattern(0, gridSize - 7);
    drawFinderPattern(gridSize - 7, 0);

    return { grid, gridSize };
  }, [value]);

  const { grid, gridSize } = matrix;
  const cellSize = size / gridSize;

  return (
    <div
      className={`relative inline-block rounded-2xl bg-[#FAF8F3] p-3 shadow-sm border border-[#E8DCC8] ${
        glow ? 'shadow-[0_0_20px_rgba(198,167,94,0.35)]' : ''
      } ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-lg"
      >
        <rect width={size} height={size} fill="#FAF8F3" />
        {grid.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize * 0.94}
                height={cellSize * 0.94}
                rx={cellSize * 0.2}
                fill="#252733"
              />
            );
          })
        )}
        {/* Center decorative shield */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={cellSize * 2.8}
          fill="#1F2A44"
        />
        <text
          x={size / 2}
          y={size / 2 + cellSize * 0.8}
          textAnchor="middle"
          fontSize={cellSize * 2.2}
          fill="#C6A75E"
          fontWeight="bold"
          fontFamily="Nunito, sans-serif"
        >
          ✓
        </text>
      </svg>
    </div>
  );
};
