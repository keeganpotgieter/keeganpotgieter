export interface History {
  id: number;
  date: Date;
  command: string;
  output: React.ReactNode;
}
