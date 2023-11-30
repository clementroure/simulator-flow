// pages/api/compile.js
import solc from 'solc';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sourceCode } = req.body;
      
      // Load the specific compiler version
      const solcVersion = 'v0.5.16+commit.9c3226ce';
      const solcCompiler = await new Promise((resolve, reject) => {
        solc.loadRemoteVersion(solcVersion, (err, solcSpecific) => {
          if (err) reject(err);
          else resolve(solcSpecific);
        });
      });

      const input = {
        language: 'Solidity',
        sources: {
          'contract.sol': { content: sourceCode },
        },
        settings: { outputSelection: { '*': { '*': ['*'] } } },
      };

      // Compile with the specific version
      const output = JSON.parse(solcCompiler.compile(JSON.stringify(input)));

      if (output.errors) {
        console.error(output.errors);
        return res.status(400).json({ errors: output.errors });
      }

      res.status(200).json(output.contracts['contract.sol']);
    } catch (error) {
      console.error('Compilation error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
