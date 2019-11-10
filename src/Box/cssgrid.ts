import { system } from 'styled-system';

const frGetter = (value: string | number | undefined) =>
  typeof value === 'number' ? `repeat(${value}, 1fr)` : value;

const formatAreas = (areas: string[]) => areas;
// ? areas.map(area => `"${area}"`).join(' ') : "";

export const gridStyle = system({
  flow: {
    property: 'gridAutoFlow'
  },
  minRowHeight: {
    property: 'gridAutoRows',
    transform: (value: any) => `minmax(${value || '20px'}, auto)`
  },
  areas: {
    property: 'gridTemplateAreas',
    transform: (value: any) => formatAreas(value)
  },
  columns: {
    property: 'gridTemplateColumns',
    transform: (value: any) => frGetter(value) as string
  },
  rows: {
    property: 'gridTemplateRows',
    transform: (value: any) => frGetter(value) as string
  }
});

export interface CustomGridProps {
  flow?: any;
  minRowHeight?: any;
  areas?: any;
  columns?: any;
  rows?: any;
}

export const cellStyle = system({
  colSpan: {
    property: 'gridColumnEnd',
    transform: (value: any) => `${value !== undefined ? `span ${value || 1}` : ''}`
  },
  rowSpan: {
    property: 'gridRowEnd',
    transform: (value: any) => `${value !== undefined ? `span ${value || 1}` : ''}`
  },
  colIndex: {
    property: 'gridColumnStart',
    transform: (value: any) =>
      `${value !== undefined ? (typeof value === 'number' ? value + 1 : value) : ''}`
  },
  rowIndex: {
    property: 'gridRowStart',
    transform: (value: any) =>
      `${value !== undefined ? (typeof value === 'number' ? value + 1 : value) : ''}`
  }
});

export interface CellProps {
  colIndex?: number | string;
  rowIndex?: number | string;
  colSpan?: number;
  rowSpan?: number;
  middle?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export interface GridPosition {
  row?: number;
  column?: number;
  rowSpan?: number;
  colSpan?: number;
}
