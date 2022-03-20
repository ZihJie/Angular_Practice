import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person, SearchService } from '../shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  person!: Person;
  sub!: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: SearchService) {

  }
  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.service.get(id).subscribe(person => {
        if (person) {
          this.person = person;
        } else {
          this.gotoList();
        }
      });
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  async cancel() {
    await this.router.navigate(['/search']);
  }
  async save() {
    this.service.save(this.person);
    await this.gotoList();
  }
  gotoList() {
    if (this.person) {
    this.router.navigate(['/search', {term: this.person.name} ]);
    } else {
    this.router.navigate(['/search']);
    }
  }
}

