export interface IOperationLog {
  status: "Open" | "Close";
  name: string;
  description: string;
  dateTime: Date;
}
