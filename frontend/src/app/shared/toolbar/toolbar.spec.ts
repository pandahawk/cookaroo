import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Toolbar} from './toolbar';
import {ActivatedRoute} from '@angular/router';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  let recipeServiceMock;
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>
  };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    }
    await TestBed.configureTestingModule({
      imports: [Toolbar],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
