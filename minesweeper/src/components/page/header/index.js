import BaseComponent from '../../../utils/base-component';
import './header.scss';
import content from './header.html';

const header = new BaseComponent({
  className: 'header',
  tag: 'header',
  content,
});

export default header;
