import BaseComponent from '../../utils/base-component';
import Cell from '../cell';
import './field.scss';

export default class Field extends BaseComponent {
  constructor(parentNode, size, bombsAmount) {
    super({
      parentNode,
      className: 'field',
    });
    this.size = size;
    this.bombsAmount = bombsAmount;
    this.cells = [];
    this.bombs = this.createBombs();
    this.createCells();
    this.countBombs();
    // this.openAll();
  }

  createBombs() {
    const bombPositions = new Set();
    while (bombPositions.size < this.bombsAmount) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);
      bombPositions.add(`${row},${col}`);
    }
    console.log(bombPositions);
    return bombPositions;
  }

  createCells() {
    for (let i = 0; i < this.size; i += 1) {
      const row = [];
      const rowEl = new BaseComponent({ parentNode: this.node, className: 'row' });
      for (let j = 0; j < this.size; j += 1) {
        const isBomb = this.bombs.has(`${i},${j}`);
        const cell = new Cell(rowEl, this, i, j, isBomb);
        row.push(cell);
      }
      this.cells.push(row);
    }
    console.log(this.cells);
  }

  countBombs() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.setBombsAmount(this.countNeighboursBombs(cell));
      });
    });
  }

  countNeighboursBombs(cell) {
    const { row, col } = cell;
    let counter = 0;
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (i === row && j === col) continue;
        if (i < 0 || i >= this.size) continue;
        if (j < 0 || j >= this.size) continue;
        if (this.cells[i][j].isBomb) counter += 1;
      }
    }
    return counter;
  }

  openNeighbours(cell) {
    const { row, col } = cell;
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (i === row && j === col) continue;
        if (i < 0 || i >= this.size) continue;
        if (j < 0 || j >= this.size) continue;
        const currentCell = this.cells[i][j];
        currentCell.open();
      }
    }
  }

  openAll() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.open();
      });
    });
  }
}
