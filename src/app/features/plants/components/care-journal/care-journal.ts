import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareService } from '../../services/care.service';
import { Care } from '../../interfaces/care.interface';

@Component({
  selector: 'app-care-journal',
  templateUrl: './care-journal.html',
  styleUrls: ['./care-journal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class CareJournalComponent implements OnInit {
  @Input() plantId!: number;
  cares: Care[] = [];
  loading = false;

  constructor(private careService: CareService) {}

  ngOnInit() {
    this.fetchCares();
  }

  fetchCares() {
    this.loading = true;
    this.careService.getCares().subscribe(cares => {
      this.cares = cares.filter(c => c.plantId === this.plantId);
      this.loading = false;
    });
  }
}
