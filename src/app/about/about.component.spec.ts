import {render} from "@testing-library/angular";
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {

  it('should create', async () => {
    const {container} = await render(AboutComponent)
    expect(container).toBeTruthy();
  });
});
