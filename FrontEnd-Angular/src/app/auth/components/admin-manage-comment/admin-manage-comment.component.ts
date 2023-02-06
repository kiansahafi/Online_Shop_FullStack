import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/alert';
import { AdminProductService } from 'src/app/Services/admin-product.service';

@Component({
  selector: 'app-admin-manage-comment',
  templateUrl: './admin-manage-comment.component.html',
  styleUrls: ['./admin-manage-comment.component.scss'],
})
export class AdminManageCommentComponent implements OnInit {
  constructor(
    private adminProductService: AdminProductService,
    private alert: AlertService
  ) {}

  comments: any[] = [];

  ngOnInit(): void {
    this.adminProductService.getComments().subscribe((res: any) => {
      this.comments = res.comments;
    });
  }

  verifyComment(CommentId: string) {
    this.adminProductService.verifyComment(CommentId).subscribe((res: any) => {
      this.alert.showSnackbar(
        'Your order have been submitted! Thanks You For Chosing Us!😁',
        'SUCCESS',
        4000
      );
    });
  }
}
