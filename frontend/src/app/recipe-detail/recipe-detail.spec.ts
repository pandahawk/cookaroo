import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetail } from './recipe-detail';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              // what your component uses: this.route.snapshot.paramMap.get('id')
              paramMap: convertToParamMap({ id: 'test-id' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
