const ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'deptName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'priority',
            type: 'uint256',
          },
        ],
        internalType: 'struct Approval.DeptKeyDetails[]',
        name: 'deptDetail',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'currentPriority',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'owner',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    name: 'addAccessDetails',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newPriority',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'deptName',
        type: 'string',
      },
    ],
    name: 'addNewDept',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'deptName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isLead',
        type: 'bool',
      },
    ],
    name: 'addNewEmployee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'fullAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'url',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'docName',
            type: 'string',
          },
        ],
        internalType: 'struct Approval.Docsrc[]',
        name: 'detail',
        type: 'tuple[]',
      },
      {
        internalType: 'string',
        name: 'owner',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'currentPriority',
        type: 'uint256',
      },
    ],
    name: 'addNewProcess',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'userId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newPassword',
        type: 'string',
      },
    ],
    name: 'changePassword',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'userId',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
        ],
        internalType: 'struct Approval.loginInfo',
        name: 'details',
        type: 'tuple',
      },
    ],
    name: 'saveLogin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'deptName',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isLead',
            type: 'bool',
          },
        ],
        internalType: 'struct Approval.verifierDetail',
        name: 'detail',
        type: 'tuple',
      },
    ],
    name: 'saveVerifierLogin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'dept',
        type: 'string[]',
      },
      {
        internalType: 'uint256[]',
        name: 'priority',
        type: 'uint256[]',
      },
    ],
    name: 'setPriority',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'dept',
        type: 'string[]',
      },
      {
        internalType: 'string[]',
        name: 'publicKey',
        type: 'string[]',
      },
      {
        internalType: 'string[]',
        name: 'privateKey',
        type: 'string[]',
      },
    ],
    name: 'updateDepartmentKeys',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'newPriority',
        type: 'uint256[]',
      },
    ],
    name: 'updatePriority',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'approvalDept',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'openedTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedTime',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'approvedStatus',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'transactedPerson',
            type: 'address',
          },
        ],
        internalType: 'struct Approval.Status',
        name: 'detail',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'currentPriority',
        type: 'uint256',
      },
    ],
    name: 'updateProcessStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'deptKeys',
    outputs: [
      {
        internalType: 'string',
        name: 'publicKey',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'privateKey',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'documentProcessed',
    outputs: [
      {
        internalType: 'bool',
        name: 'isApproved',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
    ],
    name: 'fetchAccess',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'deptName',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'priority',
                type: 'uint256',
              },
            ],
            internalType: 'struct Approval.DeptKeyDetails[]',
            name: 'approvalDept',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'approvalDept',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'openedTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'closedTime',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'approvedStatus',
                type: 'bool',
              },
              {
                internalType: 'string',
                name: 'description',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'transactedPerson',
                type: 'address',
              },
            ],
            internalType: 'struct Approval.Status[]',
            name: 'status',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'currentPriority',
            type: 'uint256',
          },
        ],
        internalType: 'struct Approval.DocumentAccess',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
    ],
    name: 'fetchDocument',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'url',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'docName',
                type: 'string',
              },
            ],
            internalType: 'struct Approval.Docsrc[]',
            name: 'src',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'fullAddress',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
        ],
        internalType: 'struct Approval.DocumentProcess',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'deptName',
        type: 'string',
      },
    ],
    name: 'fetchMyProcess',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'processName',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'owner',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'currentPriority',
            type: 'uint256',
          },
        ],
        internalType: 'struct Approval.Process[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'userId',
        type: 'string',
      },
    ],
    name: 'fetchUserProcess',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'processName',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'owner',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'currentPriority',
            type: 'uint256',
          },
        ],
        internalType: 'struct Approval.Process[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'finishedProcess',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'approvalDept',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'openedTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedTime',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'approvedStatus',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'transactedPerson',
            type: 'address',
          },
        ],
        internalType: 'struct Approval.Status',
        name: 'detail',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: 'processId',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllPriority',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEmployerCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'deptName',
        type: 'string',
      },
    ],
    name: 'getFinishedProcess',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'approvalDept',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'openedTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'closedTime',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'approvedStatus',
                type: 'bool',
              },
              {
                internalType: 'string',
                name: 'description',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'transactedPerson',
                type: 'address',
              },
            ],
            internalType: 'struct Approval.Status',
            name: 'detail',
            type: 'tuple',
          },
          {
            internalType: 'string',
            name: 'processId',
            type: 'string',
          },
        ],
        internalType: 'struct Approval.FinishedProcess[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'userId',
        type: 'string',
      },
    ],
    name: 'getUserLoginDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
        ],
        internalType: 'struct Approval.loginInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
    ],
    name: 'getVerfierLogin',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'deptName',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isLead',
            type: 'bool',
          },
        ],
        internalType: 'struct Approval.verifierDetail',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isKeyNeeded',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'myProcess',
    outputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'processName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'owner',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'currentPriority',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'showDepartments',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'userLogin',
    outputs: [
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userProcess',
    outputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'processName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'owner',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'currentPriority',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'verifierOfficials',
    outputs: [
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'deptName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isLead',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
module.exports = ABI;
