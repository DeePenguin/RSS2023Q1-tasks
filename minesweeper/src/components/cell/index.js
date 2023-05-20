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
    this.isFlagged = false;
    this.node.onclick = () => this.handleClick();
    this.node.oncontextmenu = (e) => this.handleRightClick(e);
    this.node.onanimationend = () => this.removeClass('neighbour');
  }

  handleClick() {
    if (this.isFlagged) return;
    this.emit('clickOnCell', this);
  }

  reveal() {
    if (this.isOpen || this.isFlagged) return;
    if (this.isBomb) {
      this.addClass('bomb');
      this.emit('bomb');
      return;
    }
    this.isOpen = true;
    this.addClass('open');
    this.setAttributes({
      'data-bombs': this.isEmpty ? '' : this.bombsAround,
    });
  }

  handleRightClick(e) {
    e.preventDefault();
    if (this.isOpen) return;
    this.flag();
    this.emit('updateFlagsCounter', this.isFlagged);
  }

  flag() {
    if (this.isOpen) return;
    this.isFlagged = !this.isFlagged;
    this.toggleClass('flag', this.isFlagged);
  }

  setBombsAmount(amount) {
    this.bombsAround = amount;
    this.isEmpty = this.bombsAround === 0 && !this.isBomb;
  }

  setBomb() {
    this.isBomb = true;
  }

  reset() {
    this.isBomb = false;
    this.isOpen = false;
    this.isFlagged = false;
    this.toggleClass('flag', this.isFlagged);
    this.toggleClass('open', this.isOpen);
    this.toggleClass('bomb', this.isBomb);
    this.removeAttributes('data-bombs');
  }
}
