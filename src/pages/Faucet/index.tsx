import { useEffect } from "react"
import { MOCK_TOKEN_ADDRESS } from "@/utils/constants"
import { useAccount, useWriteContract } from "wagmi"
import Preloader from "@/components/Preloader"
import { toast } from "sonner"
import { MockERC20Abi } from "@/lib/abis/mockERC20Abi"

const Faucet = () => {
  const { address } = useAccount()

  const { isPending, writeContract, isSuccess, isError } = useWriteContract()
  console.log("🚀 ~ Faucet ~ isSuccess:", isSuccess)

  const handleFaucet = () => {
    writeContract({
      abi: MockERC20Abi.abi,
      address: MOCK_TOKEN_ADDRESS,
      functionName: "mint",
      args: [address, BigInt(1000e18)],
    })
  }

  const addTokenAddress = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!window.ethereum) {
      toast.error("Wallet not found")
      return
    }

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: MOCK_TOKEN_ADDRESS,
            symbol: "WBTC",
            decimals: 18,
            image: "https://example.com/wbtc-logo.png",
          },
        },
      })
      toast.success("Token added to wallet successfully")
    } catch (error: any) {
      toast.error(`Failed to add token: ${error.message}`)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success sending 1000 WBTC to your wallet")
    } else if (isError) {
      toast.error("Error sending 1000 WBTC to your wallet")
    }
  }, [isSuccess, isError])

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="rounded-3xl p-5 flex flex-col items-center justify-center mt-12 bg-zinc-900 gap-4 w-[400px] border border-main/10">
          <div className="flex flex-col gap-2 align-center text-center">
            <p className="text-2xl font-semibold">Mock WBTC Faucet</p>
            <p className="text-xs text-white/50">
              Get free 1000 WBTC sent directly to your wallet.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="border border-main/50 bg-main/10 px-4 py-2 rounded-lg text-sm text-white cursor-pointer hover:border-main hover:bg-main/40 transition-all"
              onClick={handleFaucet}
            >
              Receive 1000 Mock WBTC
            </button>
            <button
              className="border border-main/50 bg-main/10 px-4 py-2 rounded-lg text-sm text-white cursor-pointer hover:border-main hover:bg-main/40 transition-all"
              onClick={addTokenAddress}
            >
              Add Token Address
            </button>
          </div>
        </div>
        <p className="text-[10px] text-white/50 text-center">
          Note: We securely handle the provided wallet address while processing your request.
        </p>
      </div>

      {isPending && <Preloader />}
    </>
  )
}

export default Faucet
