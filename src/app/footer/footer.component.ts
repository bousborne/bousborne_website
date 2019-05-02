import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../shared/email-service/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private http: HttpClient, private es: EmailService) { }

  onSendContactMessage(event, first_name, last_name, email_address, message_text) {
    console.log("Sending Message footer")
    const sendEmailData = {
      from: first_name + ' ' + last_name + '<' + email_address + '>',
      to: 'bousborne@gmail.com',
      subject: first_name + ' ' + last_name + '<' + email_address + '> is contacting you from BenOusborne.com',
      text: message_text
    };
    this.es.sendEmail(sendEmailData);
  }

  ngOnInit() {
  }

}
