import BaseComponent from '../../utils/base-component';
import './cell.scss';

export default class Cell extends BaseComponent {
  constructor(parentNode, field, row, col, isBomb = false) {
    super({
      parentNode,
      className: 'cell',
    });
    this.row = row;
    this.col = col;
    this.isBomb = isBomb;
    this.isOpen = false;
    this.isFlag = false;
    this.field = field;
    this.node.onclick = () => this.open();
    this.node.oncontextmenu = (e) => this.flag(e);
  }

  open() {
    if (this.isOpen || this.isFlag) return;
    this.isOpen = true;
    if (this.isBomb) this.addClass('bomb');
    this.addClass('open');
    this.setAttributes({
      'data-bombs': this.isBomb || this.bombsAmount === 0 ? '' : this.bombsAmount,
    });
    if (this.bombsAmount === 0 && !this.isBomb) this.field.openNeighbours(this);
  }

  flag(e) {
    e.preventDefault();
    if (this.isOpen) return;
    this.isFlag = !this.isFlag;
    this.toggleClass('flag', this.isFlag);
  }

  setBombsAmount(amount) {
    this.bombsAmount = amount;
  }
}
