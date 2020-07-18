import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-shortcut')
export class GuideShortcut extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Shortcut} from "metro4-react";`;
    const codeUse = `<Shortcut icon="rocket" title="Rocket"/>`;
    const codeUse2 = `<Shortcut image="../images/location.png" title="Location"/>`;
    const codeUse3 = `
            <Shortcut
                icon="windows"
                cls="alert"
                title="Windows"
                badge={10}
                clsBadge="bg-white fg-dark"/>`;
    const codeUse4 = `
            <Shortcut as="a"
                href="#"
                icon="windows"
                cls="success"
                title="Anchor"
                badge={10}/>`;

    const tablePropsData = [
      ['<code>as</code>', '<code>button</code>', 'Semantic element'],
      ['<code>title</code>', '', 'Button title'],
      ['<code>badge</code>', '<code>null</code>', 'Button badge value'],
      ['<code>icon</code>', '<code>null</code>', 'Button icon from icon font'],
      ['<code>iconPrefix</code>', '<code>mif-</code>', 'Button icon prefix'],
      ['<code>image</code>', '<code>null</code>', 'Button icon image'],
      ['<code>cls</code>', '', 'Button additional classes'],
      ['<code>className</code>', '', 'Button additional classes'],
      ['<code>clsTitle</code>', '', 'Button additional classes for title'],
      ['<code>clsIcon</code>', '', 'Button additional classes for icon'],
      ['<code>clsBadge</code>', '', 'Button additional classes for badge'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Shortcut</h1>

        <p className={'text-leader2'}>
          If you need to create shortcut button, you can use Shortcut component from Metro 4.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <Shortcut icon='rocket' title='Rocket' />
                    &nbsp;<Shortcut icon='share' title='Share' cls='info' />
                    &nbsp;<Shortcut icon='share' cls='warning no-caption' />
                    &nbsp;<Shortcut icon='windows' cls='alert' title='Windows' badge={10} clsBadge='bg-white fg-dark' />
                    &nbsp;<Shortcut as='a' href='#' icon='windows' cls='success' title='Anchor' badge={10} />
                    &nbsp;<Shortcut image='../images/location.png' title='Location' />
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <Table className='table-border cell-border' head={tablePropsHeader} body={tablePropsData} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUse} />
        <demo-prismcode language='js' code={codeUse2} />
        <demo-prismcode language='js' code={codeUse3} />
        <demo-prismcode language='js' code={codeUse4} />

        <br />

        <br />
      </demo-article>
    );
  }
}
