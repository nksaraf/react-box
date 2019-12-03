import styled from 'styled-components';
import { Box } from './Box';

export const Flex = styled(Box)`
  display: flex;
`;
export const Column = styled(Flex)`
  flex-direction: column;
`;
export const Row = styled(Flex)`
  flex-direction: row;
`;
export const Grid = styled(Box)`
  display: grid;
`;
Grid.defaultProps = {
  columns: 12,
  flow: 'row',
  gridGap: 2,
  minRowHeight: '20px',
};

export const Cell = styled(Box)``;
