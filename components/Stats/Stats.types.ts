export interface StatsProps {
  stats?: {
    name: string;
    value: string;
    unit?: string;
  }[];
  loading?: boolean;
}