import { environment } from "src/environments/environment";

export class Config {
  // ip: "https://png.rtdtradetracker.com/",
  // ip: "http://localhost:8080/audit/",
  //  ip: 'http://pg.concavetech.com/',
  // ip: "http://pghanger.concavetech.com/",
   public static BASE_URI = window.location.origin + "/";
  // public static BASE_URI = "https://pgrdt.concavetech.com/";
  // public static BASE_URI = "http://localhost:8080/CE/";
  public static hash = environment.hash;
  public static main_logo = "assets/images/logo.png";
  public static login_theme_color = "green";
  public static login_logo = "assets/images/logoSmall.png";
  public static no_image = "assets/images/noimage.jpg";
}
