import JSX, { BaseComponent, LifeCycle, CustomElement } from '@nyaf/lib';
import { Display, Hidden, to, IModel, ModelBinder, ViewModel, ValueBindingHandler } from '@nyaf/forms';
import { ContactModel } from './models/contact.model';

export class FormModel {
  @Hidden()
  id = 0;
  @Display('User Name')
  userName = '';
  @Display('User City')
  city = '';
}

/**
 * Simple event handling.
 */
@CustomElement('app-form')
@ViewModel(FormModel, {
  handler: { 'value': new ValueBindingHandler() }
})
export class FormComponent<T extends FormModel> extends BaseComponent<{}> implements IModel<T> {

  readonly model: ModelBinder<T>;

  constructor() {
    super();
  }

  async render() {
    return await (
      <>
        <form>
          <div class='form-group'>
            <label for='username'>Name</label>
            <input class='form-control' n-bind={to<T, HTMLInputElement>(e => e.userName, 'value')} id='username' />
          </div>
          <div class='form-group'>
            <label for='city'>City</label>
            <input class='form-control' n-bind={to<T, HTMLInputElement>(e => e.city, 'value')} id='city' />
          </div>
          <div class='alert alert-secondary'>
            The user '<span n-bind={to<T>(e => e.userName, 'innerText')} />' comes from '<span n-bind={to<T>(e => e.city, 'innerText')} />'.
          </div>
          <button class='btn btn-sm btn-primary' type='button' n-on-click={e => this.save(e)}>
            Save
          </button>
          <app-sub-form id='subForm' n-bind={to<T, SubFormComponent>(e => e.userName, 'value')}>Not yet loaded...</app-sub-form>
          <hr />
        </form>
      </>
    );
  }

  save(e) {
    this.querySelector<SubFormComponent>('#subForm').value = 'Button click in sub form';
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      // presets
      this.model.scope.id = 1;
      this.model.scope.userName = 'Doris Demo';
      this.model.scope.city = 'Denver';
      this.querySelector<SubFormComponent>('#subForm').value = 'Sub form loaded';
    }
  }

}

export class SubFormModel {
  value = '';
}

@CustomElement('app-sub-form')
@ViewModel(SubFormModel)
export class SubFormComponent<T extends SubFormModel = SubFormModel> extends BaseComponent<T> implements IModel<T> {

  readonly model: ModelBinder<T>;

  constructor() {
    super();
  }

  async render() {
    return await (
      <div>
        <h5>Sub Form Binding</h5>
        <span n-bind={to<T>(e => e.value, 'innerText')} ></span>
      </div>
    );
  }

  public set value(value: string) {
    this.model.scope.value = value;
  }

  public get value(): string {
    return this.model.scope.value;
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      console.log('Sub Form  Load');
    }
  }

}
