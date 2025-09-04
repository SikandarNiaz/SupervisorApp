import {
  Component,
  OnInit,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { environment } from "src/environments/environment";
import { Config } from "src/assets/config";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EvaluationService } from "../evaluation.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { KeyValuePipe } from "@angular/common";

@Component({
  selector: "section-three-view",
  templateUrl: "./section-three-view.component.html",
  styleUrls: ["./section-three-view.component.scss"],
})
export class SectionThreeViewComponent implements OnInit {
  @Input("data") data;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @Output("showModal") showModal: any = new EventEmitter<any>();
  @Input("isEditable") isEditable: any;

  selectedShop: any = {};
  selectedImage: any = {};
  ip: any = Config.BASE_URI;
  hover = "hover";
  zoomOptions = {
    Mode: "hover",
  };
  zoomedImage =
    "https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg";
  formData: any;
  availability: any;
  changeColor: boolean;
  updatingMSL: boolean;
  selectedProduct: any = {};
  colorUpdateList: any = [];
  selectedSku: any;
  surveyId: any;
  evaluatorId: any;
  projectType: any;
  MSLCount = 0;
  loadingData: boolean;
  loading = false;
  MSLNAvailabilityCount: number;
  facing: any;
  totalDesiredFacing: any;
  newChild: "Y"

  // ✅ Child questions for Q304 (hardcoded)
  childQuestions = [
    {
      fieldId: 305,
      question: "BRAND 1",
      fieldType: "spinner",
    optionList: [
  { id: 2026, title: "NO BRAND" },
  { id: 1280, title: "252" },
  { id: 1281, title: "555" },
  { id: 1282, title: "1970" },
  { id: 1283, title: "111 PREMIUM" },
  { id: 1284, title: "A&B" },
  { id: 1285, title: "ABC" },
  { id: 1286, title: "ADDRESS" },
  { id: 1287, title: "Affair Nano" },
  { id: 1288, title: "AFINA" },
  { id: 1289, title: "AKHTAMAR" },
  { id: 1290, title: "AL MAKHLOUF" },
  { id: 1291, title: "ALSTER" },
  { id: 1292, title: "AMERICAN" },
  { id: 1293, title: "ARMMANI" },
  { id: 1294, title: "AROMA" },
  { id: 1295, title: "ASHFORD" },
  { id: 1296, title: "ASHIMA" },
  { id: 1297, title: "ASHIMA LUXURY" },
  { id: 1298, title: "ASIA" },
  { id: 1299, title: "ASIA KING" },
  { id: 1300, title: "ASSOS" },
  { id: 1301, title: "ASSPREN" },
  { id: 1302, title: "ATTIMO" },
  { id: 1303, title: "AVALON" },
  { id: 1304, title: "B&H" },
  { id: 1305, title: "BAHMAN" },
  { id: 1306, title: "BARTON" },
  { id: 1307, title: "BASIO" },
  { id: 1308, title: "BENSTON" },
  { id: 1309, title: "BEST MAN" },
  { id: 1310, title: "BESTMAN" },
  { id: 1311, title: "BISON" },
  { id: 1312, title: "BLACK" },
  { id: 1313, title: "BLACK DEVIL" },
  { id: 1314, title: "BLACK JACK" },
  { id: 1315, title: "BLACK MOUNT" },
  { id: 1316, title: "BLUE" },
  { id: 1317, title: "BOLTON" },
  { id: 1318, title: "BON" },
  { id: 1319, title: "BONUS" },
  { id: 1320, title: "BRASS" },
  { id: 1321, title: "BRITTOSH" },
  { id: 1322, title: "BUSINESS" },
  { id: 1323, title: "BUSINESS CLUB" },
  { id: 1324, title: "BUSINESS KINGS" },
  { id: 1325, title: "BUSINESS MORE" },
  { id: 1326, title: "BUSINESS ROYAL" },
  { id: 1327, title: "Camel" },
  { id: 1328, title: "CANAL" },
  { id: 1329, title: "CAPITAL" },
  { id: 1330, title: "CAPTAIN" },
  { id: 1331, title: "CAPTAIN BLACK" },
  { id: 1332, title: "Casino" },
  { id: 1333, title: "CAVALLO" },
  { id: 1334, title: "C-ENTRO" },
  { id: 1335, title: "CHECK" },
  { id: 1336, title: "CHUNGHWA" },
  { id: 1337, title: "CIMA" },
  { id: 1338, title: "CLEOPATRA" },
  { id: 1339, title: "CODE" },
  { id: 1340, title: "CODERED" },
  { id: 1341, title: "CONGRESS" },
  { id: 1342, title: "CONINO" },
  { id: 1343, title: "CONRAD" },
  { id: 1344, title: "CORSAIR" },
  { id: 1345, title: "CORSET" },
  { id: 1346, title: "COUNSELLOR" },
  { id: 1347, title: "COURT" },
  { id: 1348, title: "CRAVEN" },
  { id: 1349, title: "CROME" },
  { id: 1350, title: "D" },
  { id: 1351, title: "D&J" },
  { id: 1352, title: "DAVIDOFF" },
  { id: 1353, title: "DAVIDOFF ONE" },
  { id: 1354, title: "DEAL" },
  { id: 1355, title: "DEER" },
  { id: 1356, title: "DENIM" },
  { id: 1357, title: "Desert" },
  { id: 1358, title: "DEVAA" },
  { id: 1359, title: "D-GI" },
  { id: 1360, title: "DORCHESTER" },
  { id: 1361, title: "DOUBLE" },
  { id: 1362, title: "DUNHILL" },{ id: 1363, title: "EIGHTY" }, { id: 1364, title: "ELEGANCE" }, { id: 1365, title: "ELYSEE" }, { id: 1366, title: "EMPIRE ROYALS" },
  { id: 1367, title: "ENGLISHMAN" }, { id: 1368, title: "ESSE" }, { id: 1369, title: "EUROPE" }, { id: 1370, title: "EVAAN" },
  { id: 1371, title: "Excellency" }, { id: 1372, title: "FALCON" }, { id: 1373, title: "FAMOUS" }, { id: 1374, title: "FARSTAR" },
  { id: 1375, title: "FAST" }, { id: 1376, title: "FIM" }, { id: 1377, title: "FINE" }, { id: 1378, title: "FISHER" },
  { id: 1379, title: "FLEKE" }, { id: 1380, title: "FORCE" }, { id: 1381, title: "FORMAN" }, { id: 1382, title: "FORUM" },
  { id: 1383, title: "GALA" }, { id: 1384, title: "Galaxy" }, { id: 1385, title: "GEM" }, { id: 1386, title: "General" },
  { id: 1387, title: "GIFT" }, { id: 1388, title: "GLORY" }, { id: 1389, title: "GLX" }, { id: 1390, title: "GM" },
  { id: 1391, title: "Gold" }, { id: 1392, title: "GOLD LEAF" }, { id: 1393, title: "GOLD LINE" }, { id: 1394, title: "GOLD MOUNT" },
  { id: 1395, title: "GOLD SEAL" }, { id: 1396, title: "GOLDEN" }, { id: 1397, title: "Golden Bird" }, { id: 1398, title: "GOLDEN DEER" },
  { id: 1399, title: "GOLDEN LEAF" }, { id: 1400, title: "GOLDMANS" }, { id: 1401, title: "GOLDMOND" }, { id: 1402, title: "Goldstreet" },
  { id: 1403, title: "GRAND MARK" }, { id: 1404, title: "GRIP" }, { id: 1405, title: "GS" }, { id: 1406, title: "GT" },
  { id: 1407, title: "GT SMART" }, { id: 1408, title: "GUDANG" }, { id: 1409, title: "H&P" }, { id: 1410, title: "H-10" },
  { id: 1411, title: "HATMAN" }, { id: 1412, title: "HD GOLDEN" }, { id: 1413, title: "HI FLAG" }, { id: 1414, title: "HI-LITE" },
  { id: 1415, title: "HILLS" }, { id: 1416, title: "HOMA" }, { id: 1417, title: "HP" }, { id: 1418, title: "HUNTER" },
  { id: 1419, title: "HUQA" }, { id: 1420, title: "INHALE" }, { id: 1421, title: "Inspiro" }, { id: 1422, title: "JAISALMAR" },
  { id: 1423, title: "JET" }, { id: 1424, title: "JIM" }, { id: 1425, title: "JINLING" }, { id: 1426, title: "JK" },
  { id: 1427, title: "JOKEY" }, { id: 1428, title: "JUNE" }, { id: 1429, title: "Jupiter" }, { id: 1430, title: "KAREENA" },
  { id: 1431, title: "KARELIA" }, { id: 1432, title: "KENMORE" }, { id: 1433, title: "Kent" }, { id: 1434, title: "KENTUCKY" },
  { id: 1435, title: "KING" }, { id: 1436, title: "KINGDOM" }, { id: 1437, title: "KINGSMAN" }, { id: 1438, title: "KINN" },
  { id: 1439, title: "KISS" }, { id: 1440, title: "L" }, { id: 1441, title: "L&M" }, { id: 1442, title: "LANDUS" },
  { id: 1443, title: "LARC DT" }, { id: 1444, title: "LAVA" }, { id: 1445, title: "LAWRENCE" }, { id: 1446, title: "LEGATE" },
  { id: 1447, title: "LEGEND" }, { id: 1448, title: "LEGENDS" }, { id: 1449, title: "LIGHT" }, { id: 1450, title: "LIPS" },
  { id: 1451, title: "LONDON" }, { id: 1452, title: "LONGHORN" }, { id: 1453, title: "LORD" }, { id: 1454, title: "LUCKY STRIKE" },
  { id: 1455, title: "LUXURY" }, { id: 1456, title: "M&J" }, { id: 1457, title: "M.D" }, { id: 1458, title: "M1" },
  { id: 1459, title: "M7" }, { id: 1460, title: "M9" }, { id: 1461, title: "MAC" }, { id: 1462, title: "MACBETH" },
  { id: 1463, title: "MACLION" }, { id: 1464, title: "MAIWAND" }, { id: 1465, title: "MANAGER" }, { id: 1466, title: "MANCHESTER" },
  { id: 1467, title: "MANCHESTER UNITED" }, { id: 1468, title: "MANHATTEN" }, { id: 1469, title: "Manta" }, { id: 1470, title: "MARBLE" },
  { id: 1471, title: "MARGIN" }, { id: 1472, title: "MARI GOLD" }, { id: 1473, title: "MARK" }, { id: 1474, title: "MARLBLE DELUXE" },
  { id: 1475, title: "MARLBORO" }, { id: 1476, title: "MARQUESE" }, { id: 1477, title: "Marshal" }, { id: 1478, title: "Max" },
  { id: 1479, title: "MAXICO" }, { id: 1480, title: "MAYBURY" }, { id: 1481, title: "MAYOR" }, { id: 1482, title: "MCLION" },
  { id: 1483, title: "MEDLEY" }, { id: 1484, title: "MEHR" }, { id: 1485, title: "MEMPHIS" }, { id: 1486, title: "MIAMI" },
  { id: 1487, title: "MIKADO" }, { id: 1488, title: "MILANO" }, { id: 1489, title: "MILD" }, { id: 1490, title: "MILFORD" },
  { id: 1491, title: "Millionair" }, { id: 1492, title: "MILTON" }, { id: 1493, title: "MM" }, { id: 1494, title: "MODERN" },
  { id: 1495, title: "Modern Slim" }, { id: 1496, title: "MODES" }, { id: 1497, title: "MODEST" }, { id: 1498, title: "MOHAWK" },
  { id: 1499, title: "MOMENTO" }, { id: 1500, title: "MOND" }, { id: 1501, title: "MONTERO" }, { id: 1502, title: "MORE" },
  { id: 1503, title: "MORE MENTHOL" }, { id: 1504, title: "MURAD BLACK" }, { id: 1505, title: "NAPOLI" }, { id: 1506, title: "NASHVILLE" },
  { id: 1507, title: "NATIVE" }, { id: 1508, title: "NAVY" }, { id: 1509, title: "NERO" }, { id: 1510, title: "NEW" },
  { id: 1511, title: "NINE NINE" }, { id: 1512, title: "NISE" }, { id: 1513, title: "NORTON" }, { id: 1514, title: "OFFERS" },
  { id: 1515, title: "OKI" }, { id: 1516, title: "OMEGA" }, { id: 1517, title: "Omega Aqua" }, { id: 1518, title: "OPAL" },
  { id: 1519, title: "ORIGINAL" }, { id: 1520, title: "ORIS" }, { id: 1521, title: "ORIS PANDA" }, { id: 1522, title: "Oris Slims" },
  { id: 1523, title: "OSCAR" }, { id: 1524, title: "OSCAR CHOCOLATE" }, { id: 1525, title: "P&S" }, { id: 1526, title: "PACIFIC" },
  { id: 1527, title: "PALL" }, { id: 1528, title: "Palomo" }, { id: 1529, title: "PANAMA" }, { id: 1530, title: "PARAN" },
  { id: 1531, title: "PARIS" }, { id: 1532, title: "PARK" }, { id: 1533, title: "PEACH" }, { id: 1534, title: "PEEL" },
  { id: 1535, title: "PINE" }, { id: 1536, title: "PIRU" }, { id: 1537, title: "PLATIEN" }, { id: 1538, title: "PLATINUM" },
  { id: 1539, title: "PLEASURE" }, { id: 1540, title: "PREMIUM" }, { id: 1541, title: "PRESIDENT" }, { id: 1542, title: "PRIDE" },
  { id: 1543, title: "PRIMARY" }, { id: 1544, title: "PRINCE" }, { id: 1545, title: "Private" }, { id: 1546, title: "R.G.D" },
  { id: 1547, title: "RABON" }, { id: 1548, title: "RAISON" }, { id: 1549, title: "RAISON BLACK" }, { id: 1550, title: "Raquel" },
  { id: 1551, title: "RED" }, { id: 1552, title: "REDS" }, { id: 1553, title: "REGAL" }, { id: 1554, title: "REGINA" },
  { id: 1555, title: "REINO" }, { id: 1556, title: "RELAX" }, { id: 1557, title: "RICHMAN" }, { id: 1558, title: "RICHMAN ROYAL" },
  { id: 1559, title: "RIO" }, { id: 1560, title: "ROBIN" }, { id: 1561, title: "Robin Rrost Rush" }, { id: 1562, title: "ROCCO" },
  { id: 1563, title: "ROCKY" }, { id: 1564, title: "RODOPI-01" }, { id: 1565, title: "ROGER" }, { id: 1566, title: "ROSEMAN" },
  { id: 1567, title: "ROTHMANS" }, { id: 1568, title: "ROVER" }, { id: 1569, title: "ROXBORO" }, { id: 1570, title: "ROYAL" },
  { id: 1571, title: "Royal Club" }, { id: 1572, title: "ROYAL MAGIC" }, { id: 1573, title: "ROYALS" }, { id: 1574, title: "Ruby" },
  { id: 1575, title: "RUBY SUPER" }, { id: 1576, title: "SAFARI" }, { id: 1577, title: "Sahara" }, { id: 1578, title: "SAN MARTIN" },
  { id: 1579, title: "SELFIE" }, { id: 1580, title: "SENATOR" }, { id: 1581, title: "SENSE" }, { id: 1582, title: "SEVEN STAR" },
  { id: 1583, title: "SHAMLAN" }, { id: 1584, title: "SIERRA" }, { id: 1585, title: "SILK CUT" }, { id: 1586, title: "SIR KING" },
  { id: 1587, title: "SOLIDERE" }, { id: 1588, title: "SOLO" }, { id: 1589, title: "SOVEREIGN" }, { id: 1590, title: "SPEED" },
  { id: 1591, title: "Sport Star" }, { id: 1592, title: "STEEL" }, { id: 1593, title: "Stix" }, { id: 1594, title: "SUBMARINE" },
  { id: 1595, title: "Super" }, { id: 1596, title: "SUPER GRAND" }, { id: 1597, title: "SUPER SONIC" }, { id: 1598, title: "SWING" },
  { id: 1599, title: "SWISSE" }, { id: 1600, title: "T.TIME" }, { id: 1601, title: "TAISHAN" }, { id: 1602, title: "TARIS" },
  { id: 1603, title: "TATTOO" }, { id: 1604, title: "TETON" }, { id: 1605, title: "TEXAS 5" }, { id: 1606, title: "TGT" },
  { id: 1607, title: "THE" }, { id: 1608, title: "THE KING" }, { id: 1609, title: "THREE" }, { id: 1610, title: "THREE Star" },
  { id: 1611, title: "TICKET" }, { id: 1612, title: "Time" }, { id: 1613, title: "TIR" }, { id: 1614, title: "TITO" },
  { id: 1615, title: "TOBACCO" }, { id: 1616, title: "TOP" }, { id: 1617, title: "TOP MOUNTAIN" }, { id: 1618, title: "TOROS" },
  { id: 1619, title: "TRADITION" }, { id: 1620, title: "TRUMP" }, { id: 1621, title: "TS" }, { id: 1622, title: "TUTION" },
  { id: 1623, title: "Two Moon" }, { id: 1624, title: "Ultima" }, { id: 1625, title: "ULTIMO LONDON CROWN" }, { id: 1626, title: "VESS" },
  { id: 1627, title: "VETERAN" }, { id: 1628, title: "VIGO" }, { id: 1629, title: "VIGOR" }, { id: 1630, title: "VIOLET" },
  { id: 1631, title: "VITCH" }, { id: 1632, title: "VOICE" }, { id: 1633, title: "WALDEN" }, { id: 1634, title: "WALTON" }, { id: 1635, title: "WAVE" },
  { id: 1636, title: "WEST" }, { id: 1637, title: "WIGO" }, { id: 1638, title: "WIN" }, { id: 1639, title: "WINS" }, { id: 1640, title: "WinSton" }, 
  { id: 1641, title: "WONDER" }, { id: 1642, title: "WORLD" }, { id: 1643, title: "WUYESHEN" }, { id: 1644, title: "x3" }, { id: 1645, title: "XMAN" },
  { id: 1646, title: "ZEN" }, { id: 1647, title: "ZEST" }, { id: 1648, title: "ZUMERRET" }, { id: 2047, title: "OTHERS" }
],
      answer: "",
      isEditable: "Y",
    },
    { fieldId: 306, question: "VOLUME OF BRAND 1", fieldType: "text_field", answer: "", isEditable: "Y" },
    {
      fieldId: 307,
      question: "BRAND 2",
      fieldType: "spinner",
        optionList: [
  { id: 2026, title: "NO BRAND" },
  { id: 1280, title: "252" },
  { id: 1281, title: "555" },
  { id: 1282, title: "1970" },
  { id: 1283, title: "111 PREMIUM" },
  { id: 1284, title: "A&B" },
  { id: 1285, title: "ABC" },
  { id: 1286, title: "ADDRESS" },
  { id: 1287, title: "Affair Nano" },
  { id: 1288, title: "AFINA" },
  { id: 1289, title: "AKHTAMAR" },
  { id: 1290, title: "AL MAKHLOUF" },
  { id: 1291, title: "ALSTER" },
  { id: 1292, title: "AMERICAN" },
  { id: 1293, title: "ARMMANI" },
  { id: 1294, title: "AROMA" },
  { id: 1295, title: "ASHFORD" },
  { id: 1296, title: "ASHIMA" },
  { id: 1297, title: "ASHIMA LUXURY" },
  { id: 1298, title: "ASIA" },
  { id: 1299, title: "ASIA KING" },
  { id: 1300, title: "ASSOS" },
  { id: 1301, title: "ASSPREN" },
  { id: 1302, title: "ATTIMO" },
  { id: 1303, title: "AVALON" },
  { id: 1304, title: "B&H" },
  { id: 1305, title: "BAHMAN" },
  { id: 1306, title: "BARTON" },
  { id: 1307, title: "BASIO" },
  { id: 1308, title: "BENSTON" },
  { id: 1309, title: "BEST MAN" },
  { id: 1310, title: "BESTMAN" },
  { id: 1311, title: "BISON" },
  { id: 1312, title: "BLACK" },
  { id: 1313, title: "BLACK DEVIL" },
  { id: 1314, title: "BLACK JACK" },
  { id: 1315, title: "BLACK MOUNT" },
  { id: 1316, title: "BLUE" },
  { id: 1317, title: "BOLTON" },
  { id: 1318, title: "BON" },
  { id: 1319, title: "BONUS" },
  { id: 1320, title: "BRASS" },
  { id: 1321, title: "BRITTOSH" },
  { id: 1322, title: "BUSINESS" },
  { id: 1323, title: "BUSINESS CLUB" },
  { id: 1324, title: "BUSINESS KINGS" },
  { id: 1325, title: "BUSINESS MORE" },
  { id: 1326, title: "BUSINESS ROYAL" },
  { id: 1327, title: "Camel" },
  { id: 1328, title: "CANAL" },
  { id: 1329, title: "CAPITAL" },
  { id: 1330, title: "CAPTAIN" },
  { id: 1331, title: "CAPTAIN BLACK" },
  { id: 1332, title: "Casino" },
  { id: 1333, title: "CAVALLO" },
  { id: 1334, title: "C-ENTRO" },
  { id: 1335, title: "CHECK" },
  { id: 1336, title: "CHUNGHWA" },
  { id: 1337, title: "CIMA" },
  { id: 1338, title: "CLEOPATRA" },
  { id: 1339, title: "CODE" },
  { id: 1340, title: "CODERED" },
  { id: 1341, title: "CONGRESS" },
  { id: 1342, title: "CONINO" },
  { id: 1343, title: "CONRAD" },
  { id: 1344, title: "CORSAIR" },
  { id: 1345, title: "CORSET" },
  { id: 1346, title: "COUNSELLOR" },
  { id: 1347, title: "COURT" },
  { id: 1348, title: "CRAVEN" },
  { id: 1349, title: "CROME" },
  { id: 1350, title: "D" },
  { id: 1351, title: "D&J" },
  { id: 1352, title: "DAVIDOFF" },
  { id: 1353, title: "DAVIDOFF ONE" },
  { id: 1354, title: "DEAL" },
  { id: 1355, title: "DEER" },
  { id: 1356, title: "DENIM" },
  { id: 1357, title: "Desert" },
  { id: 1358, title: "DEVAA" },
  { id: 1359, title: "D-GI" },
  { id: 1360, title: "DORCHESTER" },
  { id: 1361, title: "DOUBLE" },
  { id: 1362, title: "DUNHILL" },{ id: 1363, title: "EIGHTY" }, { id: 1364, title: "ELEGANCE" }, { id: 1365, title: "ELYSEE" }, { id: 1366, title: "EMPIRE ROYALS" },
  { id: 1367, title: "ENGLISHMAN" }, { id: 1368, title: "ESSE" }, { id: 1369, title: "EUROPE" }, { id: 1370, title: "EVAAN" },
  { id: 1371, title: "Excellency" }, { id: 1372, title: "FALCON" }, { id: 1373, title: "FAMOUS" }, { id: 1374, title: "FARSTAR" },
  { id: 1375, title: "FAST" }, { id: 1376, title: "FIM" }, { id: 1377, title: "FINE" }, { id: 1378, title: "FISHER" },
  { id: 1379, title: "FLEKE" }, { id: 1380, title: "FORCE" }, { id: 1381, title: "FORMAN" }, { id: 1382, title: "FORUM" },
  { id: 1383, title: "GALA" }, { id: 1384, title: "Galaxy" }, { id: 1385, title: "GEM" }, { id: 1386, title: "General" },
  { id: 1387, title: "GIFT" }, { id: 1388, title: "GLORY" }, { id: 1389, title: "GLX" }, { id: 1390, title: "GM" },
  { id: 1391, title: "Gold" }, { id: 1392, title: "GOLD LEAF" }, { id: 1393, title: "GOLD LINE" }, { id: 1394, title: "GOLD MOUNT" },
  { id: 1395, title: "GOLD SEAL" }, { id: 1396, title: "GOLDEN" }, { id: 1397, title: "Golden Bird" }, { id: 1398, title: "GOLDEN DEER" },
  { id: 1399, title: "GOLDEN LEAF" }, { id: 1400, title: "GOLDMANS" }, { id: 1401, title: "GOLDMOND" }, { id: 1402, title: "Goldstreet" },
  { id: 1403, title: "GRAND MARK" }, { id: 1404, title: "GRIP" }, { id: 1405, title: "GS" }, { id: 1406, title: "GT" },
  { id: 1407, title: "GT SMART" }, { id: 1408, title: "GUDANG" }, { id: 1409, title: "H&P" }, { id: 1410, title: "H-10" },
  { id: 1411, title: "HATMAN" }, { id: 1412, title: "HD GOLDEN" }, { id: 1413, title: "HI FLAG" }, { id: 1414, title: "HI-LITE" },
  { id: 1415, title: "HILLS" }, { id: 1416, title: "HOMA" }, { id: 1417, title: "HP" }, { id: 1418, title: "HUNTER" },
  { id: 1419, title: "HUQA" }, { id: 1420, title: "INHALE" }, { id: 1421, title: "Inspiro" }, { id: 1422, title: "JAISALMAR" },
  { id: 1423, title: "JET" }, { id: 1424, title: "JIM" }, { id: 1425, title: "JINLING" }, { id: 1426, title: "JK" },
  { id: 1427, title: "JOKEY" }, { id: 1428, title: "JUNE" }, { id: 1429, title: "Jupiter" }, { id: 1430, title: "KAREENA" },
  { id: 1431, title: "KARELIA" }, { id: 1432, title: "KENMORE" }, { id: 1433, title: "Kent" }, { id: 1434, title: "KENTUCKY" },
  { id: 1435, title: "KING" }, { id: 1436, title: "KINGDOM" }, { id: 1437, title: "KINGSMAN" }, { id: 1438, title: "KINN" },
  { id: 1439, title: "KISS" }, { id: 1440, title: "L" }, { id: 1441, title: "L&M" }, { id: 1442, title: "LANDUS" },
  { id: 1443, title: "LARC DT" }, { id: 1444, title: "LAVA" }, { id: 1445, title: "LAWRENCE" }, { id: 1446, title: "LEGATE" },
  { id: 1447, title: "LEGEND" }, { id: 1448, title: "LEGENDS" }, { id: 1449, title: "LIGHT" }, { id: 1450, title: "LIPS" },
  { id: 1451, title: "LONDON" }, { id: 1452, title: "LONGHORN" }, { id: 1453, title: "LORD" }, { id: 1454, title: "LUCKY STRIKE" },
  { id: 1455, title: "LUXURY" }, { id: 1456, title: "M&J" }, { id: 1457, title: "M.D" }, { id: 1458, title: "M1" },
  { id: 1459, title: "M7" }, { id: 1460, title: "M9" }, { id: 1461, title: "MAC" }, { id: 1462, title: "MACBETH" },
  { id: 1463, title: "MACLION" }, { id: 1464, title: "MAIWAND" }, { id: 1465, title: "MANAGER" }, { id: 1466, title: "MANCHESTER" },
  { id: 1467, title: "MANCHESTER UNITED" }, { id: 1468, title: "MANHATTEN" }, { id: 1469, title: "Manta" }, { id: 1470, title: "MARBLE" },
  { id: 1471, title: "MARGIN" }, { id: 1472, title: "MARI GOLD" }, { id: 1473, title: "MARK" }, { id: 1474, title: "MARLBLE DELUXE" },
  { id: 1475, title: "MARLBORO" }, { id: 1476, title: "MARQUESE" }, { id: 1477, title: "Marshal" }, { id: 1478, title: "Max" },
  { id: 1479, title: "MAXICO" }, { id: 1480, title: "MAYBURY" }, { id: 1481, title: "MAYOR" }, { id: 1482, title: "MCLION" },
  { id: 1483, title: "MEDLEY" }, { id: 1484, title: "MEHR" }, { id: 1485, title: "MEMPHIS" }, { id: 1486, title: "MIAMI" },
  { id: 1487, title: "MIKADO" }, { id: 1488, title: "MILANO" }, { id: 1489, title: "MILD" }, { id: 1490, title: "MILFORD" },
  { id: 1491, title: "Millionair" }, { id: 1492, title: "MILTON" }, { id: 1493, title: "MM" }, { id: 1494, title: "MODERN" },
  { id: 1495, title: "Modern Slim" }, { id: 1496, title: "MODES" }, { id: 1497, title: "MODEST" }, { id: 1498, title: "MOHAWK" },
  { id: 1499, title: "MOMENTO" }, { id: 1500, title: "MOND" }, { id: 1501, title: "MONTERO" }, { id: 1502, title: "MORE" },
  { id: 1503, title: "MORE MENTHOL" }, { id: 1504, title: "MURAD BLACK" }, { id: 1505, title: "NAPOLI" }, { id: 1506, title: "NASHVILLE" },
  { id: 1507, title: "NATIVE" }, { id: 1508, title: "NAVY" }, { id: 1509, title: "NERO" }, { id: 1510, title: "NEW" },
  { id: 1511, title: "NINE NINE" }, { id: 1512, title: "NISE" }, { id: 1513, title: "NORTON" }, { id: 1514, title: "OFFERS" },
  { id: 1515, title: "OKI" }, { id: 1516, title: "OMEGA" }, { id: 1517, title: "Omega Aqua" }, { id: 1518, title: "OPAL" },
  { id: 1519, title: "ORIGINAL" }, { id: 1520, title: "ORIS" }, { id: 1521, title: "ORIS PANDA" }, { id: 1522, title: "Oris Slims" },
  { id: 1523, title: "OSCAR" }, { id: 1524, title: "OSCAR CHOCOLATE" }, { id: 1525, title: "P&S" }, { id: 1526, title: "PACIFIC" },
  { id: 1527, title: "PALL" }, { id: 1528, title: "Palomo" }, { id: 1529, title: "PANAMA" }, { id: 1530, title: "PARAN" },
  { id: 1531, title: "PARIS" }, { id: 1532, title: "PARK" }, { id: 1533, title: "PEACH" }, { id: 1534, title: "PEEL" },
  { id: 1535, title: "PINE" }, { id: 1536, title: "PIRU" }, { id: 1537, title: "PLATIEN" }, { id: 1538, title: "PLATINUM" },
  { id: 1539, title: "PLEASURE" }, { id: 1540, title: "PREMIUM" }, { id: 1541, title: "PRESIDENT" }, { id: 1542, title: "PRIDE" },
  { id: 1543, title: "PRIMARY" }, { id: 1544, title: "PRINCE" }, { id: 1545, title: "Private" }, { id: 1546, title: "R.G.D" },
  { id: 1547, title: "RABON" }, { id: 1548, title: "RAISON" }, { id: 1549, title: "RAISON BLACK" }, { id: 1550, title: "Raquel" },
  { id: 1551, title: "RED" }, { id: 1552, title: "REDS" }, { id: 1553, title: "REGAL" }, { id: 1554, title: "REGINA" },
  { id: 1555, title: "REINO" }, { id: 1556, title: "RELAX" }, { id: 1557, title: "RICHMAN" }, { id: 1558, title: "RICHMAN ROYAL" },
  { id: 1559, title: "RIO" }, { id: 1560, title: "ROBIN" }, { id: 1561, title: "Robin Rrost Rush" }, { id: 1562, title: "ROCCO" },
  { id: 1563, title: "ROCKY" }, { id: 1564, title: "RODOPI-01" }, { id: 1565, title: "ROGER" }, { id: 1566, title: "ROSEMAN" },
  { id: 1567, title: "ROTHMANS" }, { id: 1568, title: "ROVER" }, { id: 1569, title: "ROXBORO" }, { id: 1570, title: "ROYAL" },
  { id: 1571, title: "Royal Club" }, { id: 1572, title: "ROYAL MAGIC" }, { id: 1573, title: "ROYALS" }, { id: 1574, title: "Ruby" },
  { id: 1575, title: "RUBY SUPER" }, { id: 1576, title: "SAFARI" }, { id: 1577, title: "Sahara" }, { id: 1578, title: "SAN MARTIN" },
  { id: 1579, title: "SELFIE" }, { id: 1580, title: "SENATOR" }, { id: 1581, title: "SENSE" }, { id: 1582, title: "SEVEN STAR" },
  { id: 1583, title: "SHAMLAN" }, { id: 1584, title: "SIERRA" }, { id: 1585, title: "SILK CUT" }, { id: 1586, title: "SIR KING" },
  { id: 1587, title: "SOLIDERE" }, { id: 1588, title: "SOLO" }, { id: 1589, title: "SOVEREIGN" }, { id: 1590, title: "SPEED" },
  { id: 1591, title: "Sport Star" }, { id: 1592, title: "STEEL" }, { id: 1593, title: "Stix" }, { id: 1594, title: "SUBMARINE" },
  { id: 1595, title: "Super" }, { id: 1596, title: "SUPER GRAND" }, { id: 1597, title: "SUPER SONIC" }, { id: 1598, title: "SWING" },
  { id: 1599, title: "SWISSE" }, { id: 1600, title: "T.TIME" }, { id: 1601, title: "TAISHAN" }, { id: 1602, title: "TARIS" },
  { id: 1603, title: "TATTOO" }, { id: 1604, title: "TETON" }, { id: 1605, title: "TEXAS 5" }, { id: 1606, title: "TGT" },
  { id: 1607, title: "THE" }, { id: 1608, title: "THE KING" }, { id: 1609, title: "THREE" }, { id: 1610, title: "THREE Star" },
  { id: 1611, title: "TICKET" }, { id: 1612, title: "Time" }, { id: 1613, title: "TIR" }, { id: 1614, title: "TITO" },
  { id: 1615, title: "TOBACCO" }, { id: 1616, title: "TOP" }, { id: 1617, title: "TOP MOUNTAIN" }, { id: 1618, title: "TOROS" },
  { id: 1619, title: "TRADITION" }, { id: 1620, title: "TRUMP" }, { id: 1621, title: "TS" }, { id: 1622, title: "TUTION" },
  { id: 1623, title: "Two Moon" }, { id: 1624, title: "Ultima" }, { id: 1625, title: "ULTIMO LONDON CROWN" }, { id: 1626, title: "VESS" },
  { id: 1627, title: "VETERAN" }, { id: 1628, title: "VIGO" }, { id: 1629, title: "VIGOR" }, { id: 1630, title: "VIOLET" },
  { id: 1631, title: "VITCH" }, { id: 1632, title: "VOICE" }, { id: 1633, title: "WALDEN" }, { id: 1634, title: "WALTON" }, { id: 1635, title: "WAVE" },
  { id: 1636, title: "WEST" }, { id: 1637, title: "WIGO" }, { id: 1638, title: "WIN" }, { id: 1639, title: "WINS" }, { id: 1640, title: "WinSton" }, 
  { id: 1641, title: "WONDER" }, { id: 1642, title: "WORLD" }, { id: 1643, title: "WUYESHEN" }, { id: 1644, title: "x3" }, { id: 1645, title: "XMAN" },
  { id: 1646, title: "ZEN" }, { id: 1647, title: "ZEST" }, { id: 1648, title: "ZUMERRET" }, { id: 2047, title: "OTHERS" }
],
      answer: "",
      isEditable: "Y",
    },
    { fieldId: 308, question: "VOLUME OF BRAND 2", fieldType: "text_field", answer: "", isEditable: "Y" },
    {
      fieldId: 309,
      question: "BRAND 3",
      fieldType: "spinner",
        optionList: [
  { id: 2026, title: "NO BRAND" },
  { id: 1280, title: "252" },
  { id: 1281, title: "555" },
  { id: 1282, title: "1970" },
  { id: 1283, title: "111 PREMIUM" },
  { id: 1284, title: "A&B" },
  { id: 1285, title: "ABC" },
  { id: 1286, title: "ADDRESS" },
  { id: 1287, title: "Affair Nano" },
  { id: 1288, title: "AFINA" },
  { id: 1289, title: "AKHTAMAR" },
  { id: 1290, title: "AL MAKHLOUF" },
  { id: 1291, title: "ALSTER" },
  { id: 1292, title: "AMERICAN" },
  { id: 1293, title: "ARMMANI" },
  { id: 1294, title: "AROMA" },
  { id: 1295, title: "ASHFORD" },
  { id: 1296, title: "ASHIMA" },
  { id: 1297, title: "ASHIMA LUXURY" },
  { id: 1298, title: "ASIA" },
  { id: 1299, title: "ASIA KING" },
  { id: 1300, title: "ASSOS" },
  { id: 1301, title: "ASSPREN" },
  { id: 1302, title: "ATTIMO" },
  { id: 1303, title: "AVALON" },
  { id: 1304, title: "B&H" },
  { id: 1305, title: "BAHMAN" },
  { id: 1306, title: "BARTON" },
  { id: 1307, title: "BASIO" },
  { id: 1308, title: "BENSTON" },
  { id: 1309, title: "BEST MAN" },
  { id: 1310, title: "BESTMAN" },
  { id: 1311, title: "BISON" },
  { id: 1312, title: "BLACK" },
  { id: 1313, title: "BLACK DEVIL" },
  { id: 1314, title: "BLACK JACK" },
  { id: 1315, title: "BLACK MOUNT" },
  { id: 1316, title: "BLUE" },
  { id: 1317, title: "BOLTON" },
  { id: 1318, title: "BON" },
  { id: 1319, title: "BONUS" },
  { id: 1320, title: "BRASS" },
  { id: 1321, title: "BRITTOSH" },
  { id: 1322, title: "BUSINESS" },
  { id: 1323, title: "BUSINESS CLUB" },
  { id: 1324, title: "BUSINESS KINGS" },
  { id: 1325, title: "BUSINESS MORE" },
  { id: 1326, title: "BUSINESS ROYAL" },
  { id: 1327, title: "Camel" },
  { id: 1328, title: "CANAL" },
  { id: 1329, title: "CAPITAL" },
  { id: 1330, title: "CAPTAIN" },
  { id: 1331, title: "CAPTAIN BLACK" },
  { id: 1332, title: "Casino" },
  { id: 1333, title: "CAVALLO" },
  { id: 1334, title: "C-ENTRO" },
  { id: 1335, title: "CHECK" },
  { id: 1336, title: "CHUNGHWA" },
  { id: 1337, title: "CIMA" },
  { id: 1338, title: "CLEOPATRA" },
  { id: 1339, title: "CODE" },
  { id: 1340, title: "CODERED" },
  { id: 1341, title: "CONGRESS" },
  { id: 1342, title: "CONINO" },
  { id: 1343, title: "CONRAD" },
  { id: 1344, title: "CORSAIR" },
  { id: 1345, title: "CORSET" },
  { id: 1346, title: "COUNSELLOR" },
  { id: 1347, title: "COURT" },
  { id: 1348, title: "CRAVEN" },
  { id: 1349, title: "CROME" },
  { id: 1350, title: "D" },
  { id: 1351, title: "D&J" },
  { id: 1352, title: "DAVIDOFF" },
  { id: 1353, title: "DAVIDOFF ONE" },
  { id: 1354, title: "DEAL" },
  { id: 1355, title: "DEER" },
  { id: 1356, title: "DENIM" },
  { id: 1357, title: "Desert" },
  { id: 1358, title: "DEVAA" },
  { id: 1359, title: "D-GI" },
  { id: 1360, title: "DORCHESTER" },
  { id: 1361, title: "DOUBLE" },
  { id: 1362, title: "DUNHILL" },{ id: 1363, title: "EIGHTY" }, { id: 1364, title: "ELEGANCE" }, { id: 1365, title: "ELYSEE" }, { id: 1366, title: "EMPIRE ROYALS" },
  { id: 1367, title: "ENGLISHMAN" }, { id: 1368, title: "ESSE" }, { id: 1369, title: "EUROPE" }, { id: 1370, title: "EVAAN" },
  { id: 1371, title: "Excellency" }, { id: 1372, title: "FALCON" }, { id: 1373, title: "FAMOUS" }, { id: 1374, title: "FARSTAR" },
  { id: 1375, title: "FAST" }, { id: 1376, title: "FIM" }, { id: 1377, title: "FINE" }, { id: 1378, title: "FISHER" },
  { id: 1379, title: "FLEKE" }, { id: 1380, title: "FORCE" }, { id: 1381, title: "FORMAN" }, { id: 1382, title: "FORUM" },
  { id: 1383, title: "GALA" }, { id: 1384, title: "Galaxy" }, { id: 1385, title: "GEM" }, { id: 1386, title: "General" },
  { id: 1387, title: "GIFT" }, { id: 1388, title: "GLORY" }, { id: 1389, title: "GLX" }, { id: 1390, title: "GM" },
  { id: 1391, title: "Gold" }, { id: 1392, title: "GOLD LEAF" }, { id: 1393, title: "GOLD LINE" }, { id: 1394, title: "GOLD MOUNT" },
  { id: 1395, title: "GOLD SEAL" }, { id: 1396, title: "GOLDEN" }, { id: 1397, title: "Golden Bird" }, { id: 1398, title: "GOLDEN DEER" },
  { id: 1399, title: "GOLDEN LEAF" }, { id: 1400, title: "GOLDMANS" }, { id: 1401, title: "GOLDMOND" }, { id: 1402, title: "Goldstreet" },
  { id: 1403, title: "GRAND MARK" }, { id: 1404, title: "GRIP" }, { id: 1405, title: "GS" }, { id: 1406, title: "GT" },
  { id: 1407, title: "GT SMART" }, { id: 1408, title: "GUDANG" }, { id: 1409, title: "H&P" }, { id: 1410, title: "H-10" },
  { id: 1411, title: "HATMAN" }, { id: 1412, title: "HD GOLDEN" }, { id: 1413, title: "HI FLAG" }, { id: 1414, title: "HI-LITE" },
  { id: 1415, title: "HILLS" }, { id: 1416, title: "HOMA" }, { id: 1417, title: "HP" }, { id: 1418, title: "HUNTER" },
  { id: 1419, title: "HUQA" }, { id: 1420, title: "INHALE" }, { id: 1421, title: "Inspiro" }, { id: 1422, title: "JAISALMAR" },
  { id: 1423, title: "JET" }, { id: 1424, title: "JIM" }, { id: 1425, title: "JINLING" }, { id: 1426, title: "JK" },
  { id: 1427, title: "JOKEY" }, { id: 1428, title: "JUNE" }, { id: 1429, title: "Jupiter" }, { id: 1430, title: "KAREENA" },
  { id: 1431, title: "KARELIA" }, { id: 1432, title: "KENMORE" }, { id: 1433, title: "Kent" }, { id: 1434, title: "KENTUCKY" },
  { id: 1435, title: "KING" }, { id: 1436, title: "KINGDOM" }, { id: 1437, title: "KINGSMAN" }, { id: 1438, title: "KINN" },
  { id: 1439, title: "KISS" }, { id: 1440, title: "L" }, { id: 1441, title: "L&M" }, { id: 1442, title: "LANDUS" },
  { id: 1443, title: "LARC DT" }, { id: 1444, title: "LAVA" }, { id: 1445, title: "LAWRENCE" }, { id: 1446, title: "LEGATE" },
  { id: 1447, title: "LEGEND" }, { id: 1448, title: "LEGENDS" }, { id: 1449, title: "LIGHT" }, { id: 1450, title: "LIPS" },
  { id: 1451, title: "LONDON" }, { id: 1452, title: "LONGHORN" }, { id: 1453, title: "LORD" }, { id: 1454, title: "LUCKY STRIKE" },
  { id: 1455, title: "LUXURY" }, { id: 1456, title: "M&J" }, { id: 1457, title: "M.D" }, { id: 1458, title: "M1" },
  { id: 1459, title: "M7" }, { id: 1460, title: "M9" }, { id: 1461, title: "MAC" }, { id: 1462, title: "MACBETH" },
  { id: 1463, title: "MACLION" }, { id: 1464, title: "MAIWAND" }, { id: 1465, title: "MANAGER" }, { id: 1466, title: "MANCHESTER" },
  { id: 1467, title: "MANCHESTER UNITED" }, { id: 1468, title: "MANHATTEN" }, { id: 1469, title: "Manta" }, { id: 1470, title: "MARBLE" },
  { id: 1471, title: "MARGIN" }, { id: 1472, title: "MARI GOLD" }, { id: 1473, title: "MARK" }, { id: 1474, title: "MARLBLE DELUXE" },
  { id: 1475, title: "MARLBORO" }, { id: 1476, title: "MARQUESE" }, { id: 1477, title: "Marshal" }, { id: 1478, title: "Max" },
  { id: 1479, title: "MAXICO" }, { id: 1480, title: "MAYBURY" }, { id: 1481, title: "MAYOR" }, { id: 1482, title: "MCLION" },
  { id: 1483, title: "MEDLEY" }, { id: 1484, title: "MEHR" }, { id: 1485, title: "MEMPHIS" }, { id: 1486, title: "MIAMI" },
  { id: 1487, title: "MIKADO" }, { id: 1488, title: "MILANO" }, { id: 1489, title: "MILD" }, { id: 1490, title: "MILFORD" },
  { id: 1491, title: "Millionair" }, { id: 1492, title: "MILTON" }, { id: 1493, title: "MM" }, { id: 1494, title: "MODERN" },
  { id: 1495, title: "Modern Slim" }, { id: 1496, title: "MODES" }, { id: 1497, title: "MODEST" }, { id: 1498, title: "MOHAWK" },
  { id: 1499, title: "MOMENTO" }, { id: 1500, title: "MOND" }, { id: 1501, title: "MONTERO" }, { id: 1502, title: "MORE" },
  { id: 1503, title: "MORE MENTHOL" }, { id: 1504, title: "MURAD BLACK" }, { id: 1505, title: "NAPOLI" }, { id: 1506, title: "NASHVILLE" },
  { id: 1507, title: "NATIVE" }, { id: 1508, title: "NAVY" }, { id: 1509, title: "NERO" }, { id: 1510, title: "NEW" },
  { id: 1511, title: "NINE NINE" }, { id: 1512, title: "NISE" }, { id: 1513, title: "NORTON" }, { id: 1514, title: "OFFERS" },
  { id: 1515, title: "OKI" }, { id: 1516, title: "OMEGA" }, { id: 1517, title: "Omega Aqua" }, { id: 1518, title: "OPAL" },
  { id: 1519, title: "ORIGINAL" }, { id: 1520, title: "ORIS" }, { id: 1521, title: "ORIS PANDA" }, { id: 1522, title: "Oris Slims" },
  { id: 1523, title: "OSCAR" }, { id: 1524, title: "OSCAR CHOCOLATE" }, { id: 1525, title: "P&S" }, { id: 1526, title: "PACIFIC" },
  { id: 1527, title: "PALL" }, { id: 1528, title: "Palomo" }, { id: 1529, title: "PANAMA" }, { id: 1530, title: "PARAN" },
  { id: 1531, title: "PARIS" }, { id: 1532, title: "PARK" }, { id: 1533, title: "PEACH" }, { id: 1534, title: "PEEL" },
  { id: 1535, title: "PINE" }, { id: 1536, title: "PIRU" }, { id: 1537, title: "PLATIEN" }, { id: 1538, title: "PLATINUM" },
  { id: 1539, title: "PLEASURE" }, { id: 1540, title: "PREMIUM" }, { id: 1541, title: "PRESIDENT" }, { id: 1542, title: "PRIDE" },
  { id: 1543, title: "PRIMARY" }, { id: 1544, title: "PRINCE" }, { id: 1545, title: "Private" }, { id: 1546, title: "R.G.D" },
  { id: 1547, title: "RABON" }, { id: 1548, title: "RAISON" }, { id: 1549, title: "RAISON BLACK" }, { id: 1550, title: "Raquel" },
  { id: 1551, title: "RED" }, { id: 1552, title: "REDS" }, { id: 1553, title: "REGAL" }, { id: 1554, title: "REGINA" },
  { id: 1555, title: "REINO" }, { id: 1556, title: "RELAX" }, { id: 1557, title: "RICHMAN" }, { id: 1558, title: "RICHMAN ROYAL" },
  { id: 1559, title: "RIO" }, { id: 1560, title: "ROBIN" }, { id: 1561, title: "Robin Rrost Rush" }, { id: 1562, title: "ROCCO" },
  { id: 1563, title: "ROCKY" }, { id: 1564, title: "RODOPI-01" }, { id: 1565, title: "ROGER" }, { id: 1566, title: "ROSEMAN" },
  { id: 1567, title: "ROTHMANS" }, { id: 1568, title: "ROVER" }, { id: 1569, title: "ROXBORO" }, { id: 1570, title: "ROYAL" },
  { id: 1571, title: "Royal Club" }, { id: 1572, title: "ROYAL MAGIC" }, { id: 1573, title: "ROYALS" }, { id: 1574, title: "Ruby" },
  { id: 1575, title: "RUBY SUPER" }, { id: 1576, title: "SAFARI" }, { id: 1577, title: "Sahara" }, { id: 1578, title: "SAN MARTIN" },
  { id: 1579, title: "SELFIE" }, { id: 1580, title: "SENATOR" }, { id: 1581, title: "SENSE" }, { id: 1582, title: "SEVEN STAR" },
  { id: 1583, title: "SHAMLAN" }, { id: 1584, title: "SIERRA" }, { id: 1585, title: "SILK CUT" }, { id: 1586, title: "SIR KING" },
  { id: 1587, title: "SOLIDERE" }, { id: 1588, title: "SOLO" }, { id: 1589, title: "SOVEREIGN" }, { id: 1590, title: "SPEED" },
  { id: 1591, title: "Sport Star" }, { id: 1592, title: "STEEL" }, { id: 1593, title: "Stix" }, { id: 1594, title: "SUBMARINE" },
  { id: 1595, title: "Super" }, { id: 1596, title: "SUPER GRAND" }, { id: 1597, title: "SUPER SONIC" }, { id: 1598, title: "SWING" },
  { id: 1599, title: "SWISSE" }, { id: 1600, title: "T.TIME" }, { id: 1601, title: "TAISHAN" }, { id: 1602, title: "TARIS" },
  { id: 1603, title: "TATTOO" }, { id: 1604, title: "TETON" }, { id: 1605, title: "TEXAS 5" }, { id: 1606, title: "TGT" },
  { id: 1607, title: "THE" }, { id: 1608, title: "THE KING" }, { id: 1609, title: "THREE" }, { id: 1610, title: "THREE Star" },
  { id: 1611, title: "TICKET" }, { id: 1612, title: "Time" }, { id: 1613, title: "TIR" }, { id: 1614, title: "TITO" },
  { id: 1615, title: "TOBACCO" }, { id: 1616, title: "TOP" }, { id: 1617, title: "TOP MOUNTAIN" }, { id: 1618, title: "TOROS" },
  { id: 1619, title: "TRADITION" }, { id: 1620, title: "TRUMP" }, { id: 1621, title: "TS" }, { id: 1622, title: "TUTION" },
  { id: 1623, title: "Two Moon" }, { id: 1624, title: "Ultima" }, { id: 1625, title: "ULTIMO LONDON CROWN" }, { id: 1626, title: "VESS" },
  { id: 1627, title: "VETERAN" }, { id: 1628, title: "VIGO" }, { id: 1629, title: "VIGOR" }, { id: 1630, title: "VIOLET" },
  { id: 1631, title: "VITCH" }, { id: 1632, title: "VOICE" }, { id: 1633, title: "WALDEN" }, { id: 1634, title: "WALTON" }, { id: 1635, title: "WAVE" },
  { id: 1636, title: "WEST" }, { id: 1637, title: "WIGO" }, { id: 1638, title: "WIN" }, { id: 1639, title: "WINS" }, { id: 1640, title: "WinSton" }, 
  { id: 1641, title: "WONDER" }, { id: 1642, title: "WORLD" }, { id: 1643, title: "WUYESHEN" }, { id: 1644, title: "x3" }, { id: 1645, title: "XMAN" },
  { id: 1646, title: "ZEN" }, { id: 1647, title: "ZEST" }, { id: 1648, title: "ZUMERRET" }, { id: 2047, title: "OTHERS" }
],
      answer: "",
      isEditable: "Y",
    },
    { fieldId: 310, question: "VOLUME OF BRAND 3", fieldType: "text_field", answer: "", isEditable: "Y" },
    { fieldId: 311, question: "VOLUME OF INTEL OVERALL", fieldType: "text_field", answer: "", isEditable: "Y" },
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private keyValuePipe: KeyValuePipe
  ) {
    this.evaluatorId = localStorage.getItem("user_id");
    this.projectType = localStorage.getItem("projectType");
  }

  ngOnInit() {
    console.log("isEditable:", this.isEditable);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data?.currentValue) {
      this.data = changes.data.currentValue;
      this.formData = this.keyValuePipe.transform(this.data.formData) || [];
      this.selectedImage = this.data.imageList[0];

      if (this.projectType === "PMI_CENSUS") {
      //  Inject child questions if parent Q304 = YES
      const parent = this.formData.find(f => f.value.fieldId === 304);
      if (parent && parent.value.answer === 'YES') {
        this.addChildQuestions();
      }
    }
  }
  }

  unsorted() {}

  setSelectedImage(img) {
    this.selectedImage = img;
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.showModal.emit(this.selectedShop);
  }

  hideChildModal() {
    this.childModal.hide();
  }

  updateMultiOptionData(value, data) {
    this.loading = true;
    let selectedOption;
    for (const option of data.optionList) {
      if (value == option.id || value == option.title) {
        selectedOption = option;
        break;
      }
    }
    if (value) {
      if (this.isEditable) {
        const obj = {
          surveyId:data.surveyId,
          msdId: data.id,
          fieldId: data.fieldId,
          formId: data.formId,
          title: data.question,
          categoryTitle: this.data.sectionTitle,
          newValueId: selectedOption?.id || -1,
          newValue: selectedOption?.title || value,
          evaluatorId: this.evaluatorId,
          newChild: data.newChild || "N",
        };

        this.httpService.updateSurveyData(obj).subscribe((res: any) => {
          if (res.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
          } else {
            this.toastr.error(res.message, "Update Data");
          }
        });
      } else {
        this.toastr.error(
          "Operation not allowed. Please login with the relevant Id",
          "Error"
        );
      }
    } else {
      this.toastr.error("Value is Incorrect");
      this.loading = false;
    }

    //  Local check: If parent Q304 changed to YES → inject child immediately
    if (data.fieldId === 304 && value === "YES") {
      if (this.projectType === "PMI_CENSUS"){
      this.addChildQuestions();
    }
  }
  }

  updateTextData(value) {
    this.loading = true;
    if (value.answer) {
      if (this.isEditable) {
        const obj = {
          surveyId: value.surveyId || this.data?.surveyId,   //  add
           formId: value.formId || this.data?.formId,
          msdId: value.id,
          fieldId: value.fieldId,
          newValue: value.answer,
          newValueId: -1,
          title: value.question,
          categoryTitle: this.data.sectionTitle,
          evaluatorId: this.evaluatorId,
          newChild: value.newChild || "N"
        };

        this.httpService.updateSurveyData(obj).subscribe((res: any) => {
          if (res.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
          } else {
            this.toastr.error(res.message, "Update Data");
          }
        });
      } else {
        this.toastr.error(
          "Operation not allowed. Please login with the relevant Id",
          "Error"
        );
      }
    } else {
      this.toastr.error("Value is Incorrect");
      this.loading = false;
    }
  }

  //  Inject child questions when parent = YES
  addChildQuestions() {
    if (this.projectType !== "PMI_CENSUS") return;
    const parent = this.formData.find(f => f.value.fieldId === 304);
    const parentSurveyId = parent?.value?.surveyId || parent?.surveyId || this.data?.surveyId;
    const parentFormId   = parent?.value?.formId   || parent?.formId   || this.data?.formId;
  this.childQuestions.forEach((child) => {
    if (!this.formData.find((f) => f.value.fieldId === child.fieldId)) {
      this.formData.push({ value: { ...child, newChild: "Y",surveyId: parentSurveyId, formId: parentFormId } });
    }
  });
}
}