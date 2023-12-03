import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { signOut } from "next-auth/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";
import stripePromise from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutButton from "../stripe/checkoutButton";

interface AbiItem {
  type: string;
  name: string;
  // Add other properties as needed
}

interface ContractAbi {
  abi: AbiItem[];
  contractName: string; // Added to display the contract name
  // Include other properties if needed
}

function NodeSidebar({ onDragStart }: any) {
  const [compiledAbi, setCompiledAbi] = useState<ContractAbi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSolidityCode = async (url: string): Promise<string> => {
    const rawUrl = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
    const response = await fetch(rawUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch Solidity code: ${response.statusText}`);
    }
    return await response.text();
  };

  async function compileSolidityCode(sourceCode: string) {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to compile code: ${errorData.error || response.statusText}`
      );
    }

    return await response.json();
  }

  const handleFetchAndCompile = async () => {
    setLoading(true);
    setError(null);
    try {
      const code = await fetchSolidityCode(
        "https://github.com/clementroure/test-contract/blob/main/UniswapV2Factory.sol"
      );
      const abiObject = await compileSolidityCode(code);
      const contractsArray: ContractAbi[] = Object.entries(abiObject).map(
        ([contractName, contract]) => {
          return {
            contractName,
            abi: (contract as ContractAbi).abi || [],
          };
        }
      );
      setCompiledAbi(contractsArray);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load ABI");
    }
    setLoading(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const result = e.target.result;
          if (typeof result === "string") {
            try {
              const abi = JSON.parse(result);
              const contractName = file.name.replace(".json", "");

              // Check if ABI is valid and not empty
              if (Array.isArray(abi) && abi.length > 0) {
                // Check if contract already exists
                if (
                  !compiledAbi.some(
                    (contract) => contract.contractName === contractName
                  )
                ) {
                  setCompiledAbi((prevCompiledAbi) => [
                    ...prevCompiledAbi,
                    { contractName, abi },
                  ]);
                } else {
                  alert(`ABI for contract '${contractName}' already loaded.`);
                }
              } else {
                alert(
                  `The file '${file.name}' does not contain a valid or non-empty ABI.`
                );
              }
            } catch (error) {
              alert(`Error parsing ABI from file '${file.name}'`);
            }
          } else {
            console.error("File content is not a string");
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const handleDownloadAbis = () => {
    const zip = new JSZip();
    compiledAbi.forEach((contract) => {
      if (contract.abi && contract.abi.length > 0) {
        const abiJson = JSON.stringify(contract.abi, null, 2);
        zip.file(`${contract.contractName}.json`, abiJson);
      }
    });

    if (Object.keys(zip.files).length > 0) {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "abis.zip");
      });
    } else {
      alert("No valid ABI items to download.");
    }
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <aside className="h-screen w-64 overflow-y-auto p-2.5">
      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={handleFetchAndCompile}
          className="mb-2 w-full"
        >
          Fetch and Compile Code
        </Button>
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          Load ABIs from File
        </Button>

        <Elements stripe={stripePromise}>
          <CheckoutButton />
        </Elements>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          multiple
          accept=".json"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {compiledAbi.map((contract, contractIndex) => (
            <AccordionItem
              key={contractIndex}
              value={`contract-${contractIndex}`}
            >
              <AccordionTrigger>{contract.contractName}</AccordionTrigger>
              <AccordionContent>
                {contract.abi.map(
                  (abiItem, index) =>
                    (abiItem.type === "function" ||
                      abiItem.type === "variable") && (
                      <div
                        key={index}
                        onDragStart={(event) =>
                          onDragStart(event, JSON.stringify(abiItem))
                        }
                        draggable
                        className="mb-2.5 cursor-pointer rounded border border-gray-300 p-2.5 transition duration-200 ease-in-out hover:shadow-lg"
                      >
                        {abiItem.name}
                      </div>
                    )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <Button
        variant="secondary"
        onClick={handleDownloadAbis}
        className="mt-4 w-full"
      >
        Download ABIs
      </Button>
      <Button variant="secondary" onClick={logout} className="mt-4 w-full">
        Logout
      </Button>
    </aside>
  );
}

export default NodeSidebar;
