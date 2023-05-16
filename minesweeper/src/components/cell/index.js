import BaseComponent from '../../utils/base-component';
import './cell.scss';

export default class Cell extends BaseComponent {
  constructor(parentNode, row, col) {
    super({
      parentNode,
      className: 'cell',
    });
    this.row = row;
    this.col = col;
    this.isBomb = false;
    this.isOpen = false;
    this.isFlag = false;
    this.node.onclick = () => this.handleClick();
    this.node.oncontextmenu = (e) => this.flag(e);
  }

  handleClick() {
    if (this.isOpen || this.isFlag) return;
    this.emit('revealCell', this);
  }

  reveal() {
    if (this.isOpen || this.isFlag) return;
    if (this.isBomb) {
      this.addClass('bomb');
      return;
    }
    this.isOpen = true;
    this.addClass('open');
    this.setAttributes({
      'data-bombs': this.isEmpty ? '' : this.bombsAround,
    });
  }

  flag(e) {
    e.preventDefault();
    if (this.isOpen) return;
    this.isFlag = !this.isFlag;
    this.toggleClass('flag', this.isFlag);
  }

  setBombsAmount(amount) {
    this.bombsAround = amount;
    this.isEmpty = this.bombsAround === 0 && !this.isBomb;
  }

  setBomb() {
    this.isBomb = true;
  }
}
