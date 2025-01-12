import React from 'react';
import SlotMachineList from './components/SlotMachineList';
import SlotMachineGame from './components/SlotMachineGame';

const App: React.FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <SlotMachineList />
      </div>
      <div>
        <SlotMachineGame />
      </div>
    </div>
  );
};

export default App;
