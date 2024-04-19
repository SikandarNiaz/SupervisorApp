import { environment } from "src/environments/environment";

export class Config {
  // ip: "https://png.rtdtradetracker.com/",
  // ip: "http://localhost:8080/audit/";
  //  ip: 'http://pg.concavetech.com/',
  // ip: "http://pghanger.concavetech.com/",
   public static BASE_URI = window.location.origin + "/";
 // public static BASE_URI = "http://pgrdt.concavetech.com/";
  // public static BASE_URI = "http://pguae.concavetech.com/";
 // public static BASE_URI = "http://pngiba.concavetech.com/";
 // public static BASE_URI = "http://tapalsurvey.concavetech.com/";
 //  public static BASE_URI = "http://rural.concavetech.com/";
  // public static BASE_URI = "http://localhost:8080/CE/";
  // public static BASE_URI = "http://daladansm.concavetech.com/";
//  public static BASE_URI = "http://groomingba.rtdtradetracker.com//";
  // public static BASE_URI = "http://nflce.concavetech.com/";
  // public static BASE_URI = "http://samsungba.concavetech.com//";
 // public static BASE_URI = "http://daldaba.concavetech.com//";
//  public static BASE_URI = "http://pilotba.concavetech.com//";
//public static BASE_URI = "https://pmitraining.rtdtradetracker.com//";
// public static BASE_URI = "http://ndnba.concavetech.com//";
  // public static BASE_URI = "http://reckittcensus.concavetech.com//";

  public static hash = environment.hash;
  public static main_logo = "assets/images/logo.png";
  public static login_theme_color = "green";
  public static login_logo = "assets/images/logoSmall.png";
  public static no_image = "assets/images/noimage.jpg";
  public static API_KEY = "AIzaSyDg9N44ZNw6gWSfxbsXqw5ONyEiWfL_jEY";
  // public static MAPBOX_TOKEN =
  //   "pk.eyJ1IjoiaGFsZWViY29uY2F2ZXRlY2hjb20iLCJhIjoiY2xpbjF0cnA3MHFjMDNrcGNidHdyZngzZiJ9.8J-Ge14qfoHmbkzIHL5ofg";
}
