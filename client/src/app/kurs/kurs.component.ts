import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kurs } from 'app/_models/kurs';
import { KursService } from 'app/_services/kurs.service';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.css']
})
export class KursComponent implements OnInit {
  kurs!: Kurs

  constructor(private kursService: KursService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getKurs()
  }

  getKurs() {
    this.kursService.getKurs(this.route.snapshot.paramMap.get("id")!).subscribe(kurs => {//iz url izvlaci id
      this.kurs! = kurs
    })
  }
}
