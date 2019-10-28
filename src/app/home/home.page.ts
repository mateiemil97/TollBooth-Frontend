import { Component, OnInit } from '@angular/core';
import { PaymentService } from './Services/payment.service';
import { Category } from '../Models/Category';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../Location/services/location.service';
import { Price } from '../Models/Price';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Incomes } from '../Models/Incomes';
import { async } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public categories$: Category;
  public slectedCategory: Category;
  private locationId;
  public price: Price = new Price();
  public location;
  public paymentInformationForPost: Incomes;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    public locationService: LocationService,
    public alertController: AlertController,
    public incomeService: PaymentService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.paymentService.GetCategories().subscribe(res => {
      console.log(res);
      this.categories$ = res;
    });

    // tslint:disable-next-line: radix
    this.locationId = parseInt(this.route.snapshot.queryParamMap.get('locationid'));
    console.log(this.locationId);

    this.locationService.GetLocation(this.locationId).subscribe(res => this.location = res);

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Make mpayment',
      message: 'Are you sure you want to make this payment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.MakePayment();
          }
        }
      ]
    });

    await alert.present();
  }

  MakePayment() {
    const payment = {
      // tslint:disable-next-line: radix
      locationId: parseInt(this.route.snapshot.queryParamMap.get('locationid')),
      // tslint:disable-next-line: radix
      tollboothId: parseInt(this.route.snapshot.queryParamMap.get('tollboothid')),
      datetime: new Date(),
      employeeId: 1,
      amount: this.price[0].price
    };
    this.incomeService.MakePayment(payment).subscribe(
      () => {

      },
      async (error) => {
          const toast = await this.toastController.create({
            message: 'Payment failed. Please try again',
            duration: 2000
          });
          toast.present();
        },
      async () => {
        const toast = await this.toastController.create({
          message: 'Payment has been succefully',
          duration: 2000
        });
      }
    );
  }

  onChange($event) {
    this.paymentService.GetPrice(this.locationId, this.slectedCategory.id).subscribe((res: Price) => {
      this.price = res;
      console.log(this.price[0].price);
    });
  }
}
