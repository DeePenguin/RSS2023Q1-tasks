import BaseComponent from '../../utils/base-component';
import Cell from '../cell';
import './field.scss';

export default class Field extends BaseComponent {
  constructor(parentNode, { rows, cols, bombs }) {
    super({
      parentNode,
      className: 'field',
    });
    this.init(rows, cols, bombs);
    this.on('clickOnCell', (cell) => this.revealCell(cell));
    this.bombHandler = this.on('bomb', () => this.handleBomb());
    this.isBombListnerActive = true;
    this.on('changeBombsAmount', (newAmount) => this.changeBombsAmount(newAmount));
  }

  init(rows, cols, bombs) {
    this.rows = rows;
    this.cols = cols;
    this.bombsAmount = bombs;
    this.cells = {};
    this.createCells();
    this.revealedCells = 0;
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
    if (cell.isOpen && cell.isEmpty) return;
    if (cell.isOpen && !cell.isEmpty) {
      const neighbours = this.getNeighbours(cell);
      const closedCells = neighbours.filter((c) => !c.isOpen && !c.isFlagged);
      if (closedCells.length === 0) return;
      if (neighbours.filter((c) => c.isFlagged).length !== cell.bombsAround) {
        closedCells.forEach((el) => {
          el.addClass('neighbour');
        });
        return;
      }
      this.revealNeighbours(cell);
    }
    cell.reveal();
    if (cell.isBomb) {
      this.revealBombs();
      return;
    }
    this.emit('move');
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
    for (let i = 0; i < this.rows; i += 1) {
      const rowEl = new BaseComponent({ parentNode: this.node, className: 'row' });
      for (let j = 0; j < this.cols; j += 1) {
        const key = `${i},${j}`;
        const cell = new Cell(rowEl, i, j);
        this.cells[key] = cell;
      }
    }
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
    this.isBombListnerActive = false;
    this.revealBombs();
    this.emit('lose');
  }

  reset() {
    this.revealedCells = 0;
    Object.values(this.cells).forEach((cell) => cell.reset());
    if (!this.isBombListnerActive) this.on('bomb', this.bombHandler);
  }

  save() {
    return {
      bombs: Array.from(this.bombs),
      openCells: Object.values(this.cells)
        .filter((cell) => cell.isOpen)
        .map((c) => `${c.row},${c.col}`),
      flaggedCells: Object.values(this.cells)
        .filter((cell) => cell.isFlagged)
        .map((c) => `${c.row},${c.col}`),
    };
  }

  restore(state) {
    this.bombs = new Set(state.bombs);
    this.bombs.forEach((position) => this.cells[position].setBomb());
    this.countBombs();
    state.flaggedCells.forEach((position) => this.cells[position].flag());
    state.openCells.forEach((position) => this.cells[position].reveal());
    this.revealedCells = state.openCells.length;
    this.emit('updateCellsCounter', this.revealedCells);
  }

  changeBombsAmount(newAmount) {
    this.bombsAmount = newAmount;
    this.reset();
  }

  changeSize(rows, cols, bombs) {
    this.node.innerHTML = '';
    this.init(rows, cols, bombs);
    if (!this.isBombListnerActive) this.on('bomb', this.bombHandler);
  }
}
