import { ParentRoutingModule } from './parent-routing.module';

describe('ParentRoutingModule', () => {
  let parentRoutingModule: ParentRoutingModule;

  beforeEach(() => {
    parentRoutingModule = new ParentRoutingModule();
  });

  it('should create an instance', () => {
    expect(parentRoutingModule).toBeTruthy();
  });
});
