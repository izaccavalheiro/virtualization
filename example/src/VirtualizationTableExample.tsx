import { VirtualizationTable } from "simple-virtualization";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  teamSize?: number;
}

// Helper function to generate random dates within the last year
const generateRandomDate = () => {
  const end = new Date();
  const start = new Date(new Date().setFullYear(end.getFullYear() - 1));
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

// Helper function to get random array element
const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Sample data arrays for generation
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Emma', 'Olivia', 'Noah', 'Liam', 'Sophia'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White'
];

const departments = [
  'Engineering', 'Sales', 'Marketing', 'Customer Support', 'Human Resources',
  'Finance', 'Operations', 'Research & Development', 'Legal', 'Product'
];

const roles = [
  'Manager', 'Senior Developer', 'Developer', 'Analyst', 'Specialist',
  'Coordinator', 'Representative', 'Designer', 'Engineer', 'Associate'
];

const statuses: Array<UserData['status']> = ['active', 'inactive', 'pending'];

// Generate mock data
export const generateMockData = (count: number): UserData[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const department = getRandomElement(departments);
    const role = getRandomElement(roles);
    
    return {
      id: index + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: `${department} ${role}`,
      department,
      status: getRandomElement(statuses),
      lastActive: generateRandomDate(),
      location: getRandomElement(['New York', 'London', 'Tokyo', 'Berlin', 'Singapore']),
      teamSize: Math.floor(Math.random() * 20) + 1,
      projectCount: Math.floor(Math.random() * 10) + 1,
      yearsOfService: Math.floor(Math.random() * 15) + 1,
      performanceScore: Math.floor(Math.random() * 50) + 50
    };
  });
};

// Create example data
export const mockItems = generateMockData(1000);

// CSS-in-JS type definitions
type CSSProperties = React.CSSProperties;
type PseudoProperties = {
  '&:hover'?: CSSProperties;
  '&:active'?: CSSProperties;
  '&:focus'?: CSSProperties;
  '&:before'?: CSSProperties;
  '&:after'?: CSSProperties;
  '&:first-child'?: CSSProperties;
  '&:last-child'?: CSSProperties;
};

type CSSPropertiesWithPseudo = CSSProperties & PseudoProperties;

interface StyleType {
  row: CSSPropertiesWithPseudo;
  header: CSSPropertiesWithPseudo;
  footer: CSSPropertiesWithPseudo;
  status: CSSPropertiesWithPseudo;
  statusActive: CSSPropertiesWithPseudo;
  statusInactive: CSSPropertiesWithPseudo;
  statusPending: CSSPropertiesWithPseudo;
}

// Shared styles
const styles: StyleType = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s, transform 0.2s',
    '&:hover': {
      backgroundColor: '#f8fafc',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f1f5f9',
    fontWeight: 600,
    borderBottom: '1px solid #e2e8f0'
  },
  footer: {
    padding: '16px',
    backgroundColor: '#f1f5f9',
    textAlign: 'right',
    borderTop: '1px solid #e2e8f0'
  },
  status: {
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '14px',
    display: 'inline-block'
  },
  statusActive: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  statusPending: {
    backgroundColor: '#fef9c3',
    color: '#854d0e'
  }
};

// Column configuration
interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}

const columns: ColumnConfig[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'teamSize', label: 'Team Size', sortable: true },
  { key: 'projectCount', label: 'Projects', sortable: true },
  { key: 'yearsOfService', label: 'Experience', sortable: true },
  { key: 'performanceScore', label: 'Performance', sortable: true }
];

// Example header component with sorting
export const ExampleHeader = ({ onSort, sortState }: {
  onSort: (column: string) => void;
  sortState: { column: string | null; direction: 'asc' | 'desc' | null };
}) => {
  const cellStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#f1f5f9',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const getSortIndicator = (column: string) => {
    if (sortState.column !== column) return '↕';
    return sortState.direction === 'asc' ? '↑' : sortState.direction === 'desc' ? '↓' : '↕';
  };

  return (
    <>
      {columns.map(column => (
        <div
          key={column.key}
          style={{
            ...cellStyle,
            backgroundColor: sortState.column === column.key ? '#e2e8f0' : '#f1f5f9'
          }}
          onClick={() => column.sortable && onSort(column.key)}
          title={column.sortable ? `Sort by ${column.label}` : undefined}
        >
          <span>{column.label}</span>
          {column.sortable && (
            <span style={{ 
              opacity: sortState.column === column.key ? 1 : 0.3,
              fontSize: '0.8em'
            }}>
              {getSortIndicator(column.key)}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

// Example row component with dynamic columns
export const ExampleRow = ({ item }: { item: UserData; index: number }) => {
  const getStatusStyle = (status: UserData['status']) => ({
    ...styles.status,
    ...(status === 'active' ? styles.statusActive :
       status === 'inactive' ? styles.statusInactive :
       styles.statusPending)
  });

  const cellStyle: React.CSSProperties = {
    padding: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const renderCell = (column: ColumnConfig) => {
    const value = item[column.key as keyof UserData];
    
    if (column.key === 'status') {
      return (
        <span style={getStatusStyle(value as UserData['status'])}>
          {value}
        </span>
      );
    }
    
    if (column.render) {
      return column.render(value);
    }
    
    if (column.key === 'teamSize') {
      return `${value} members`;
    }
    
    if (column.key === 'projectCount') {
      return `${value} projects`;
    }
    
    if (column.key === 'yearsOfService') {
      return `${value} years`;
    }
    
    if (column.key === 'performanceScore') {
      return `${value}%`;
    }
    
    return value;
  };

  return (
    <>
      {columns.map(column => (
        <div key={column.key} style={cellStyle}>
          {renderCell(column)}
        </div>
      ))}
    </>
  );
};

// Example footer component
export const ExampleFooter = () => {
  const cellStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#f1f5f9',
    textAlign: 'left'
  };

  // Fill first cell and span across all columns to distribute content
  return (
    <>
      <div style={{
        ...cellStyle,
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Total Users: {mockItems.length}</span>
        <span>Active Users: {mockItems.filter(item => item.status === 'active').length}</span>
        <span>Average Team Size: {(mockItems.reduce((acc, item) => item.teamSize ? (acc + item.teamSize) : acc, 0) / mockItems.length).toFixed(1)}</span>
      </div>
    </>
  );
};

interface TableStyleType {
  container: React.CSSProperties;
}

const tableStyles: TableStyleType = {
  container: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  }
};

export const VirtualizationTableExample = () => {
  return (
    <VirtualizationTable
      data={mockItems}
      Header={ExampleHeader}
      Row={ExampleRow}
      columnWidths={[
        '50px',    // Id
        '150px',    // Name
        '150px',    // Email
        '100px',    // Role
        '130px',    // Department
        '100px',    // Status
        '120px',    // Last Active
        '120px',    // Location
        '100px',    // Team Size
        '100px',    // Projects
        '100px',    // Experience
        '120px'     // Performance
      ]}
      Footer={ExampleFooter}
      style={tableStyles.container}
      footerStyle={{ display: 'flex' }}
      tableHeight={300}
    />
  );
};
