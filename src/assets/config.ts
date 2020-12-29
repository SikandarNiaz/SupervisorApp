import { environment } from "src/environments/environment";

export const config = {
  // ip: "http://pngjba.rtdtradetracker.com/",
  // ip: "http://groomingba.rtdtradetracker.com/",
  // ip: "https://nflce.rtdtradetracker.com/",
  ip: "http://localhost:8080/CE/",
  // ip: 'http://192.168.0.101:8080/audit/',
  // ip: 'http://test1.concavetech.com/',
  // ip: "http://pmicensus.concavetech.com/",
  hash: environment.hash,
  main_logo: "assets/images/logo.png",
  login_theme_color: "green",
  login_logo: "assets/images/logoSmall.png",
  no_image: "assets/images/noimage.jpg",
};
