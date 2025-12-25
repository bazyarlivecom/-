
export interface Product {
  id: string;
  name: string;
}

export interface DistributionRecord {
  id: string;
  nationalId: string;
  productId: string;
  productName: string;
  timestamp: number;
  fullName: string;
}

export enum StatusType {
  IDLE = 'IDLE',
  CHECKED = 'CHECKED',
  INVALID_ID = 'INVALID_ID'
}

export type ViewType = 'DASHBOARD' | 'INQUIRY' | 'HISTORY' | 'SETTINGS';

export interface VerificationResult {
  status: StatusType;
  records: DistributionRecord[];
}
