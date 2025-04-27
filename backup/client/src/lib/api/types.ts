export interface StakingInfo {
  amount: string;
  rewards: string;
  apr: number;
  lockupPeriod: number;
}

export interface UserProfile {
  address: string;
  balance: string;
  staking: StakingInfo;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'stake' | 'unstake' | 'claim';
  amount: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface TokenInfo {
  price: string;
  marketCap: string;
  totalSupply: string;
  circulatingSupply: string;
}
