import BaseComponent from '../../utils/base-component';
import Cell from '../cell';
import './field.scss';

export default class Field extends BaseComponent {
  constructor(parentNode, settings) {
    super({
      parentNode,
      className: 'field',
    });
    this.size = settings.size;
    this.bombsAmount = settings.bombsAmount;
    this.on('clickOnCell', (cell) => this.revealCell(cell));
    this.on('flag', (isAdded) => this.handleFlag(isAdded));
    this.bombHandler = this.on('bomb', () => this.handleBomb());
    this.cells = {};
    this.createCells();
    this.revealedCells = 0;
    this.flaggedCells = 0;
  }

  createBombs(excluded) {
    const excludedKey = `${excluded.row},${excluded.col}`;
    this.bombs = new Set();
    const positions = Object.keys(this.cells).filter((key) => key !== excludedKey);
    while (this.bombs.size < this.bombsAmount) {
      const randomNum = Math.floor(Math.random() * positions.length);
      this.bombs.add(positions[randomNum]);
      positions.splice(randomNum, 1);
    }
    this.bombs.forEach((position) => this.cells[position].setBomb());
    this.countBombs();
  }

  revealCell(cell) {
    if (this.revealedCells === 0) {
      this.createBombs(cell);
      this.emit('startGame');
    }
    if (cell.isOpen && !cell.isEmpty) {
      this.revealNeighbours(cell);
    }
    cell.reveal();
    if (cell.isBomb) {
      this.revealBombs();
      return;
    }
    if (cell.isEmpty) this.revealNeighbours(cell);
    this.revealedCells = Object.values(this.cells).filter((c) => c.isOpen).length;
    this.emit('updateCellsCounter', this.revealedCells);
  }

  revealNeighbours(cell) {
    const neighbours = new Set(this.getNeighbours(cell));
    // eslint-disable-next-line no-restricted-syntax
    for (const currentCell of neighbours) {
      currentCell.reveal();
      if (currentCell.isEmpty) {
        const newCells = this.getNeighbours(currentCell);
        newCells.forEach((newCell) => neighbours.add(newCell));
      }
    }
  }

  createCells() {
    for (let i = 0; i < this.size; i += 1) {
      const rowEl = new BaseComponent({ parentNode: this.node, className: 'row' });
      for (let j = 0; j < this.size; j += 1) {
        const key = `${i},${j}`;
        const cell = new Cell(rowEl, i, j);
        this.cells[key] = cell;
      }
    }
    console.log(this.cells);
  }

  countBombs() {
    Object.values(this.cells).forEach((cell) => {
      cell.setBombsAmount(this.countNeighboursBombs(cell));
    });
  }

  getNeighbours(cell) {
    const { row, col } = cell;
    const neighbours = [];
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        const key = `${i},${j}`;
        if (key !== `${row},${col}`) {
          const currentCell = this.cells[key];
          if (currentCell) neighbours.push(currentCell);
        }
      }
    }
    return neighbours;
  }

  countNeighboursBombs(cell) {
    const neighbours = this.getNeighbours(cell);
    return neighbours.filter((neighbour) => neighbour.isBomb).length;
  }

  revealBombs() {
    this.bombs.forEach((position) => this.cells[position].reveal());
  }

  handleBomb() {
    this.off('bomb', this.bombHandler);
    this.revealBombs();
    this.emit('lose');
  }
}
