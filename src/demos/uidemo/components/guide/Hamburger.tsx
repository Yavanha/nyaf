import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-hamburger')
export class GuideHamburger extends BaseComponent<{}> {

  constructor() {
    super();
    this.state = {
      hamburgerState: false
    };
    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  toggleHamburger() {
    this.setState({
      hamburgerState: !this.state.hamburgerState
    });
  }

  render() {
    const { hamburgerState } = this.state;
    const codeImport = `import {Hamburger} from "metro4-react";`;
    const codeUsing = `
            <Hamburger/>
            <Hamburger theme="dark"/>
            <Hamburger variant="arrow-left" active="true"/>
        `;

    const tablePropsBody = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['variant', 'menu-down', 'Hamburger transform variant: <code>menu-down</code>, <code>menu-up</code>, <code>arrow-left</code>, <code>arrow-right</code>'],
      ['theme', 'light', 'Color theme: <code>light</code>, <code>dark</code>'],
      ['active', 'false', 'Hamburger state'],
      ['onClick', '()=>{}', 'Hamburger click event callback'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Hamburger</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          <code>Hamburger</code> is a special type of button to show and toggle open/close state of any components, example - <code>AppBar</code>.
                    This button can transform from one state to any.
                </p>
        <demo-example>
          <AppBar cls={'pos-relative z-dropdown'} hamburgerColor={'dark'} expandPoint={null}>
            <AppBarItem isBrand={true} name={'Metro 4 for React'} />
            <AppBarMenu cls={'ml-auto'} >
              <li><a href={'#'}>Home</a></li>
              <li><a href={'#'}>Documentation</a></li>
              <li><a href={'#'}>GitHub</a></li>
            </AppBarMenu>
          </AppBar>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUsing} />

        <br />
        <h4>Props</h4>
        <Table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />
        <h4>Hamburger themes</h4>
        <demo-example>
          <Row>
            <Cell cls='cell-md-6 bg-dark'>
              <Hamburger />
              <span className='fg-white ml-4'>Theme <code>light</code> (default)</span>
            </Cell>
            <Cell cls='cell-md-6'>
              <Hamburger theme='dark' />
              <span className='ml-4'>Theme <code>dark</code></span>
            </Cell>
          </Row>
        </demo-example>

        <br />
        <h4>Hamburger variants</h4>
        <demo-example>
          <Row>
            <Cell cls='cell-md-6'>
              <Button onClick={this.toggleHamburger} title='Toggle Hamburger' />
            </Cell>
            <Cell cls='cell-md-6'>
              <Hamburger variant='arrow-left' active={hamburgerState} theme='dark' />
              <Hamburger variant='arrow-right' active={hamburgerState} theme='dark' />
              <Hamburger variant='menu-down' active={hamburgerState} theme='dark' />
              <Hamburger variant='menu-up' active={hamburgerState} theme='dark' />
            </Cell>
          </Row>
        </demo-example>

        <br />

        <br />
      </demo-article>
    );
  }
}
