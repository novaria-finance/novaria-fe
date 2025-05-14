import ArrowDownIcon from "@/components/icon/ArrowDownIcon"
import ClockIcon from "@/components/icon/ClockIcon"
import FuelIcon from "@/components/icon/FuelIcon"
import Preloader from "@/components/Preloader"
import { ChartComponent } from "@/components/ui/ChartComponent"
import { Input, NovariaTokenLogo, WBTCTokenLogo } from "@/components/ui/Input"
import { MockERC20Abi } from "@/lib/abis/mockERC20Abi"
import { mockVaultAbi } from "@/lib/abis/mockVaultAbi"
import { FUNDING_VAULT_ADDRESS, MOCK_TOKEN_ADDRESS } from "@/utils/constants"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { erc20Abi } from "viem"
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi"

export const Mint = () => {
  const [mintAmount, setMintAmount] = useState<number>(0)

  const { address } = useAccount()

  const { data: mockBalance } = useReadContract({
    abi: MockERC20Abi.abi,
    address: MOCK_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  })

  const {
    data: transactionHash,
    isPending: isPendingTransaction,
    writeContractAsync: writeContractAsync,
  } = useWriteContract()

  const {
    isLoading: isLoadingTransaction,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  })

  useEffect(() => {
    if (isTransactionSuccess) {
      toast.success(`Success Mint ${mintAmount} 🪙🪙🪙`)
    } else if (isTransactionError) {
      toast.error(
        "Transaction Error: " +
          (transactionError instanceof Error ? transactionError.message : String(transactionError))
      )
    }
  }, [isTransactionSuccess, isTransactionError, mintAmount])

  const handleMint = async () => {
    try {
      await writeContractAsync({
        abi: erc20Abi,
        address: MOCK_TOKEN_ADDRESS,
        functionName: "approve",
        args: [FUNDING_VAULT_ADDRESS, BigInt(mintAmount)],
      })

      await writeContractAsync({
        abi: mockVaultAbi.abi,
        address: FUNDING_VAULT_ADDRESS,
        functionName: "deposit",
        args: [BigInt(mintAmount)],
      })
    } catch (err) {
      console.error(err)
      toast.error("Error in Transaction: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <>
      {(isLoadingTransaction || isPendingTransaction) && <Preloader />}
      <div className="flex items-center">
        <div className="bg-zinc-900 w-[800px] rounded-md h-full mx-auto border border-main/10 p-8">
          <div className="h-full">
            {/* Set a fixed height that's about 10-20% of typical container */}
            <ChartComponent
              height={150}
              data={[
                { time: "2018-12-22", value: 10.51 },
                { time: "2018-12-23", value: 11.11 },
                { time: "2018-12-24", value: 12.02 },
                { time: "2018-12-25", value: 13.32 },
                { time: "2018-12-26", value: 14.17 },
              ]}
            />
          </div>
        </div>
        <div className="rounded-3xl p-5 flex flex-col gap-6 items-center justify-center mt-12 bg-zinc-900 w-[400px] mx-auto border border-main/10">
          <div className="flex flex-col gap-1">
            <div className="text-start w-full text-lg font-semibold">Input</div>
            <Input
              icon={<WBTCTokenLogo />}
              type="number"
              value={mintAmount}
              onChange={ev => {
                const value = ev.target.value
                const currentBalance = Number(mockBalance) / 1e18 - Number(value)

                if (currentBalance < 0) {
                  return
                }
                setMintAmount(Number(value))
              }}
            />
            <p className="text-xs text-white/50">
              Your Balance {Number(mockBalance) / 1e18 - mintAmount}
            </p>
          </div>

          <div className="bg-turquoise-100 text-black rounded-full p-2">
            <ArrowDownIcon />
          </div>

          <div>
            <div className="text-start w-full text-lg font-semibold mb-2">Output</div>
            <Input icon={<NovariaTokenLogo />} type="number" value={mintAmount / 10} />
          </div>

          <div className="w-full">
            <div className="p-2 w-full rounded-2xl flex items-center justify-between">
              <span className="flex gap-2 text-white/50">
                <ClockIcon />
                <p className="text-sm">Est. Processing Time</p>
              </span>

              <p className="text-sm">~5 s</p>
            </div>
            <div className="p-2 w-full rounded-2xl flex items-center justify-between">
              <span className="flex gap-2 text-white/50">
                <FuelIcon />
                <p className="text-sm">Network Fee</p>
              </span>

              <p className="text-sm">0.001</p>
            </div>
          </div>

          <button
            className="w-full border border-main/50 bg-main/10 px-4 py-2 rounded-lg text-sm text-white cursor-pointer hover:border-main hover:bg-main/40 transition-all disabled:opacity-50"
            onClick={handleMint}
            disabled={mintAmount < 1}
          >
            Mint
          </button>
        </div>
      </div>
    </>
  )
}
