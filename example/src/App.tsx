import { VirtualizationExample } from './VirtualizationExample';
import { VirtualizationTableExample } from './VirtualizationTableExample';
import { VirtualizationGridExample } from './VirtualizationGridExample';

const App = () => {
  return (
    <>
      <h1>Examples</h1>

      <h2>Div</h2>
      <VirtualizationExample />

      <h2>Table</h2>
      <VirtualizationTableExample />

      <h2>Grid</h2>
      <VirtualizationGridExample />
    </>
  );
};

export default App;
