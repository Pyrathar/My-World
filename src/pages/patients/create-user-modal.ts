import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, NavParams, ViewController } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";
import { AvatarUrl, Patient } from "../../models";

@Component({
  templateUrl: "create-user-modal.html",
})
export class CreateUserModal implements OnInit {
  // avatar: AvatarUrl = AvatarUrl.afro_boy;
  private editMode = false;
  private selectedAvatarIndex = 0;
  private patientAvatar = "/afro_boy.png";
  private currentPatient: Patient = null;
  private createPatientForm: FormGroup;

  constructor(
    private db: DatabaseNoSQL,
    private formBuilder: FormBuilder,
    private params: NavParams,
    private viewCtrl: ViewController,
  ) {}

  // getAvatar(): string {
  //   switch (this.avatar) {
  //     case AvatarUrl.afro_boy: return 'assets/img/person/afro_boy.png';
  //     case AvatarUrl.afro_girl: return 'assets/img/person/afro_girl.png';
  //     case AvatarUrl.asian_boy: return 'assets/img/person/asian_boy.png';
  //     case AvatarUrl.asian_girl: return 'assets/img/person/asian_girl.png';
  //     case AvatarUrl.caucasis_boy: return 'assets/img/person/caucasis_boy.png';
  //     case AvatarUrl.caucasis_girl: return 'assets/img/person/caucasis_girl.png';
  //     case AvatarUrl.ginger_boy: return 'assets/img/person/ginger_boy.png';
  //     case AvatarUrl.mid_east_boy: return 'assets/img/person/mid_east_boy.png';
  //     case AvatarUrl.mid_east_girl: return 'assets/img/person/mid_east_girl.png';
  //   }
  // }

  public ngOnInit() {
    this.createPatientForm = this.formBuilder.group({
      name: ["", Validators.required ],
    });
  }

  private ionViewWillLoad() {
    this.currentPatient = this.params.get("patient");
    if (this.currentPatient !== undefined) {
      this.editMode = true;
      this.selectedAvatarIndex = this.db.C.AVATARS.map((x) => x.imgUrl).indexOf(this.currentPatient.avatar);
      this.patientAvatar = this.currentPatient.avatar;
    } else {
      this.editMode = false;
    }
  }

  private savePatient() {

    const patientName = this.createPatientForm.controls.name.value;

    this.db.addPatient(new Date().getTime(), patientName, this.patientAvatar);

    this.createPatientForm.reset();
    this.closeModal();
  }

  private editPatient() {
    this.currentPatient.name = this.createPatientForm.controls.name.value;
    this.currentPatient.avatar = this.patientAvatar;
    this.closeModal();
    this.db.save("patients", this.db.patients);
  }

  private selectAvatar(i: number, imgUrl: string) {
    this.selectedAvatarIndex = i;
    this.patientAvatar = imgUrl;
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
