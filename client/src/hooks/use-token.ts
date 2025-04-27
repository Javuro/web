import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { contracts } from '@/lib/contracts';
import { formatUnits } from 'viem';

export function useTokenInfo() {
  const [symbol, setSymbol] = useState<string>('');
  const [decimals, setDecimals] = useState<number>(18);
  const [totalSupply, setTotalSupply] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get token symbol
  const { data: symbolData, isError: isSymbolError } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'symbol',
    enabled: true,
  });

  // Get token decimals
  const { data: decimalsData, isError: isDecimalsError } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'decimals',
    enabled: true,
  });

  // Get token total supply
  const { data: totalSupplyData, isError: isTotalSupplyError } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'totalSupply',
    enabled: true,
  });

  useEffect(() => {
    try {
      // Process data once available
      if (symbolData) {
        setSymbol(symbolData as string);
      }

      if (decimalsData !== undefined) {
        setDecimals(Number(decimalsData));
      }

      if (totalSupplyData) {
        const formattedSupply = formatUnits(
          totalSupplyData as bigint, 
          decimalsData ? Number(decimalsData) : 18
        );
        setTotalSupply(formattedSupply);
      }

      if (symbolData && decimalsData !== undefined && totalSupplyData) {
        setLoading(false);
      }

      // Handle errors
      if (isSymbolError || isDecimalsError || isTotalSupplyError) {
        setError('토큰 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Token data processing error:', err);
      setError('토큰 데이터 처리 중 오류가 발생했습니다.');
      setLoading(false);
    }
  }, [symbolData, decimalsData, totalSupplyData, isSymbolError, isDecimalsError, isTotalSupplyError]);

  return {
    symbol,
    decimals,
    totalSupply,
    loading,
    error,
  };
}

export function useTokenBalance() {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: decimalsData } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'decimals',
    enabled: true,
  });

  const { data: balanceData, isError: isBalanceError, isLoading: isBalanceLoading } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  useEffect(() => {
    if (!address) {
      setBalance('0');
      setLoading(false);
      return;
    }

    if (balanceData && decimalsData !== undefined) {
      try {
        const formattedBalance = formatUnits(
          balanceData as bigint, 
          Number(decimalsData)
        );
        setBalance(formattedBalance);
        setLoading(false);
      } catch (err) {
        console.error('Error formatting balance:', err);
        setError('잔액 포맷팅 오류');
        setLoading(false);
      }
    }

    if (isBalanceError) {
      setError('잔액을 불러오는 데 실패했습니다.');
      setLoading(false);
    }

    if (!isBalanceLoading && !balanceData && address) {
      setBalance('0');
      setLoading(false);
    }
  }, [address, balanceData, decimalsData, isBalanceError, isBalanceLoading]);

  return {
    balance,
    loading,
    error,
  };
}

export function useTokenContract() {
  return {
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi
  };
}