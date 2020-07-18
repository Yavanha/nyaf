import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-buttongroup')
export class GuideButtonGroup extends BaseComponent<{}> {

  async render() {
    const codeImport = `import {ButtonGroup} from "metro4-react";`;
    const codeUsing = `
            <ButtonGroup>
                <Button title="1"/>
                <Button title="2"/>
                <Button title="3"/>
            </ButtonGroup>

            <ButtonGroup radio="true">
                <Button title="1"/>
                <Button title="2"/>
                <Button title="3"/>
            </ButtonGroup>
        `;

    const tablePropsBody = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['active', '1', 'Number of active button by default, must by int or array of int'],
      ['clsActive', 'active', 'Class for active button'],
      ['clsButton', 'null', 'Additional class for buttons'],
      ['onButtonClick', '()=>{}', 'Callback for button click event, callback receive a button React element'],
    ];

    return await (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>ButtonGroup</h1>

        <p className={'text-leader2'}>
          Group buttons using ButtonGroup component.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          You can group buttons using component <code>ButtonGroup</code> and set switch mode: <code>check</code> or <code>radio</code>.
                </p>
        <demo-example>
          <Row>
            <Cell cls='cell-md-6'>
              <ButtonGroup>
                <Button title='1' />
                <Button title='2' />
                <Button title='3' />
              </ButtonGroup>
            </Cell>
            <Cell cls='cell-md-6'>
              <ButtonGroup radio={true}>
                <Button title='1' />
                <Button title='2' />
                <Button title='3' />
              </ButtonGroup>
            </Cell>
          </Row>
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

        <br />
      </demo-article>
    );
  }
}
