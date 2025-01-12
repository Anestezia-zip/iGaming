export class SlotMachine implements SlotMachineInterface {
  id: number;
  name: string;
  betAmount: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.betAmount = 0;
  }

  placeBet(betAmount: number): void {
    this.betAmount = betAmount;
  }

  spin(): number {
    // Симуляция выигрыша/проигрыша
    const result = Math.random() > 0.5 ? this.betAmount : -this.betAmount;
    return result;
  }
}



export interface SlotMachineInterface {
  id: number;
  name: string;
  betAmount: number;  // Текущая ставка
  placeBet(betAmount: number): void;
  spin(): number;
}

