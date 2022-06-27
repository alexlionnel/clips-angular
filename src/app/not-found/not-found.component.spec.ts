import {render, screen} from "@testing-library/angular";
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {

  it('should create', async () => {
    await render(NotFoundComponent);
    expect(screen.getByText('Page not found')).toBeDefined();
    expect(screen.getByRole('heading', {level: 2, hidden: true})).toBeDefined();
  });
});
