// example/src/App.tsx
import { VirtualizationExample } from './VirtualizationExample';
import { VirtualizationTableExample } from './VirtualizationTableExample';

const App = () => {
  return (
    <>
      <h1>Examples</h1>

      <h2>Div</h2>
      <VirtualizationExample />

      <h2>Table</h2>
      <VirtualizationTableExample />
    </>
  );
};

export default App;
