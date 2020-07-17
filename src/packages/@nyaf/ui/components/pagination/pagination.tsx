import JSX, { CustomElement, Properties, BaseComponent, Events } from '@nyaf/lib';
require('./pagination.scss');

@CustomElement('ui-paginationitem')
@Properties<PaginationItemProps>({
  cls: '',
  className: '',
  title: '',
  data: null
}
@Events(['click'])
class PaginationItem extends BaseComponent<PaginationItemProps> {

  constructor() {
    super();
  }

  async render() {
    const { cls, className, title, data, index } = this.data;

    return (
      <li key={index} className={`page-item ${cls} ${className}`} data-index={index}>
        <a className={'page-link'} data-value={data}>{title}</a>
      </li>
    );
  }
}

interface PaginationItemProps {
  cls: '',
  className: '',
  title: '',
  data: null
}

@CustomElement('ui-pagination')
@Properties<PaginationProps>({
  total: 0,
  itemsPerPage: 0,
  current: 0,
  distance: 5,
  cls: '',
  className: '',
  prevTitle: 'Prev',
  nextTitle: 'Next',
  moreTitle: '...',
})
@Events(['click'])
export class Pagination extends BaseComponent<{}> {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  clickHandler(e) {
    const val = e.target.getAttribute('data-value');
    if (val) { this.props.onClick(val); }
  }

  addItem(title, data, className = '') {
    return (
      <PaginationItem title={title} className={className} data={data} />
    );
  }

  render() {
    const { cls, className, total, itemsPerPage, current, distance, prevTitle, nextTitle, moreTitle, onClick, ...props } = this.props;
    const pagesCount = parseInt(itemsPerPage) === -1 ? 1 : Math.ceil(total / itemsPerPage);
    const items = [];

    items.push(this.addItem(prevTitle, 'prev', `service prev-page ${current === 1 ? 'disabled' : ''}`));
    items.push(this.addItem(1, 1, current === 1 ? 'active' : ''));

    if (distance === 0 || pagesCount <= 7) {
      for (let i = 2; i < pagesCount; i++) {
        items.push(this.addItem(i, i, i === current ? 'active' : ''));
      }
    } else {
      if (current < distance) {
        for (let i = 2; i <= distance; i++) {
          items.push(this.addItem(i, i, i === current ? 'active' : ''));
        }
        if (pagesCount > distance) {
          items.push(this.addItem(moreTitle, null, 'no-link'));
        }
      } else if (current <= pagesCount && current > pagesCount - distance + 1) {
        if (pagesCount > distance) {
          items.push(this.addItem(moreTitle, null, 'no-link'));
        }
        for (let i = pagesCount - distance + 1; i < pagesCount; i++) {
          items.push(this.addItem(i, i, i === current ? 'active' : ''));
        }
      } else {
        items.push(this.addItem(moreTitle, null, 'no-link'));
        items.push(this.addItem(current - 1, current - 1));
        items.push(this.addItem(current, current, 'active'));
        items.push(this.addItem(current + 1, current + 1));
        items.push(this.addItem(moreTitle, null, 'no-link'));
      }
    }

    if (pagesCount > 1 || current < pagesCount) {
      items.push(this.addItem(pagesCount, pagesCount, current === pagesCount ? 'active' : ''));
    }

    items.push(this.addItem(nextTitle, 'next', `service next-page ${current === pagesCount ? 'disabled' : ''}`));

    return (
      <ul className={`pagination ${cls} ${className} ${total === 0 ? 'disabled' : ''}`} {...props} onClick={this.clickHandler}>
        {items.map((el, index) => {
          return React.cloneElement(el, {
            key: index,
            onClick: this.itemClick
          });
        })}
      </ul>
    );
  }
}

interface PaginationProps {
  total: number;
  itemsPerPage: number;
  current: number;
  distance: number;
  cls: string;
  className: string;
  prevTitle: string;
  nextTitle: string;
  moreTitle: string;
}
