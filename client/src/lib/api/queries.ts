import { useQuery } from "@tanstack/react-query";
import type { StakingInfo, UserProfile, TokenInfo } from "./types";

export function useStakingInfo(address: string | null) {
  return useQuery({
    queryKey: ['staking', address],
    queryFn: async (): Promise<StakingInfo> => {
      if (!address) throw new Error('No address provided');
      const response = await fetch(`/api/staking/${address}`);
      if (!response.ok) throw new Error('Failed to fetch staking info');
      return response.json();
    },
    enabled: !!address
  });
}

export function useUserProfile(address: string | null) {
  return useQuery({
    queryKey: ['profile', address],
    queryFn: async (): Promise<UserProfile> => {
      if (!address) throw new Error('No address provided');
      const response = await fetch(`/api/profile/${address}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return response.json();
    },
    enabled: !!address
  });
}

export function useTokenInfo() {
  return useQuery({
    queryKey: ['token'],
    queryFn: async (): Promise<TokenInfo> => {
      const response = await fetch('/api/token');
      if (!response.ok) throw new Error('Failed to fetch token info');
      return response.json();
    }
  });
}
