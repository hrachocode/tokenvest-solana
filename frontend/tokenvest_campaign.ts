/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tokenvest_campaign.json`.
 */
export type TokenvestCampaign = {
  address: "FxouSLUnFdHhvAz1HVfSwHDxJyhomf9miwh2YNW7FAHR";
  metadata: {
    name: "tokenvestCampaign";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "finishStartup";
      discriminator: [131, 219, 88, 236, 249, 209, 125, 12];
      accounts: [
        {
          name: "investmentContract";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "investment_contract.startup_owner";
                account: "investmentContract";
              },
              {
                kind: "account";
                path: "investment_contract.campaign_seed";
                account: "investmentContract";
              }
            ];
          };
        },
        {
          name: "caller";
          writable: true;
          signer: true;
        },
        {
          name: "callerAta";
          writable: true;
        },
        {
          name: "usdcMint";
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "startupOwner";
          writable: true;
          signer: true;
        },
        {
          name: "investmentContract";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "startupOwner";
              },
              {
                kind: "arg";
                path: "campaignSeed";
              }
            ];
          };
        },
        {
          name: "usdcMint";
        },
        {
          name: "usdcVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "investmentContract";
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "campaignSeed";
          type: "string";
        },
        {
          name: "investmentGoal";
          type: "u64";
        },
        {
          name: "endTime";
          type: "i64";
        }
      ];
    },
    {
      name: "invest";
      discriminator: [13, 245, 180, 103, 254, 182, 121, 4];
      accounts: [
        {
          name: "investmentContract";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "investment_contract.startup_owner";
                account: "investmentContract";
              },
              {
                kind: "account";
                path: "investment_contract.campaign_seed";
                account: "investmentContract";
              }
            ];
          };
        },
        {
          name: "investorData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "from";
              },
              {
                kind: "account";
                path: "investment_contract.campaign_seed";
                account: "investmentContract";
              }
            ];
          };
        },
        {
          name: "usdcMint";
        },
        {
          name: "from";
          writable: true;
          signer: true;
        },
        {
          name: "investorAta";
          writable: true;
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "investmentAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "refundStartup";
      discriminator: [16, 189, 55, 166, 255, 116, 83, 196];
      accounts: [
        {
          name: "investmentContract";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "investment_contract.startup_owner";
                account: "investmentContract";
              },
              {
                kind: "account";
                path: "investment_contract.campaign_seed";
                account: "investmentContract";
              }
            ];
          };
        },
        {
          name: "investorData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 118, 101, 115, 116];
              },
              {
                kind: "account";
                path: "caller";
              },
              {
                kind: "account";
                path: "investment_contract.campaign_seed";
                account: "investmentContract";
              }
            ];
          };
        },
        {
          name: "caller";
          writable: true;
          signer: true;
        },
        {
          name: "callerAta";
          writable: true;
        },
        {
          name: "usdcMint";
        },
        {
          name: "usdcVault";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "investmentContract";
      discriminator: [236, 37, 203, 173, 105, 219, 30, 158];
    },
    {
      name: "investorData";
      discriminator: [78, 74, 13, 200, 49, 153, 230, 18];
    }
  ];
  types: [
    {
      name: "investmentContract";
      type: {
        kind: "struct";
        fields: [
          {
            name: "startupOwner";
            type: "pubkey";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "usdcVault";
            type: "pubkey";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "tokensCollected";
            type: "u64";
          },
          {
            name: "investmentGoal";
            type: "u64";
          },
          {
            name: "campaignSeed";
            type: "string";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "investorData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pubkey";
            type: "pubkey";
          },
          {
            name: "amount";
            type: {
              option: "u64";
            };
          }
        ];
      };
    }
  ];
};

export const IDL: TokenvestCampaign = {
  address: "FxouSLUnFdHhvAz1HVfSwHDxJyhomf9miwh2YNW7FAHR",
  metadata: {
    name: "tokenvestCampaign",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "finishStartup",
      discriminator: [ 131, 219, 88, 236, 249, 209, 125, 12 ],
      accounts: [
        {
          name: "investmentContract",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "investment_contract.startup_owner",
                account: "investmentContract",
              },
              {
                kind: "account",
                path: "investment_contract.campaign_seed",
                account: "investmentContract",
              },
            ],
          },
        },
        {
          name: "caller",
          writable: true,
          signer: true,
        },
        {
          name: "callerAta",
          writable: true,
        },
        {
          name: "usdcMint",
        },
        {
          name: "usdcVault",
          writable: true,
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "clock",
          address: "SysvarC1ock11111111111111111111111111111111",
        },
      ],
      args: [],
    },
    {
      name: "initialize",
      discriminator: [ 175, 175, 109, 31, 13, 152, 155, 237 ],
      accounts: [
        {
          name: "startupOwner",
          writable: true,
          signer: true,
        },
        {
          name: "investmentContract",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "startupOwner",
              },
              {
                kind: "arg",
                path: "campaignSeed",
              },
            ],
          },
        },
        {
          name: "usdcMint",
        },
        {
          name: "usdcVault",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "investmentContract",
              },
            ],
          },
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "clock",
          address: "SysvarC1ock11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "campaignSeed",
          type: "string",
        },
        {
          name: "investmentGoal",
          type: "u64",
        },
        {
          name: "endTime",
          type: "i64",
        },
      ],
    },
    {
      name: "invest",
      discriminator: [ 13, 245, 180, 103, 254, 182, 121, 4 ],
      accounts: [
        {
          name: "investmentContract",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "investment_contract.startup_owner",
                account: "investmentContract",
              },
              {
                kind: "account",
                path: "investment_contract.campaign_seed",
                account: "investmentContract",
              },
            ],
          },
        },
        {
          name: "investorData",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "from",
              },
              {
                kind: "account",
                path: "investment_contract.campaign_seed",
                account: "investmentContract",
              },
            ],
          },
        },
        {
          name: "usdcMint",
        },
        {
          name: "from",
          writable: true,
          signer: true,
        },
        {
          name: "investorAta",
          writable: true,
        },
        {
          name: "usdcVault",
          writable: true,
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "investmentAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "refundStartup",
      discriminator: [ 16, 189, 55, 166, 255, 116, 83, 196 ],
      accounts: [
        {
          name: "investmentContract",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "investment_contract.startup_owner",
                account: "investmentContract",
              },
              {
                kind: "account",
                path: "investment_contract.campaign_seed",
                account: "investmentContract",
              },
            ],
          },
        },
        {
          name: "investorData",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [ 116, 111, 107, 101, 110, 118, 101, 115, 116 ],
              },
              {
                kind: "account",
                path: "caller",
              },
              {
                kind: "account",
                path: "investment_contract.campaign_seed",
                account: "investmentContract",
              },
            ],
          },
        },
        {
          name: "caller",
          writable: true,
          signer: true,
        },
        {
          name: "callerAta",
          writable: true,
        },
        {
          name: "usdcMint",
        },
        {
          name: "usdcVault",
          writable: true,
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "clock",
          address: "SysvarC1ock11111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "investmentContract",
      discriminator: [ 236, 37, 203, 173, 105, 219, 30, 158 ],
    },
    {
      name: "investorData",
      discriminator: [ 78, 74, 13, 200, 49, 153, 230, 18 ],
    },
  ],
  types: [
    {
      name: "investmentContract",
      type: {
        kind: "struct",
        fields: [
          {
            name: "startupOwner",
            type: "pubkey",
          },
          {
            name: "startTime",
            type: "i64",
          },
          {
            name: "usdcVault",
            type: "pubkey",
          },
          {
            name: "endTime",
            type: "i64",
          },
          {
            name: "tokensCollected",
            type: "u64",
          },
          {
            name: "investmentGoal",
            type: "u64",
          },
          {
            name: "campaignSeed",
            type: "string",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "investorData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "pubkey",
          },
          {
            name: "amount",
            type: {
              option: "u64",
            },
          },
        ],
      },
    },
  ],
};
