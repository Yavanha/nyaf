import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/test/main.component';
import { TabsComponent } from './components/test/tabs.component';
import { TabComponent } from './components/test/tab.component';
import { SlotTabsComponent } from './components/test/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/test/slottedtabs/tab.component';
import { ButtonComponent } from './components/test/button.component';
import { SlottedComponent } from './components/test/slotted.component';
import { AboutComponent } from './components/test/pages/about.component';
import { DemoComponent } from './components/test/pages/demo.component';
import { DesignDemoComponent } from './components/test/pages/designdemo.component';
import { ContactComponent } from './components/test/pages/contact.component';
import { CounterComponent } from 'components/test/counter.component';
import { StoreCounterComponent } from './components/test/storecounter.component';
import { ServiceCounterComponent } from './components/test/servicecounter.component';
import { HomeComponent } from 'components/test/pages/home.component';
import { DocuComponent } from 'components/test/pages/docu.component';
import { ButtonsComponent } from 'components/test/buttons.component';
import { FormComponent } from 'components/test/form.component';
import { ComplexComponent } from 'components/test/complex.component';
import { ComplexBoolComponent } from 'components/test/complexbool.component';
import { RouterComponent } from 'components/test/router/router.component';
import { Page1Component } from 'components/test/router/page1.component';
import { Page2Component } from 'components/test/router/page2.component';
import { Page3Component } from 'components/test/router/page3.component';
import { RepeaterTestComponent } from 'components/test/repeater.component';

import { ButtonExpander } from 'components/expander/button.expander';

import './main.scss';

const routes: Routes = {
  '/': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/designdemo': { component: DesignDemoComponent },
  '/router': { component: RouterComponent },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/sc1': { component: StoreCounterComponent, outlet: 'other', forced: true },
  '/sc2': { component: StoreCounterComponent, outlet: 'other', forced: true },
  '/contact': { component: ContactComponent }
};

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    MainComponent,
    ButtonComponent,
    ButtonsComponent,
    SlottedComponent,
    TabComponent,
    TabsComponent,
    SlotTabComponent,
    SlotTabsComponent,
    ContactComponent,
    AboutComponent,
    DemoComponent,
    DesignDemoComponent,
    CounterComponent,
    StoreCounterComponent,
    ServiceCounterComponent,
    HomeComponent,
    DocuComponent,
    FormComponent,
    ComplexComponent,
    ComplexBoolComponent,
    RouterComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    RepeaterTestComponent
  ],
  expanders: [
    ButtonExpander
  ],
  // register for router
  routes: routes
});
