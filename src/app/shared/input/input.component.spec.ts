import {fireEvent, render, screen} from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { InputComponent } from './input.component';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {user} from "@angular/fire/auth";

describe('InputComponent', () => {

  it('should create', async () => {
    const formControl = new FormControl();
    await render(InputComponent, {componentProperties: {
      control: formControl,
        placeholder: ''
      }, imports: [ReactiveFormsModule]});

    const input = screen.getByRole('textbox', {hidden: true});
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'test de saisie');
    expect(formControl.value).toBe('test de saisie');
  });
});
