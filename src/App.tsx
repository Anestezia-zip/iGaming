import React from 'react';
import SlotMachineList from './components/SlotMachineList';

const App: React.FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <SlotMachineList />
      </div>
      <div>
        {/* <SelectedGame /> */}
      </div>
    </div>
  );
};

export default App;
