import { environment } from 'src/environments/environment';

export const config = {
    // ip: 'http://pmi.concavetech.com/',
    ip: 'http://localhost:8080/CE/',
  // ip: 'http://192.168.0.101:8080/audit/',
  hash: environment.hash,
  main_logo: 'assets/images/logo.png',
  login_theme_color: 'green',
  login_logo: 'assets/images/logoSmall.png'

};
