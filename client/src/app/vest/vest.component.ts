import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vest } from 'app/_models/vest';
import { VestService } from 'app/_services/vest.service';

@Component({
  selector: 'app-vest',
  templateUrl: './vest.component.html',
  styleUrls: ['./vest.component.css']
})
export class VestComponent implements OnInit {
  vesti!: Vest[]

  constructor(private vestService: VestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllVestiByKursId()
  }

  getAllVestiByKursId() {
    return this.vestService.getVestiByKursId(Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.vesti = response
        console.log(this.vesti)
      }, err => console.log(err))
  }

}
