
import { HostListener, 
  Component, 
  OnInit, 
  Inject, 
  Renderer2,
  EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation 
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IMXSliderOptions, IMXSliderValues} from '@intermx/ui-platform/imx-slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BarChartData, BarChartOptions, DonutChartData, DonutChartOptions, LineChartData, LineChartOptions, StackedLineChartData, StackedLineChartOptions } from '@intermx/ui-platform/imx-d3'
import { IMXTableColumnElement } from '@intermx/ui-platform/imx-table'
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { getWeek, format, toDate } from "date-fns";
import * as numeral from 'numeral';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-place-plan-report-v4',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  public placeData: any
  // public details: any
 public details = {"place_id": 16950, "name": "Meridian at Pentagon City", "street_address": null, "city": null, "state": "Virginia", "postal_code": "22202", "location": {"lat": 38.86213, "lon": -77.053446}, "market": {"co_geoid": "51013", "co_name": "Arlington", "st_usps": null, "st_name": null, "cbsa_geoid": "47900", "cbsa_name": "Washington-Arlington-Alexandria, DC-VA-MD-WV", "cbsa_type": "cbsa_metro", "dma_geoid": "511", "dma_name": "Washington, DC (Hagerstown, MD)"}, "place_type_id": 44, "place_type": "Residential Facility", "place_audit_status": "Reviewed", "place_modified_date": "2019-01-18", "published_date": "2022-08-07", "imputed": false, "activities": 49400, "activities_dwell_threshold": 0.25, "visits": 33328, "visits_ci": [3798, 4938], "visit_observations": 3469, "dropoffs": 16071, "passbys": 12321, "stays": 4779, "visits_avg_dwell": 550, "visits_frequency_per_person": 2.59, "visits_unique_persons": 12882, "visits_unique_long_trips": 2881, "passbys_travel_mode": [11451, 870], "local_radius": {"activities": [32881, 16519], "visits": [22819, 10509], "dropoffs": [10062, 6009], "passbys": [8672, 3649]}, "history": {"year": [{"id": "2022", "imputed": false, "activities": 47301, "visit_observations": 17444, "visits": 32413, "dropoffs": 14888, "passbys": 10042, "week_count": 31}, {"id": "2021", "imputed": false, "activities": 46986, "visit_observations": 23176, "visits": 35285, "dropoffs": 11701, "passbys": 5056, "week_count": 52}, {"id": "2020", "imputed": false, "activities": 36681, "visit_observations": 19101, "visits": 25281, "dropoffs": 11400, "passbys": 5435, "week_count": 53}, {"id": "2019", "imputed": false, "activities": 37574, "visit_observations": 20307, "visits": 26891, "dropoffs": 10683, "passbys": 8899, "week_count": 52}], "week": [{"id": "2022-W31", "imputed": false, "activities": 43039, "visit_observations": 470, "visits": 29020, "dropoffs": 14018, "passbys": 11004, "week_start": "2022-08-01"}, {"id": "2022-W30", "imputed": false, "activities": 47959, "visit_observations": 580, "visits": 30794, "dropoffs": 17165, "passbys": 19061, "week_start": "2022-07-25"}, {"id": "2022-W29", "imputed": false, "activities": 43290, "visit_observations": 517, "visits": 29429, "dropoffs": 13861, "passbys": 9734, "week_start": "2022-07-18"}, {"id": "2022-W28", "imputed": false, "activities": 50629, "visit_observations": 601, "visits": 34437, "dropoffs": 16193, "passbys": 10475, "week_start": "2022-07-11"}, {"id": "2022-W27", "imputed": false, "activities": 54902, "visit_observations": 658, "visits": 35665, "dropoffs": 19237, "passbys": 12286, "week_start": "2022-07-04"}, {"id": "2022-W26", "imputed": false, "activities": 56579, "visit_observations": 643, "visits": 40625, "dropoffs": 15954, "passbys": 11363, "week_start": "2022-06-27"}, {"id": "2022-W25", "imputed": false, "activities": 61137, "visit_observations": 656, "visits": 43328, "dropoffs": 17810, "passbys": 14265, "week_start": "2022-06-20"}, {"id": "2022-W24", "imputed": false, "activities": 63183, "visit_observations": 736, "visits": 45560, "dropoffs": 17623, "passbys": 14026, "week_start": "2022-06-13"}, {"id": "2022-W23", "imputed": false, "activities": 56646, "visit_observations": 621, "visits": 39798, "dropoffs": 16848, "passbys": 17664, "week_start": "2022-06-06"}, {"id": "2022-W22", "imputed": false, "activities": 65508, "visit_observations": 815, "visits": 46234, "dropoffs": 19275, "passbys": 11955, "week_start": "2022-05-30"}, {"id": "2022-W21", "imputed": false, "activities": 58084, "visit_observations": 752, "visits": 40621, "dropoffs": 17463, "passbys": 8869, "week_start": "2022-05-23"}, {"id": "2022-W20", "imputed": false, "activities": 48955, "visit_observations": 646, "visits": 31946, "dropoffs": 17008, "passbys": 12278, "week_start": "2022-05-16"}, {"id": "2022-W19", "imputed": false, "activities": 49822, "visit_observations": 660, "visits": 33915, "dropoffs": 15907, "passbys": 12102, "week_start": "2022-05-09"}, {"id": "2022-W18", "imputed": false, "activities": 54179, "visit_observations": 722, "visits": 39733, "dropoffs": 14447, "passbys": 9554, "week_start": "2022-05-02"}, {"id": "2022-W17", "imputed": false, "activities": 46623, "visit_observations": 578, "visits": 33479, "dropoffs": 13144, "passbys": 8711, "week_start": "2022-04-25"}, {"id": "2022-W16", "imputed": false, "activities": 52454, "visit_observations": 682, "visits": 36686, "dropoffs": 15768, "passbys": 9614, "week_start": "2022-04-18"}, {"id": "2022-W15", "imputed": false, "activities": 49472, "visit_observations": 696, "visits": 32223, "dropoffs": 17249, "passbys": 15266, "week_start": "2022-04-11"}, {"id": "2022-W14", "imputed": false, "activities": 42137, "visit_observations": 522, "visits": 27240, "dropoffs": 14897, "passbys": 13032, "week_start": "2022-04-04"}, {"id": "2022-W13", "imputed": false, "activities": 52596, "visit_observations": 639, "visits": 39329, "dropoffs": 13268, "passbys": 11632, "week_start": "2022-03-28"}, {"id": "2022-W12", "imputed": false, "activities": 47948, "visit_observations": 630, "visits": 31373, "dropoffs": 16576, "passbys": 10891, "week_start": "2022-03-21"}, {"id": "2022-W11", "imputed": false, "activities": 53510, "visit_observations": 647, "visits": 35713, "dropoffs": 17798, "passbys": 10738, "week_start": "2022-03-14"}, {"id": "2022-W10", "imputed": false, "activities": 37825, "visit_observations": 467, "visits": 26097, "dropoffs": 11729, "passbys": 6317, "week_start": "2022-03-07"}, {"id": "2022-W09", "imputed": false, "activities": 38482, "visit_observations": 449, "visits": 24661, "dropoffs": 13822, "passbys": 7464, "week_start": "2022-02-28"}, {"id": "2022-W08", "imputed": false, "activities": 36084, "visit_observations": 414, "visits": 24418, "dropoffs": 11666, "passbys": 8830, "week_start": "2022-02-21"}, {"id": "2022-W07", "imputed": false, "activities": 37111, "visit_observations": 443, "visits": 26746, "dropoffs": 10364, "passbys": 6616, "week_start": "2022-02-14"}, {"id": "2022-W06", "imputed": false, "activities": 33784, "visit_observations": 396, "visits": 22328, "dropoffs": 11456, "passbys": 5953, "week_start": "2022-02-07"}, {"id": "2022-W05", "imputed": false, "activities": 37832, "visit_observations": 389, "visits": 26863, "dropoffs": 10969, "passbys": 4299, "week_start": "2022-01-31"}, {"id": "2022-W04", "imputed": false, "activities": 39774, "visit_observations": 398, "visits": 27320, "dropoffs": 12455, "passbys": 4732, "week_start": "2022-01-24"}, {"id": "2022-W03", "imputed": false, "activities": 32038, "visit_observations": 384, "visits": 24855, "dropoffs": 7184, "passbys": 6402, "week_start": "2022-01-17"}, {"id": "2022-W02", "imputed": false, "activities": 47605, "visit_observations": 402, "visits": 30154, "dropoffs": 17451, "passbys": 4165, "week_start": "2022-01-10"}, {"id": "2022-W01", "imputed": false, "activities": 27143, "visit_observations": 231, "visits": 14219, "dropoffs": 12924, "passbys": 1995, "week_start": "2022-01-03"}, {"id": "2021-W52", "imputed": false, "activities": 17749, "visit_observations": 221, "visits": 9593, "dropoffs": 8156, "passbys": 4573, "week_start": "2021-12-27"}, {"id": "2021-W51", "imputed": false, "activities": 11708, "visit_observations": 190, "visits": 7672, "dropoffs": 4036, "passbys": 3113, "week_start": "2021-12-20"}, {"id": "2021-W50", "imputed": false, "activities": 24135, "visit_observations": 312, "visits": 15256, "dropoffs": 8879, "passbys": 5237, "week_start": "2021-12-13"}, {"id": "2021-W49", "imputed": false, "activities": 25778, "visit_observations": 311, "visits": 18257, "dropoffs": 7521, "passbys": 6049, "week_start": "2021-12-06"}, {"id": "2021-W48", "imputed": false, "activities": 29079, "visit_observations": 354, "visits": 22704, "dropoffs": 6375, "passbys": 5526, "week_start": "2021-11-29"}, {"id": "2021-W47", "imputed": false, "activities": 34743, "visit_observations": 343, "visits": 25945, "dropoffs": 8797, "passbys": 5725, "week_start": "2021-11-22"}, {"id": "2021-W46", "imputed": false, "activities": 42157, "visit_observations": 412, "visits": 32439, "dropoffs": 9719, "passbys": 8251, "week_start": "2021-11-15"}, {"id": "2021-W45", "imputed": false, "activities": 38007, "visit_observations": 379, "visits": 27477, "dropoffs": 10531, "passbys": 5283, "week_start": "2021-11-08"}, {"id": "2021-W44", "imputed": false, "activities": 40738, "visit_observations": 357, "visits": 29289, "dropoffs": 11450, "passbys": 3641, "week_start": "2021-11-01"}, {"id": "2021-W43", "imputed": false, "activities": 36501, "visit_observations": 332, "visits": 26797, "dropoffs": 9704, "passbys": 3366, "week_start": "2021-10-25"}, {"id": "2021-W42", "imputed": false, "activities": 34635, "visit_observations": 323, "visits": 23458, "dropoffs": 11177, "passbys": 3739, "week_start": "2021-10-18"}, {"id": "2021-W41", "imputed": false, "activities": 29363, "visit_observations": 413, "visits": 19619, "dropoffs": 9744, "passbys": 4226, "week_start": "2021-10-11"}, {"id": "2021-W40", "imputed": false, "activities": 37252, "visit_observations": 490, "visits": 27707, "dropoffs": 9544, "passbys": 3772, "week_start": "2021-10-04"}, {"id": "2021-W39", "imputed": false, "activities": 30289, "visit_observations": 377, "visits": 19917, "dropoffs": 10372, "passbys": 5355, "week_start": "2021-09-27"}, {"id": "2021-W38", "imputed": false, "activities": 23069, "visit_observations": 301, "visits": 13138, "dropoffs": 9931, "passbys": 2784, "week_start": "2021-09-20"}, {"id": "2021-W37", "imputed": false, "activities": 33615, "visit_observations": 369, "visits": 23796, "dropoffs": 9819, "passbys": 2779, "week_start": "2021-09-13"}, {"id": "2021-W36", "imputed": false, "activities": 37059, "visit_observations": 436, "visits": 24566, "dropoffs": 12493, "passbys": 6375, "week_start": "2021-09-06"}, {"id": "2021-W35", "imputed": false, "activities": 23582, "visit_observations": 296, "visits": 15821, "dropoffs": 7761, "passbys": 2767, "week_start": "2021-08-30"}, {"id": "2021-W34", "imputed": false, "activities": 31752, "visit_observations": 344, "visits": 20410, "dropoffs": 11342, "passbys": 3460, "week_start": "2021-08-23"}, {"id": "2021-W33", "imputed": false, "activities": 29595, "visit_observations": 407, "visits": 21263, "dropoffs": 8332, "passbys": 5637, "week_start": "2021-08-16"}, {"id": "2021-W32", "imputed": false, "activities": 43805, "visit_observations": 494, "visits": 32443, "dropoffs": 11362, "passbys": 7471, "week_start": "2021-08-09"}, {"id": "2021-W31", "imputed": false, "activities": 34069, "visit_observations": 440, "visits": 23323, "dropoffs": 10747, "passbys": 6415, "week_start": "2021-08-02"}, {"id": "2021-W30", "imputed": false, "activities": 40919, "visit_observations": 493, "visits": 27503, "dropoffs": 13416, "passbys": 8279, "week_start": "2021-07-26"}, {"id": "2021-W29", "imputed": false, "activities": 38326, "visit_observations": 471, "visits": 26175, "dropoffs": 12151, "passbys": 4110, "week_start": "2021-07-19"}, {"id": "2021-W28", "imputed": false, "activities": 36827, "visit_observations": 469, "visits": 24352, "dropoffs": 12475, "passbys": 4343, "week_start": "2021-07-12"}, {"id": "2021-W27", "imputed": false, "activities": 39448, "visit_observations": 474, "visits": 26773, "dropoffs": 12675, "passbys": 4686, "week_start": "2021-07-05"}, {"id": "2021-W26", "imputed": false, "activities": 58173, "visit_observations": 553, "visits": 46623, "dropoffs": 11550, "passbys": 6108, "week_start": "2021-06-28"}, {"id": "2021-W25", "imputed": false, "activities": 88848, "visit_observations": 566, "visits": 70169, "dropoffs": 18680, "passbys": 6756, "week_start": "2021-06-21"}, {"id": "2021-W24", "imputed": false, "activities": 80821, "visit_observations": 551, "visits": 67236, "dropoffs": 13585, "passbys": 5851, "week_start": "2021-06-14"}, {"id": "2021-W23", "imputed": false, "activities": 80732, "visit_observations": 520, "visits": 63523, "dropoffs": 17209, "passbys": 9058, "week_start": "2021-06-07"}, {"id": "2021-W22", "imputed": false, "activities": 95377, "visit_observations": 716, "visits": 75681, "dropoffs": 19696, "passbys": 6001, "week_start": "2021-05-31"}, {"id": "2021-W21", "imputed": false, "activities": 72976, "visit_observations": 632, "visits": 58601, "dropoffs": 14375, "passbys": 4442, "week_start": "2021-05-24"}, {"id": "2021-W20", "imputed": false, "activities": 51230, "visit_observations": 472, "visits": 37065, "dropoffs": 14165, "passbys": 5374, "week_start": "2021-05-17"}, {"id": "2021-W19", "imputed": false, "activities": 55002, "visit_observations": 468, "visits": 41509, "dropoffs": 13493, "passbys": 4728, "week_start": "2021-05-10"}, {"id": "2021-W18", "imputed": false, "activities": 70233, "visit_observations": 588, "visits": 59833, "dropoffs": 10399, "passbys": 5384, "week_start": "2021-05-03"}, {"id": "2021-W17", "imputed": false, "activities": 69554, "visit_observations": 564, "visits": 57514, "dropoffs": 12040, "passbys": 5604, "week_start": "2021-04-26"}, {"id": "2021-W16", "imputed": false, "activities": 78223, "visit_observations": 596, "visits": 64132, "dropoffs": 14091, "passbys": 2966, "week_start": "2021-04-19"}, {"id": "2021-W15", "imputed": false, "activities": 74940, "visit_observations": 677, "visits": 54552, "dropoffs": 20388, "passbys": 8603, "week_start": "2021-04-12"}, {"id": "2021-W14", "imputed": false, "activities": 47738, "visit_observations": 466, "visits": 32571, "dropoffs": 15168, "passbys": 6778, "week_start": "2021-04-05"}, {"id": "2021-W13", "imputed": false, "activities": 64852, "visit_observations": 507, "visits": 45745, "dropoffs": 19107, "passbys": 5576, "week_start": "2021-03-29"}, {"id": "2021-W12", "imputed": false, "activities": 50871, "visit_observations": 395, "visits": 37996, "dropoffs": 12874, "passbys": 4424, "week_start": "2021-03-22"}, {"id": "2021-W11", "imputed": false, "activities": 49364, "visit_observations": 412, "visits": 39294, "dropoffs": 10070, "passbys": 3996, "week_start": "2021-03-15"}, {"id": "2021-W10", "imputed": false, "activities": 55269, "visit_observations": 440, "visits": 45720, "dropoffs": 9548, "passbys": 5162, "week_start": "2021-03-08"}, {"id": "2021-W09", "imputed": false, "activities": 72388, "visit_observations": 523, "visits": 64015, "dropoffs": 8373, "passbys": 4094, "week_start": "2021-03-01"}, {"id": "2021-W08", "imputed": false, "activities": 68453, "visit_observations": 581, "visits": 52672, "dropoffs": 15781, "passbys": 5779, "week_start": "2021-02-22"}, {"id": "2021-W07", "imputed": false, "activities": 52018, "visit_observations": 463, "visits": 39376, "dropoffs": 12643, "passbys": 3265, "week_start": "2021-02-15"}, {"id": "2021-W06", "imputed": false, "activities": 58094, "visit_observations": 526, "visits": 45698, "dropoffs": 12396, "passbys": 4205, "week_start": "2021-02-08"}, {"id": "2021-W05", "imputed": false, "activities": 42207, "visit_observations": 406, "visits": 31133, "dropoffs": 11074, "passbys": 4860, "week_start": "2021-02-01"}, {"id": "2021-W04", "imputed": false, "activities": 32442, "visit_observations": 352, "visits": 24089, "dropoffs": 8353, "passbys": 3375, "week_start": "2021-01-25"}, {"id": "2021-W03", "imputed": false, "activities": 43049, "visit_observations": 459, "visits": 31961, "dropoffs": 11088, "passbys": 5932, "week_start": "2021-01-18"}, {"id": "2021-W02", "imputed": false, "activities": 41448, "visit_observations": 447, "visits": 29350, "dropoffs": 12097, "passbys": 4428, "week_start": "2021-01-11"}, {"id": "2021-W01", "imputed": false, "activities": 44766, "visit_observations": 488, "visits": 33075, "dropoffs": 11690, "passbys": 3195, "week_start": "2021-01-04"}, {"id": "2020-W53", "imputed": false, "activities": 36214, "visit_observations": 366, "visits": 27608, "dropoffs": 8607, "passbys": 3089, "week_start": "2020-12-28"}, {"id": "2020-W52", "imputed": false, "activities": 47342, "visit_observations": 359, "visits": 33455, "dropoffs": 13887, "passbys": 4605, "week_start": "2020-12-21"}, {"id": "2020-W51", "imputed": false, "activities": 46567, "visit_observations": 419, "visits": 36778, "dropoffs": 9789, "passbys": 3178, "week_start": "2020-12-14"}, {"id": "2020-W50", "imputed": false, "activities": 36934, "visit_observations": 394, "visits": 25474, "dropoffs": 11460, "passbys": 5940, "week_start": "2020-12-07"}, {"id": "2020-W49", "imputed": false, "activities": 19981, "visit_observations": 280, "visits": 12153, "dropoffs": 7827, "passbys": 3080, "week_start": "2020-11-30"}, {"id": "2020-W48", "imputed": false, "activities": 25314, "visit_observations": 268, "visits": 18832, "dropoffs": 6482, "passbys": 3826, "week_start": "2020-11-23"}, {"id": "2020-W47", "imputed": false, "activities": 18009, "visit_observations": 214, "visits": 13704, "dropoffs": 4305, "passbys": 2410, "week_start": "2020-11-16"}, {"id": "2020-W46", "imputed": false, "activities": 23989, "visit_observations": 295, "visits": 13665, "dropoffs": 10324, "passbys": 4311, "week_start": "2020-11-09"}, {"id": "2020-W45", "imputed": false, "activities": 24506, "visit_observations": 284, "visits": 15697, "dropoffs": 8808, "passbys": 4299, "week_start": "2020-11-02"}, {"id": "2020-W44", "imputed": false, "activities": 20089, "visit_observations": 258, "visits": 13197, "dropoffs": 6892, "passbys": 3518, "week_start": "2020-10-26"}, {"id": "2020-W43", "imputed": false, "activities": 29656, "visit_observations": 361, "visits": 20242, "dropoffs": 9414, "passbys": 5133, "week_start": "2020-10-19"}, {"id": "2020-W42", "imputed": false, "activities": 22737, "visit_observations": 301, "visits": 18464, "dropoffs": 4274, "passbys": 4815, "week_start": "2020-10-12"}, {"id": "2020-W41", "imputed": false, "activities": 20074, "visit_observations": 295, "visits": 14505, "dropoffs": 5569, "passbys": 4275, "week_start": "2020-10-05"}, {"id": "2020-W40", "imputed": false, "activities": 31089, "visit_observations": 345, "visits": 22319, "dropoffs": 8771, "passbys": 6198, "week_start": "2020-09-28"}, {"id": "2020-W39", "imputed": false, "activities": 27581, "visit_observations": 302, "visits": 19549, "dropoffs": 8032, "passbys": 4028, "week_start": "2020-09-21"}, {"id": "2020-W38", "imputed": false, "activities": 36362, "visit_observations": 404, "visits": 21866, "dropoffs": 14496, "passbys": 5271, "week_start": "2020-09-14"}, {"id": "2020-W37", "imputed": false, "activities": 28146, "visit_observations": 356, "visits": 19125, "dropoffs": 9021, "passbys": 5496, "week_start": "2020-09-07"}, {"id": "2020-W36", "imputed": false, "activities": 21788, "visit_observations": 286, "visits": 15278, "dropoffs": 6509, "passbys": 3563, "week_start": "2020-08-31"}, {"id": "2020-W35", "imputed": false, "activities": 32711, "visit_observations": 377, "visits": 21455, "dropoffs": 11256, "passbys": 4014, "week_start": "2020-08-24"}, {"id": "2020-W34", "imputed": false, "activities": 34841, "visit_observations": 420, "visits": 23504, "dropoffs": 11337, "passbys": 6492, "week_start": "2020-08-17"}, {"id": "2020-W33", "imputed": false, "activities": 35282, "visit_observations": 427, "visits": 23669, "dropoffs": 11613, "passbys": 5336, "week_start": "2020-08-10"}, {"id": "2020-W32", "imputed": false, "activities": 33895, "visit_observations": 411, "visits": 25969, "dropoffs": 7927, "passbys": 4691, "week_start": "2020-08-03"}, {"id": "2020-W31", "imputed": false, "activities": 31922, "visit_observations": 401, "visits": 24436, "dropoffs": 7487, "passbys": 4091, "week_start": "2020-07-27"}, {"id": "2020-W30", "imputed": false, "activities": 32102, "visit_observations": 412, "visits": 24727, "dropoffs": 7375, "passbys": 6471, "week_start": "2020-07-20"}, {"id": "2020-W29", "imputed": false, "activities": 25418, "visit_observations": 301, "visits": 19676, "dropoffs": 5742, "passbys": 5401, "week_start": "2020-07-13"}, {"id": "2020-W28", "imputed": false, "activities": 31986, "visit_observations": 359, "visits": 25157, "dropoffs": 6829, "passbys": 5016, "week_start": "2020-07-06"}, {"id": "2020-W27", "imputed": false, "activities": 34855, "visit_observations": 360, "visits": 26343, "dropoffs": 8512, "passbys": 4037, "week_start": "2020-06-29"}, {"id": "2020-W26", "imputed": false, "activities": 31339, "visit_observations": 368, "visits": 21171, "dropoffs": 10168, "passbys": 5943, "week_start": "2020-06-22"}, {"id": "2020-W25", "imputed": false, "activities": 36390, "visit_observations": 425, "visits": 24595, "dropoffs": 11795, "passbys": 5689, "week_start": "2020-06-15"}, {"id": "2020-W24", "imputed": false, "activities": 33805, "visit_observations": 410, "visits": 25537, "dropoffs": 8268, "passbys": 4618, "week_start": "2020-06-08"}, {"id": "2020-W23", "imputed": false, "activities": 52471, "visit_observations": 543, "visits": 41672, "dropoffs": 10799, "passbys": 7750, "week_start": "2020-06-01"}, {"id": "2020-W22", "imputed": false, "activities": 51074, "visit_observations": 529, "visits": 37965, "dropoffs": 13109, "passbys": 4797, "week_start": "2020-05-25"}, {"id": "2020-W21", "imputed": false, "activities": 43425, "visit_observations": 469, "visits": 36413, "dropoffs": 7011, "passbys": 4670, "week_start": "2020-05-18"}, {"id": "2020-W20", "imputed": false, "activities": 35396, "visit_observations": 430, "visits": 26144, "dropoffs": 9252, "passbys": 4119, "week_start": "2020-05-11"}, {"id": "2020-W19", "imputed": false, "activities": 30391, "visit_observations": 428, "visits": 19035, "dropoffs": 11355, "passbys": 3898, "week_start": "2020-05-04"}, {"id": "2020-W18", "imputed": false, "activities": 49784, "visit_observations": 311, "visits": 32967, "dropoffs": 16817, "passbys": 7481, "week_start": "2020-04-27"}, {"id": "2020-W17", "imputed": false, "activities": 41111, "visit_observations": 265, "visits": 29141, "dropoffs": 11970, "passbys": 7242, "week_start": "2020-04-20"}, {"id": "2020-W16", "imputed": false, "activities": 26038, "visit_observations": 175, "visits": 13554, "dropoffs": 12484, "passbys": 6227, "week_start": "2020-04-13"}, {"id": "2020-W15", "imputed": false, "activities": 48589, "visit_observations": 289, "visits": 30335, "dropoffs": 18254, "passbys": 4107, "week_start": "2020-04-06"}, {"id": "2020-W14", "imputed": false, "activities": 45635, "visit_observations": 269, "visits": 34093, "dropoffs": 11543, "passbys": 4890, "week_start": "2020-03-30"}, {"id": "2020-W13", "imputed": false, "activities": 45409, "visit_observations": 286, "visits": 33550, "dropoffs": 11859, "passbys": 3176, "week_start": "2020-03-23"}, {"id": "2020-W12", "imputed": false, "activities": 43834, "visit_observations": 300, "visits": 25052, "dropoffs": 18782, "passbys": 6442, "week_start": "2020-03-16"}, {"id": "2020-W11", "imputed": false, "activities": 35663, "visit_observations": 303, "visits": 17352, "dropoffs": 18311, "passbys": 7265, "week_start": "2020-03-09"}, {"id": "2020-W10", "imputed": false, "activities": 38881, "visit_observations": 345, "visits": 20630, "dropoffs": 18251, "passbys": 7409, "week_start": "2020-03-02"}, {"id": "2020-W09", "imputed": false, "activities": 57064, "visit_observations": 503, "visits": 36872, "dropoffs": 20192, "passbys": 6721, "week_start": "2020-02-24"}, {"id": "2020-W08", "imputed": false, "activities": 52868, "visit_observations": 457, "visits": 34640, "dropoffs": 18228, "passbys": 7102, "week_start": "2020-02-17"}, {"id": "2020-W07", "imputed": false, "activities": 44894, "visit_observations": 393, "visits": 30460, "dropoffs": 14435, "passbys": 7288, "week_start": "2020-02-10"}, {"id": "2020-W06", "imputed": false, "activities": 44301, "visit_observations": 455, "visits": 25323, "dropoffs": 18978, "passbys": 7306, "week_start": "2020-02-03"}, {"id": "2020-W05", "imputed": false, "activities": 43533, "visit_observations": 338, "visits": 24049, "dropoffs": 19484, "passbys": 7661, "week_start": "2020-01-27"}, {"id": "2020-W04", "imputed": false, "activities": 56967, "visit_observations": 477, "visits": 40160, "dropoffs": 16807, "passbys": 11646, "week_start": "2020-01-20"}, {"id": "2020-W03", "imputed": false, "activities": 38902, "visit_observations": 328, "visits": 24930, "dropoffs": 13972, "passbys": 6250, "week_start": "2020-01-13"}, {"id": "2020-W02", "imputed": false, "activities": 50066, "visit_observations": 425, "visits": 33626, "dropoffs": 16440, "passbys": 7707, "week_start": "2020-01-06"}, {"id": "2020-W01", "imputed": false, "activities": 56889, "visit_observations": 325, "visits": 43779, "dropoffs": 13110, "passbys": 8091, "week_start": "2019-12-30"}, {"id": "2019-W52", "imputed": false, "activities": 33415, "visit_observations": 165, "visits": 21094, "dropoffs": 12321, "passbys": 5550, "week_start": "2019-12-23"}, {"id": "2019-W51", "imputed": false, "activities": 39197, "visit_observations": 210, "visits": 27079, "dropoffs": 12118, "passbys": 7046, "week_start": "2019-12-16"}, {"id": "2019-W50", "imputed": false, "activities": 37179, "visit_observations": 197, "visits": 24227, "dropoffs": 12952, "passbys": 5876, "week_start": "2019-12-09"}, {"id": "2019-W49", "imputed": false, "activities": 33668, "visit_observations": 207, "visits": 19210, "dropoffs": 14458, "passbys": 8785, "week_start": "2019-12-02"}, {"id": "2019-W48", "imputed": false, "activities": 21440, "visit_observations": 138, "visits": 13770, "dropoffs": 7670, "passbys": 6947, "week_start": "2019-11-25"}, {"id": "2019-W47", "imputed": false, "activities": 25164, "visit_observations": 158, "visits": 17522, "dropoffs": 7642, "passbys": 6947, "week_start": "2019-11-18"}, {"id": "2019-W46", "imputed": false, "activities": 37579, "visit_observations": 235, "visits": 25348, "dropoffs": 12231, "passbys": 9348, "week_start": "2019-11-11"}, {"id": "2019-W45", "imputed": false, "activities": 31344, "visit_observations": 174, "visits": 20825, "dropoffs": 10519, "passbys": 7363, "week_start": "2019-11-04"}, {"id": "2019-W44", "imputed": false, "activities": 30771, "visit_observations": 178, "visits": 19953, "dropoffs": 10818, "passbys": 6194, "week_start": "2019-10-28"}, {"id": "2019-W43", "imputed": false, "activities": 35871, "visit_observations": 201, "visits": 26542, "dropoffs": 9330, "passbys": 7972, "week_start": "2019-10-21"}, {"id": "2019-W42", "imputed": false, "activities": 32655, "visit_observations": 197, "visits": 22061, "dropoffs": 10594, "passbys": 6413, "week_start": "2019-10-14"}, {"id": "2019-W41", "imputed": false, "activities": 33469, "visit_observations": 188, "visits": 25242, "dropoffs": 8227, "passbys": 6858, "week_start": "2019-10-07"}, {"id": "2019-W40", "imputed": false, "activities": 32667, "visit_observations": 189, "visits": 27234, "dropoffs": 5433, "passbys": 4188, "week_start": "2019-09-30"}, {"id": "2019-W39", "imputed": false, "activities": 40037, "visit_observations": 324, "visits": 29759, "dropoffs": 10278, "passbys": 6348, "week_start": "2019-09-23"}, {"id": "2019-W38", "imputed": false, "activities": 37936, "visit_observations": 382, "visits": 28550, "dropoffs": 9386, "passbys": 9447, "week_start": "2019-09-16"}, {"id": "2019-W37", "imputed": false, "activities": 39808, "visit_observations": 521, "visits": 29730, "dropoffs": 10078, "passbys": 10993, "week_start": "2019-09-09"}, {"id": "2019-W36", "imputed": false, "activities": 32851, "visit_observations": 375, "visits": 22099, "dropoffs": 10752, "passbys": 6753, "week_start": "2019-09-02"}, {"id": "2019-W35", "imputed": false, "activities": 47594, "visit_observations": 475, "visits": 34171, "dropoffs": 13423, "passbys": 16724, "week_start": "2019-08-26"}, {"id": "2019-W34", "imputed": false, "activities": 45800, "visit_observations": 456, "visits": 30411, "dropoffs": 15389, "passbys": 14118, "week_start": "2019-08-19"}, {"id": "2019-W33", "imputed": false, "activities": 47636, "visit_observations": 403, "visits": 34348, "dropoffs": 13289, "passbys": 9370, "week_start": "2019-08-12"}, {"id": "2019-W32", "imputed": false, "activities": 44913, "visit_observations": 365, "visits": 35512, "dropoffs": 9400, "passbys": 8346, "week_start": "2019-08-05"}, {"id": "2019-W31", "imputed": false, "activities": 47253, "visit_observations": 358, "visits": 36363, "dropoffs": 10890, "passbys": 8222, "week_start": "2019-07-29"}, {"id": "2019-W30", "imputed": false, "activities": 53337, "visit_observations": 461, "visits": 37594, "dropoffs": 15743, "passbys": 16714, "week_start": "2019-07-22"}, {"id": "2019-W29", "imputed": false, "activities": 44470, "visit_observations": 392, "visits": 35046, "dropoffs": 9424, "passbys": 10210, "week_start": "2019-07-15"}, {"id": "2019-W28", "imputed": false, "activities": 64412, "visit_observations": 522, "visits": 50076, "dropoffs": 14336, "passbys": 10836, "week_start": "2019-07-08"}, {"id": "2019-W27", "imputed": false, "activities": 72258, "visit_observations": 601, "visits": 51330, "dropoffs": 20928, "passbys": 12733, "week_start": "2019-07-01"}, {"id": "2019-W26", "imputed": false, "activities": 62397, "visit_observations": 484, "visits": 47854, "dropoffs": 14543, "passbys": 9201, "week_start": "2019-06-24"}, {"id": "2019-W25", "imputed": false, "activities": 48152, "visit_observations": 488, "visits": 35167, "dropoffs": 12985, "passbys": 12082, "week_start": "2019-06-17"}, {"id": "2019-W24", "imputed": false, "activities": 60290, "visit_observations": 627, "visits": 43666, "dropoffs": 16625, "passbys": 13215, "week_start": "2019-06-10"}, {"id": "2019-W23", "imputed": false, "activities": 43321, "visit_observations": 491, "visits": 31298, "dropoffs": 12023, "passbys": 12979, "week_start": "2019-06-03"}, {"id": "2019-W22", "imputed": false, "activities": 53744, "visit_observations": 547, "visits": 38319, "dropoffs": 15425, "passbys": 10172, "week_start": "2019-05-27"}, {"id": "2019-W21", "imputed": false, "activities": 53328, "visit_observations": 553, "visits": 37687, "dropoffs": 15641, "passbys": 8506, "week_start": "2019-05-20"}, {"id": "2019-W20", "imputed": false, "activities": 47391, "visit_observations": 586, "visits": 32590, "dropoffs": 14801, "passbys": 11617, "week_start": "2019-05-13"}, {"id": "2019-W19", "imputed": false, "activities": 47017, "visit_observations": 612, "visits": 34124, "dropoffs": 12893, "passbys": 12418, "week_start": "2019-05-06"}, {"id": "2019-W18", "imputed": false, "activities": 46366, "visit_observations": 561, "visits": 34250, "dropoffs": 12116, "passbys": 7917, "week_start": "2019-04-29"}, {"id": "2019-W17", "imputed": false, "activities": 27300, "visit_observations": 373, "visits": 19378, "dropoffs": 7923, "passbys": 6425, "week_start": "2019-04-22"}, {"id": "2019-W16", "imputed": false, "activities": 34511, "visit_observations": 491, "visits": 22402, "dropoffs": 12109, "passbys": 11886, "week_start": "2019-04-15"}, {"id": "2019-W15", "imputed": false, "activities": 28892, "visit_observations": 415, "visits": 18509, "dropoffs": 10383, "passbys": 10469, "week_start": "2019-04-08"}, {"id": "2019-W14", "imputed": false, "activities": 33051, "visit_observations": 406, "visits": 23729, "dropoffs": 9322, "passbys": 10381, "week_start": "2019-04-01"}, {"id": "2019-W13", "imputed": false, "activities": 43672, "visit_observations": 505, "visits": 30551, "dropoffs": 13121, "passbys": 9905, "week_start": "2019-03-25"}, {"id": "2019-W12", "imputed": false, "activities": 28693, "visit_observations": 388, "visits": 20465, "dropoffs": 8229, "passbys": 8274, "week_start": "2019-03-18"}, {"id": "2019-W11", "imputed": false, "activities": 34605, "visit_observations": 420, "visits": 24154, "dropoffs": 10451, "passbys": 8613, "week_start": "2019-03-11"}, {"id": "2019-W10", "imputed": false, "activities": 33453, "visit_observations": 503, "visits": 23037, "dropoffs": 10416, "passbys": 9982, "week_start": "2019-03-04"}, {"id": "2019-W09", "imputed": false, "activities": 19790, "visit_observations": 369, "visits": 12942, "dropoffs": 6849, "passbys": 7935, "week_start": "2019-02-25"}, {"id": "2019-W08", "imputed": false, "activities": 17003, "visit_observations": 351, "visits": 11738, "dropoffs": 5265, "passbys": 5597, "week_start": "2019-02-18"}, {"id": "2019-W07", "imputed": false, "activities": 13634, "visit_observations": 287, "visits": 8657, "dropoffs": 4977, "passbys": 7849, "week_start": "2019-02-11"}, {"id": "2019-W06", "imputed": false, "activities": 16132, "visit_observations": 293, "visits": 10572, "dropoffs": 5560, "passbys": 6450, "week_start": "2019-02-04"}, {"id": "2019-W05", "imputed": false, "activities": 15119, "visit_observations": 372, "visits": 12577, "dropoffs": 2542, "passbys": 4860, "week_start": "2019-01-28"}, {"id": "2019-W04", "imputed": false, "activities": 21157, "visit_observations": 385, "visits": 14830, "dropoffs": 6327, "passbys": 7073, "week_start": "2019-01-21"}, {"id": "2019-W03", "imputed": false, "activities": 19526, "visit_observations": 421, "visits": 14965, "dropoffs": 4561, "passbys": 6943, "week_start": "2019-01-14"}, {"id": "2019-W02", "imputed": false, "activities": 34190, "visit_observations": 745, "visits": 27732, "dropoffs": 6458, "passbys": 5810, "week_start": "2019-01-07"}, {"id": "2019-W01", "imputed": false, "activities": 28394, "visit_observations": 562, "visits": 22031, "dropoffs": 6363, "passbys": 5873, "week_start": "2018-12-31"}]}, "percent_visits": {"day": [{"id": "mo", "description": "Monday", "value": 0.1391, "hourly": [0.0564, 0.0571, 0.0629, 0.0567, 0.0553, 0.0546, 0.0433, 0.0428, 0.0387, 0.0381, 0.0364, 0.0362, 0.028, 0.0342, 0.034, 0.0256, 0.0261, 0.0228, 0.0262, 0.0317, 0.0481, 0.0498, 0.0528, 0.0423]}, {"id": "tu", "description": "Tuesday", "value": 0.1574, "hourly": [0.0615, 0.0627, 0.0645, 0.0593, 0.0633, 0.0621, 0.04, 0.0326, 0.0317, 0.0333, 0.0387, 0.0369, 0.0367, 0.0348, 0.0359, 0.0251, 0.0203, 0.0273, 0.0294, 0.0287, 0.028, 0.0498, 0.0466, 0.0506]}, {"id": "we", "description": "Wednesday", "value": 0.1611, "hourly": [0.0537, 0.0618, 0.0546, 0.0459, 0.054, 0.0572, 0.0407, 0.032, 0.0229, 0.0227, 0.0278, 0.032, 0.0337, 0.0336, 0.033, 0.0287, 0.0341, 0.0497, 0.0524, 0.0288, 0.0466, 0.0511, 0.0553, 0.0475]}, {"id": "th", "description": "Thursday", "value": 0.1408, "hourly": [0.056, 0.0653, 0.052, 0.0588, 0.0625, 0.0563, 0.0401, 0.0277, 0.0306, 0.0308, 0.0369, 0.0297, 0.0314, 0.0384, 0.034, 0.0347, 0.0396, 0.0303, 0.0314, 0.0293, 0.0435, 0.0431, 0.0444, 0.0533]}, {"id": "fr", "description": "Friday", "value": 0.1239, "hourly": [0.0599, 0.0565, 0.0603, 0.0577, 0.0576, 0.0613, 0.0549, 0.0315, 0.0316, 0.033, 0.0301, 0.0271, 0.0278, 0.0337, 0.0313, 0.0311, 0.0341, 0.0362, 0.03, 0.0274, 0.0203, 0.0501, 0.0579, 0.0584]}, {"id": "sa", "description": "Saturday", "value": 0.1193, "hourly": [0.0703, 0.0759, 0.0665, 0.0624, 0.0652, 0.0576, 0.0552, 0.0632, 0.0554, 0.0382, 0.0446, 0.0315, 0.0225, 0.0393, 0.0378, 0.0215, 0.0267, 0.0216, 0.0169, 0.0085, 0.0118, 0.0328, 0.0372, 0.0376]}, {"id": "su", "description": "Sunday", "value": 0.1583, "hourly": [0.0476, 0.041, 0.0422, 0.0453, 0.0449, 0.0484, 0.0462, 0.0457, 0.0422, 0.0399, 0.0294, 0.0323, 0.0212, 0.0266, 0.036, 0.0339, 0.0381, 0.0375, 0.0448, 0.0445, 0.0398, 0.0516, 0.0651, 0.0557]}], "daily_dwell_bins": [{"id": "persons_000_030min", "description": "Less than 30 minutes", "value": 0.8194}, {"id": "persons_030_060min", "description": "30 minutes to 59 minutes", "value": 0.0631}, {"id": "persons_060_120min", "description": "1 hour to 1 hour 59 minutes", "value": 0.0222}, {"id": "persons_120_240min", "description": "2 hours to 3 hours 59 minutes", "value": 0.0375}, {"id": "persons_240_plus", "description": "4 hours or more", "value": 0.0578}], "segment": {"basic_demographics": [{"category": "age", "segments": [{"id": "age_25t34", "description": "Population, Age 25 - 34", "value": 0.2418, "index": 1.7388428239963116}, {"id": "age_35t44", "description": "Population, Age 35 - 44", "value": 0.1712, "index": 1.2192928629625068}, {"id": "age_45t54", "description": "Population, Age 45 - 54", "value": 0.1307, "index": 0.9796977512514441}, {"id": "age_55t64", "description": "Population, Age 55 - 64", "value": 0.1157, "index": 0.911363137558224}, {"id": "age_65t74", "description": "Population, Age 65 - 74", "value": 0.0733, "index": 0.8094832111379863}, {"id": "age_18t24", "description": "Population, Age 18 - 24", "value": 0.0705, "index": 0.8042080243638334}, {"id": "age_75plus", "description": "Population, Age 75+", "value": 0.0469, "index": 0.769468228902692}, {"id": "age_00t17", "description": "Population, Age 0 - 17", "value": 0.1498, "index": 0.6650813275761428}]}, {"category": "age_plus", "segments": [{"id": "age_21plus", "description": "Population, Age 21+", "value": 0.8238, "index": 1.1191482611213335}, {"id": "age_18plus", "description": "Population, Age 18+", "value": 0.8502, "index": 1.0966385066344597}, {"id": "age_00plus", "description": "All Persons", "value": 1.0, "index": 1.0}]}, {"category": "ethnicity", "segments": [{"id": "ethnic_nonhisp", "description": "Population, Not Hispanic/Latino", "value": 0.8692, "index": 1.035733897536724}, {"id": "ethnic_hispanic", "description": "Population, Hispanic/Latino", "value": 0.1307, "index": 0.7999222219041546}]}, {"category": "gender", "segments": [{"id": "gender_male", "description": "Population, Male", "value": 0.5007, "index": 1.0207764005838666}, {"id": "gender_female", "description": "Population, Female", "value": 0.4993, "index": 0.9791465984817898}]}, {"category": "hh_income", "segments": [{"id": "hhi_100t199", "description": "Households, Household Income $100,000 - $199,999", "value": 0.3942, "index": 1.2254867118739594}, {"id": "hhi_050t099", "description": "Households, Household Income $50,000 - $99,999", "value": 0.2667, "index": 1.1013777190431528}, {"id": "hhi_000t019", "description": "Households, Household Income < $19,999", "value": 0.072, "index": 0.9417917721854286}, {"id": "hhi_020t034", "description": "Households, Household Income $20,000 - $34,999", "value": 0.0559, "index": 0.8090939111202832}, {"id": "hhi_200plus", "description": "Households, Household Income $200,000+", "value": 0.1598, "index": 0.6940513961648025}, {"id": "hhi_035t049", "description": "Households, Household Income $35,000 - $49,999", "value": 0.0514, "index": 0.682844301236535}]}, {"category": "prizm", "segments": [{"id": "pz_seg31", "description": "Connected Bohemians", "value": 0.4036, "index": 1.3462920137100904}, {"id": "pz_seg17", "description": "Urban Elders", "value": 0.0755, "index": 0.8271490299510118}, {"id": "pz_seg04", "description": "Young Digerati", "value": 0.0652, "index": 0.2313905206130362}, {"id": "pz_seg67", "description": "Park Bench Seniors", "value": 0.0114, "index": 0.22098483740824437}, {"id": "pz_seg36", "description": "Toolbelt Traditionalists", "value": 0.0147, "index": 0.21263103711495812}, {"id": "pz_seg12", "description": "Cruisin' to Retirement", "value": 0.0313, "index": 0.20215418786662634}, {"id": "pz_seg21", "description": "The Cosmopolitans", "value": 0.0246, "index": 0.19035449591238338}, {"id": "pz_seg66", "description": "New Beginnings", "value": 0.0127, "index": 0.1564067777023831}, {"id": "pz_seg20", "description": "Empty Nests", "value": 0.0105, "index": 0.14303976895862267}, {"id": "pz_seg59", "description": "New Melting Pot", "value": 0.0306, "index": 0.13447481986908102}, {"id": "pz_seg16", "description": "Beltway Boomers", "value": 0.0119, "index": 0.12562341943235195}, {"id": "pz_seg22", "description": "Middleburg Managers", "value": 0.0088, "index": 0.12473806897649599}, {"id": "pz_seg26", "description": "Home Sweet Home", "value": 0.008, "index": 0.11166949287808023}, {"id": "pz_seg19", "description": "American Dreams", "value": 0.0168, "index": 0.1108891386856352}, {"id": "pz_seg50", "description": "Metro Grads", "value": 0.0057, "index": 0.10544106551257686}, {"id": "pz_seg14", "description": "Kids & Cul-de-Sacs", "value": 0.0104, "index": 0.09860405605371743}, {"id": "pz_seg30", "description": "Pools & Patios", "value": 0.011, "index": 0.08978381880836345}, {"id": "pz_seg33", "description": "Second City Startups", "value": 0.0073, "index": 0.0880887712384946}, {"id": "pz_seg49", "description": "American Classics", "value": 0.0043, "index": 0.08597003421788188}, {"id": "pz_seg08", "description": "Gray Power", "value": 0.0066, "index": 0.08460381540925294}, {"id": "pz_seg47", "description": "Striving Selfies", "value": 0.0071, "index": 0.08435565386274048}, {"id": "pz_seg40", "description": "Aspiring A-Listers", "value": 0.0153, "index": 0.08214152085976988}, {"id": "pz_seg09", "description": "Big Fish, Small Pond", "value": 0.0091, "index": 0.06602711728305916}, {"id": "pz_seg25", "description": "Up-and-Comers", "value": 0.0046, "index": 0.06556565105000821}, {"id": "pz_seg44", "description": "Country Strong", "value": 0.0082, "index": 0.06398889810506772}, {"id": "pz_seg48", "description": "Generation Web", "value": 0.0064, "index": 0.06306953587667724}, {"id": "pz_seg13", "description": "Upward Bound", "value": 0.0055, "index": 0.061388281380036464}, {"id": "pz_seg39", "description": "Kid Country, USA", "value": 0.0036, "index": 0.059667183271531705}, {"id": "pz_seg32", "description": "Traditional Times", "value": 0.0036, "index": 0.05513931643407107}, {"id": "pz_seg52", "description": "Simple Pleasures", "value": 0.0035, "index": 0.05444277610546323}, {"id": "pz_seg05", "description": "Country Squires", "value": 0.0232, "index": 0.05251878118299155}, {"id": "pz_seg41", "description": "Domestic Duos", "value": 0.0039, "index": 0.04966792890115624}, {"id": "pz_seg61", "description": "Second City Generations", "value": 0.0057, "index": 0.04686926430887151}, {"id": "pz_seg46", "description": "Heartlanders", "value": 0.0028, "index": 0.043680158853132256}, {"id": "pz_seg06", "description": "Winner's Circle", "value": 0.0072, "index": 0.041446556427182896}, {"id": "pz_seg55", "description": "Red, White & Blue", "value": 0.0026, "index": 0.040069812472597284}, {"id": "pz_seg11", "description": "Fast-Track Families", "value": 0.0163, "index": 0.03992804281438399}, {"id": "pz_seg38", "description": "Hometown Retired", "value": 0.0027, "index": 0.03945616979468746}, {"id": "pz_seg34", "description": "Young & Influential", "value": 0.0043, "index": 0.038712402164855234}, {"id": "pz_seg29", "description": "White Picket Fences", "value": 0.0067, "index": 0.037808039185337775}, {"id": "pz_seg23", "description": "Township Travelers", "value": 0.0051, "index": 0.03354322630676936}, {"id": "pz_seg15", "description": "New Homesteaders", "value": 0.004, "index": 0.03309774424825529}, {"id": "pz_seg28", "description": "Country Casuals", "value": 0.0043, "index": 0.03292583605716492}, {"id": "pz_seg62", "description": "Crossroad Villagers", "value": 0.0017, "index": 0.03180311027422904}, {"id": "pz_seg37", "description": "Bright Lights, Li'l City", "value": 0.0019, "index": 0.03153092329356152}, {"id": "pz_seg18", "description": "Mayberry-ville", "value": 0.0088, "index": 0.02980073127409574}, {"id": "pz_seg58", "description": "Golden Ponds", "value": 0.0023, "index": 0.028605462738317454}, {"id": "pz_seg57", "description": "Back Country Folks", "value": 0.0022, "index": 0.026380411484482644}, {"id": "pz_seg02", "description": "Networked Neighbors", "value": 0.0038, "index": 0.023995160829553323}, {"id": "pz_seg24", "description": "Pickup Patriarchs", "value": 0.0024, "index": 0.023075607776942276}, {"id": "pz_seg43", "description": "City Roots", "value": 0.0044, "index": 0.02299970063141753}, {"id": "pz_seg53", "description": "Lo-Tech Singles", "value": 0.0012, "index": 0.022752060964464856}, {"id": "pz_seg10", "description": "Executive Suites", "value": 0.0017, "index": 0.022199782347439884}, {"id": "pz_seg54", "description": "Struggling Singles", "value": 0.0021, "index": 0.020996743798149062}, {"id": "pz_seg45", "description": "Urban Modern Mix", "value": 0.0055, "index": 0.020754150650538348}, {"id": "pz_seg27", "description": "Big Sky Families", "value": 0.0036, "index": 0.020142177438408987}, {"id": "pz_seg51", "description": "Campers & Camo", "value": 0.0017, "index": 0.016947033214632624}, {"id": "pz_seg07", "description": "Money & Brains", "value": 0.0026, "index": 0.015633719634471237}, {"id": "pz_seg56", "description": "Multi-Culti Families", "value": 0.0115, "index": 0.011747347963899854}, {"id": "pz_seg65", "description": "Young & Rustic", "value": 0.0005, "index": 0.007395296699206733}, {"id": "pz_seg03", "description": "Movers & Shakers", "value": 0.0014, "index": 0.0053257148846981486}, {"id": "pz_seg01", "description": "Upper Crust", "value": 0.001, "index": 0.005004716910552581}, {"id": "pz_seg60", "description": "Small-Town Collegiates", "value": 0.0004, "index": 0.003826943264504636}, {"id": "pz_seg63", "description": "Low-Rise Living", "value": 0.0019, "index": 0.003813222123951908}, {"id": "pz_seg35", "description": "Urban Achievers", "value": 0.0012, "index": 0.0037922773778040378}, {"id": "pz_seg68", "description": "Bedrock America", "value": 0.0001, "index": 0.0017338246167824458}, {"id": "pz_seg42", "description": "Multi-Culti Mosaic", "value": 0.0003, "index": 0.0003401606191173641}, {"id": "pz_seg64", "description": "Family Thrifts", "value": 0.0, "index": 2.3428001838217326e-05}]}, {"category": "race", "segments": [{"id": "race_white", "description": "Population, White Alone", "value": 0.5788, "index": 1.0461313270236126}, {"id": "race_black", "description": "Population, Black/African American Alone", "value": 0.2398, "index": 0.9799587535549366}, {"id": "race_multiple", "description": "Population, Two or More Races", "value": 0.0426, "index": 0.9334096823037082}, {"id": "race_asian", "description": "Population, Asian Alone", "value": 0.095, "index": 0.8242918069533934}, {"id": "race_other", "description": "Population, Some Other Race Alone", "value": 0.0375, "index": 0.4283017571021488}, {"id": "race_native", "description": "Population, American Indian/Alaskan Native Alone", "value": 0.0004, "index": 0.026837020552329654}, {"id": "race_island", "description": "Population, Native Hawaiian/Pacific Islander Alone", "value": 0.0001, "index": 0.009096531886834142}]}], "consumer": [{"category": "alcohol", "segments": [{"id": "01005", "description": "Hard cider drank past 30 days Any hard cider", "value": 0.1134, "index": 1.709269838704122}, {"id": "01026", "description": "Types of alcoholic beverages drink Hard cider", "value": 0.2171, "index": 1.626202858645272}, {"id": "01015", "description": "Liquor drank past 30 days Gin", "value": 0.1169, "index": 1.6231601742875956}, {"id": "01009", "description": "Liquor drank past 30 days Blended or rye whiskey", "value": 0.0784, "index": 1.5574490047719634}, {"id": "01020", "description": "Liquor drank past 30 days Tequila", "value": 0.2175, "index": 1.4528603264154838}, {"id": "01031", "description": "Wine (types) bought past 3 months Any champagne or sparkling wine", "value": 0.162, "index": 1.4276774061977453}, {"id": "01017", "description": "Liquor drank past 30 days Pre-mixed cocktails (with liquor)", "value": 0.0807, "index": 1.4191716633045925}, {"id": "01024", "description": "Microbrew/craft beer drank past 30 days Any microbrew/craft beer", "value": 0.1602, "index": 1.4159783535042048}, {"id": "01030", "description": "Wine (types) bought past 3 months Any blush or rose wine", "value": 0.134, "index": 1.3792996432792064}, {"id": "01019", "description": "Liquor drank past 30 days Scotch whisky", "value": 0.0862, "index": 1.2941869714428533}, {"id": "01023", "description": "Malt liquor drank past 30 days Any malt liquor", "value": 0.0196, "index": 1.284391539862524}, {"id": "01021", "description": "Liquor drank past 30 days Vodka", "value": 0.2693, "index": 1.2432999401049947}, {"id": "01008", "description": "Liquor drank past 30 days Any white good past 30 days", "value": 0.4301, "index": 1.2396133980437214}, {"id": "01006", "description": "Imported beer drank past 30 days Any imported beer past 30 days", "value": 0.2738, "index": 1.2384875199643077}, {"id": "01010", "description": "Liquor drank past 30 days Bourbon whiskey", "value": 0.1912, "index": 1.2364954645442026}, {"id": "01004", "description": "Domestic regular beer drank past 30 days Any domestic reg beer past 30 days", "value": 0.2829, "index": 1.2238272866078785}, {"id": "01003", "description": "Domestic reg beer drank past 30 days Any domestic regular beer past 30 days", "value": 0.2881, "index": 1.2164701232674509}, {"id": "01007", "description": "Liquor drank past 30 days Any whiskey past 30 days", "value": 0.2569, "index": 1.2134503349718786}, {"id": "01018", "description": "Liquor drank past 30 days Rum", "value": 0.1479, "index": 1.2061342907863817}, {"id": "01013", "description": "Liquor drank past 30 days Cognac", "value": 0.0274, "index": 1.1908477657212302}, {"id": "01027", "description": "Types of alcoholic beverages drink Liquor (spirits)", "value": 0.5755, "index": 1.1790419076113778}, {"id": "01029", "description": "Types of alcoholic beverages drink Wine coolers", "value": 0.0866, "index": 1.1759802111453792}, {"id": "01032", "description": "Wine (types) bought past 3 months Any red wine", "value": 0.3344, "index": 1.16443730491942}, {"id": "01033", "description": "Wine (types) bought past 3 months Any white wine", "value": 0.3081, "index": 1.1413124041712974}, {"id": "01022", "description": "Malt alternatives drank past 30 days Any malt alternative drank past 30 days", "value": 0.0318, "index": 1.1384604816467074}, {"id": "01025", "description": "Types of alcoholic beverages drink Beer", "value": 0.5605, "index": 1.1216837439874092}, {"id": "01014", "description": "Liquor drank past 30 days Cordial - liqueur", "value": 0.0245, "index": 1.1216776754926316}, {"id": "01001", "description": "Any beer drank past 30 days Any beer (excluding non-alcoholic) past 30 days", "value": 0.4902, "index": 1.11595287873176}, {"id": "01028", "description": "Types of alcoholic beverages drink Wine", "value": 0.65, "index": 1.1036911067820152}, {"id": "01011", "description": "Liquor drank past 30 days Brandy", "value": 0.0232, "index": 1.0647344400134022}]}, {"category": "automotive", "segments": [{"id": "02036", "description": "Vehicle household plans to buy new/used/lease next 12 mon Compact car", "value": 0.0328, "index": 1.3652519750548435}, {"id": "02028", "description": "Vehicle household plans to buy new/lease next 12 months Compact car", "value": 0.0164, "index": 1.1275205831519168}, {"id": "02037", "description": "Vehicle household plans to buy new/used/lease next 12 mon Full-size car", "value": 0.021, "index": 1.120014520496269}, {"id": "02032", "description": "Vehicle household plans to buy new/lease next 12 months Midsize car", "value": 0.0198, "index": 1.0861654984783253}, {"id": "02029", "description": "Vehicle household plans to buy new/lease next 12 months Full-size car", "value": 0.0134, "index": 1.0754346048664902}, {"id": "02006", "description": "Auto insurance - plan to switch provider next 12 mths Yes", "value": 0.0707, "index": 1.0485924878558583}, {"id": "02040", "description": "Vehicle household plans to buy new/used/lease next 12 mon Midsize car", "value": 0.0397, "index": 1.0380387537237228}, {"id": "02038", "description": "Vehicle household plans to buy new/used/lease next 12 mon Hybrid or electric", "value": 0.0174, "index": 0.9901285774092171}, {"id": "02005", "description": "Any vehicle bought new/bought used/leased Any Vehicle:Leased", "value": 0.1093, "index": 0.9808279882134957}, {"id": "02015", "description": "Model type of any domestic vehicle owned or leased Subcompact:Any vehicle", "value": 0.0309, "index": 0.926050170451446}]}, {"category": "commuting and transportation", "segments": [{"id": "03009", "description": "Mode of transportation past 7 days (any purpose) Bus", "value": 0.15, "index": 2.4477111235863696}, {"id": "03013", "description": "Mode of transportation past 7 days (any purpose) On-demand car service", "value": 0.1776, "index": 2.215122439779744}, {"id": "03008", "description": "Mode of transportation past 7 days (any purpose) Bicycle", "value": 0.1016, "index": 1.7667216396600691}, {"id": "03010", "description": "Mode of transportation past 7 days (any purpose) Carpool", "value": 0.1041, "index": 1.7564263138113387}, {"id": "03014", "description": "Mode of transportation past 7 days (any purpose) Taxi", "value": 0.042, "index": 1.7370020646425117}, {"id": "03002", "description": "Distance walked in town, city or downtown area past 7 days 3 miles or more", "value": 0.3408, "index": 1.456031048861435}, {"id": "03016", "description": "Total miles traveled in car, van, truck, or bus past 7 days Less than 50 mi", "value": 0.3637, "index": 1.2369917347538812}, {"id": "03004", "description": "Minutes spent traveling to work one way 20 - 29 minutes", "value": 0.1542, "index": 1.2062990501862627}, {"id": "03005", "description": "Minutes spent traveling to work one way 30 - 59 minutes", "value": 0.1649, "index": 1.1766309112378113}, {"id": "03001", "description": "Distance walked in town, city or downtown area past 7 days 1 to 3 miles", "value": 0.2819, "index": 1.1367508471311742}, {"id": "03003", "description": "Minutes spent traveling to work one way 10 - 19 minutes", "value": 0.1686, "index": 1.071219424554518}, {"id": "03006", "description": "Minutes spent traveling to work one way Do not usually commute", "value": 0.0561, "index": 1.06307892396442}]}, {"category": "digital video displays", "segments": [{"id": "04007", "description": "Places viewed digital video displays past 6 months Office lobbies/elevators", "value": 0.2159, "index": 1.4730313712572911}, {"id": "04002", "description": "Places viewed digital video displays past 6 months Airplanes", "value": 0.3853, "index": 1.4530735547092268}, {"id": "04010", "description": "Places viewed digital video displays past 6 months Shopping malls", "value": 0.3201, "index": 1.3991219383571998}, {"id": "04003", "description": "Places viewed digital video displays past 6 months Airports", "value": 0.3663, "index": 1.3936962119458123}, {"id": "04001", "description": "Places viewed digital video displays past 6 mo Health clubs/fitness centers", "value": 0.1954, "index": 1.370093564194558}, {"id": "04009", "description": "Places viewed digital video displays past 6 months Retail stores", "value": 0.2631, "index": 1.29006320821906}, {"id": "04006", "description": "Places viewed digital video displays past 6 months Grocery stores", "value": 0.2348, "index": 1.1616551258400463}, {"id": "04008", "description": "Places viewed digital video displays past 6 months Restaurants/bars", "value": 0.4782, "index": 1.1504643513547372}, {"id": "04005", "description": "Places viewed digital video displays past 6 months Gas stations", "value": 0.4044, "index": 1.073411756347361}, {"id": "04004", "description": "Places viewed digital video displays past 6 months Doctors offices/hospitals", "value": 0.3378, "index": 0.9928160302975896}]}, {"category": "environment", "segments": [{"id": "05001", "description": "Ecofriendly activities done on a regular basis Buy organic food", "value": 0.32, "index": 1.1754539963617885}]}, {"category": "financial", "segments": [{"id": "06014", "description": "Insurance shopped for on the Internet in the past 6 months Health", "value": 0.0604, "index": 1.4744938310281022}, {"id": "06004", "description": "Banks household uses Citibank", "value": 0.0765, "index": 1.4633931227767105}, {"id": "06013", "description": "Insurance shopped for on the Internet in the past 6 months Auto", "value": 0.1101, "index": 1.3775292440522309}, {"id": "06003", "description": "Banks household uses Chase", "value": 0.3076, "index": 1.3714076079110828}, {"id": "06006", "description": "Banks household uses Internet bank (such as EtradeBank, etc.)", "value": 0.0548, "index": 1.3498846994804303}, {"id": "06018", "description": "Organizations (types) contributed money to past 12 mo Arts/cultural", "value": 0.1591, "index": 1.2582972644062893}, {"id": "06033", "description": "Professional services used by household past 12 months Online investing", "value": 0.1638, "index": 1.2501363439292612}, {"id": "06022", "description": "Organizations (types) contributed money to past 12 mo Political", "value": 0.1449, "index": 1.1562548687178962}, {"id": "06002", "description": "Banks household uses Bank of America", "value": 0.2349, "index": 1.1210218390182671}, {"id": "06029", "description": "Professional services used by household past 12 months Coin cashing service", "value": 0.0663, "index": 1.1129731970043149}]}, {"category": "food and beverages", "segments": [{"id": "07048", "description": "Grocery stores shopped past 7 days Trader Joes", "value": 0.2188, "index": 1.5704389583215286}, {"id": "07051", "description": "Grocery stores shopped past 7 days Whole Foods Market", "value": 0.1424, "index": 1.5538178562183436}, {"id": "07039", "description": "Grocery stores shopped past 7 days Any online grocery store", "value": 0.0284, "index": 1.5531660420273206}, {"id": "07013", "description": "Beverages (specialty coffee) drank past 7 days Iced specialty coffee", "value": 0.1632, "index": 1.4170616331587698}, {"id": "07037", "description": "Grocery stores shopped past 7 days Any Hispanic grocery store", "value": 0.0854, "index": 1.3651983596699497}, {"id": "07014", "description": "Convenience stores bought any item past 7 days 7-Eleven", "value": 0.1671, "index": 1.2556647545098727}, {"id": "07008", "description": "Beverages (regular soft drinks) drank past 7 days Seagrams", "value": 0.0365, "index": 1.2545422262444708}, {"id": "07043", "description": "Grocery stores shopped past 7 days Safeway", "value": 0.1071, "index": 1.2153575086277455}, {"id": "07012", "description": "Beverages (specialty coffee) drank past 7 days Hot specialty coffee", "value": 0.2392, "index": 1.1751088765791953}, {"id": "07010", "description": "Beverages (regular soft drinks) drank past 7 days Sierra Mist Natural", "value": 0.0265, "index": 1.1690874221175072}, {"id": "07003", "description": "Beverages (regular soft drinks) drank past 7 days Canada Dry", "value": 0.0795, "index": 1.1621447813472303}, {"id": "07011", "description": "Beverages (regular soft drinks) drank past 7 days Sprite", "value": 0.1134, "index": 1.1483488218381426}, {"id": "07004", "description": "Beverages (regular soft drinks) drank past 7 days Coca-Cola", "value": 0.2191, "index": 1.0747239730715552}, {"id": "07024", "description": "Food products household used past 7 days Energy bars/nutrition bars", "value": 0.2303, "index": 1.0628729455799157}]}, {"category": "health", "segments": [{"id": "08020", "description": "NonRX/health/beauty items:Stores bought past 30 days Any marijuana dispnsary", "value": 0.0375, "index": 1.8117016653055067}, {"id": "08023", "description": "RX/nonRX/health/beauty items:Stores bought pst 30 days Any marijuana dspnsry", "value": 0.0504, "index": 1.7976119405156554}, {"id": "08026", "description": "Tobacco/other related products used past 30 days Marijuana/cannabis", "value": 0.1659, "index": 1.7112442524332707}, {"id": "08025", "description": "Tobacco/other nicotine products used past 30 days Electronic cigarette", "value": 0.0547, "index": 1.4747099781624988}, {"id": "08029", "description": "Type of health insurance Medicaid/public assistance/welfare", "value": 0.1097, "index": 1.4717486892304152}, {"id": "08013", "description": "Medical services household received past 3 years Mental healthcare", "value": 0.1181, "index": 1.39057262606748}, {"id": "08017", "description": "Medical services household received past 3 years Teeth whitening, veneers", "value": 0.056, "index": 1.222255063438875}, {"id": "08001", "description": "Current health description Excellent", "value": 0.2155, "index": 1.2096445622952283}, {"id": "08028", "description": "Type of health insurance HMO (Health Maintenance Organization)", "value": 0.1667, "index": 1.0871161098821758}, {"id": "08027", "description": "Tried to quit smoking past 12 months Yes", "value": 0.0637, "index": 1.0827422146718984}]}, {"category": "items in the home", "segments": [{"id": "09009", "description": "Items/services household plans to buy in next 12 months Game console", "value": 0.0442, "index": 1.6231767762269305}, {"id": "09018", "description": "Items/services household plans to buy in next 12 months Primary house or condo", "value": 0.0264, "index": 1.3613378999013184}, {"id": "09025", "description": "Items/services household plans to buy in next 12 months Streaming media player", "value": 0.0267, "index": 1.255842957858914}, {"id": "09023", "description": "Items/services household plans to buy in next 12 months Smartphone", "value": 0.0986, "index": 1.190015383590836}, {"id": "09008", "description": "Items/services household plans to buy in next 12 months Furniture", "value": 0.13, "index": 1.1145176593219146}, {"id": "09005", "description": "Items/services household plans to buy in next 12 months Computer", "value": 0.0851, "index": 1.0857273771182856}, {"id": "09022", "description": "Items/services household plans to buy in next 12 months Smart TV", "value": 0.0465, "index": 1.079461421446932}, {"id": "09002", "description": "Furniture/mattress:Stores shopped past 12 months Any furn/mattress store", "value": 0.5462, "index": 1.0753430908394594}, {"id": "09010", "description": "Items/services household plans to buy in next 12 months High-definition TV", "value": 0.0334, "index": 0.988808496240506}, {"id": "09013", "description": "Items/services household plans to buy in next 12 months Mattress", "value": 0.105, "index": 0.9767211485460104}]}, {"category": "mri apparel & jewelry", "segments": [{"id": "10008", "description": "Use Laundry/Laundromat- 6mo", "value": 0.0925, "index": 1.5244698191309456}, {"id": "10004", "description": "Buy Running/Jogging Shoes- 1yr", "value": 0.183, "index": 1.13052777042494}, {"id": "10001", "description": "Buy Any Fine Jewelry- 1yr Any", "value": 0.2035, "index": 1.115561795625614}, {"id": "10003", "description": "Buy Clothing by Internet- 1yr", "value": 0.4275, "index": 1.0299762890372113}, {"id": "10006", "description": "Use Barber Shop- 6mo", "value": 0.2465, "index": 1.0138848037479018}, {"id": "10002", "description": "Buy Any Jewelry or Watch- 1yr", "value": 0.2518, "index": 0.9441784944905247}, {"id": "10007", "description": "Use Beauty Parlor/Salon- 6mo", "value": 0.2818, "index": 0.9200373150504834}, {"id": "10005", "description": "Buy Western Boots- 1yr", "value": 0.0139, "index": 0.7317234287847284}]}, {"category": "mri home improvements", "segments": [{"id": "11004", "description": "Use Professional Exterminator- 1yr", "value": 0.1587, "index": 0.7996179575524845}, {"id": "11002", "description": "Use Maid/Housekeeper- 1yr", "value": 0.1206, "index": 0.7697927446971248}, {"id": "11001", "description": "Has Garden", "value": 0.273, "index": 0.7478541029655474}, {"id": "11003", "description": "Use Professional Carpet Cleaning Service- 1yr", "value": 0.0392, "index": 0.636831337363036}]}, {"category": "mri psychographics", "segments": [{"id": "12008", "description": "I Like to Live a Lifestyle that Impresses Others- Agree", "value": 0.3225, "index": 1.2133534607485568}, {"id": "12009", "description": "I am Among First of my Friends to try new Technology Products- Agree", "value": 0.3128, "index": 1.1475830580439002}, {"id": "12014", "description": "Often, I Eat My Meals on the Run- Agree", "value": 0.4609, "index": 1.1458772405083344}, {"id": "12018", "description": "Use Social-Networking site- 1mo", "value": 0.8131, "index": 1.1259210953454555}, {"id": "12003", "description": "First of My Friends to Try New Products/Services- Agree", "value": 0.3378, "index": 1.1068674857111895}, {"id": "12001", "description": "Concerned about Environment When Buying Natural Products- Agree", "value": 0.58, "index": 1.081003786105974}, {"id": "12011", "description": "In General, I'd Rather Shop Online than go to a Store- Agree", "value": 0.6059, "index": 1.0721219874473875}, {"id": "12002", "description": "Concerned about Family Health When Buying Natural Products- Agree", "value": 0.5851, "index": 1.067108612023261}, {"id": "12016", "description": "Rather Book a Trip over the Internet than Meet Travel Agent- Agree", "value": 0.7434, "index": 1.0608100402910128}, {"id": "12010", "description": "I am Very Interested in the Fine Arts- Agree", "value": 0.5175, "index": 1.0549457640681403}]}, {"category": "restaurants", "segments": [{"id": "13083", "description": "Types of restaurants used past 30 days Any organic/health food restaurant", "value": 0.0864, "index": 1.9024005205377923}, {"id": "13077", "description": "Types of rest used for dinner past 30 days Any coffee house/coffee bar", "value": 0.0376, "index": 1.5335824217722795}, {"id": "13076", "description": "Types of rest used for breakfast past 30 days Any coffee house/coffee bar", "value": 0.1438, "index": 1.5097409254954561}, {"id": "13082", "description": "Types of restaurants used past 30 days Any coffee house/coffee bar", "value": 0.2774, "index": 1.5049138732513}, {"id": "13014", "description": "Quick service restaurants used past 30 days Chipotle", "value": 0.1826, "index": 1.421984953658759}, {"id": "13081", "description": "Types of restaurants used past 30 days Any bakery", "value": 0.1784, "index": 1.4138967414663919}, {"id": "13043", "description": "Quick service restaurants used past 30 days Wingstop", "value": 0.0453, "index": 1.4039615027800953}, {"id": "13038", "description": "Quick service restaurants used past 30 days Starbucks", "value": 0.2585, "index": 1.4021960080459266}, {"id": "13010", "description": "Quick service restaurants used past 30 days Auntie Annes", "value": 0.0201, "index": 1.241757497118389}, {"id": "13023", "description": "Quick service restaurants used past 30 days Jack in the box", "value": 0.0642, "index": 1.2033436562366917}, {"id": "13054", "description": "Sitdown restaurants used past 30 days Buffalo Wild Wings", "value": 0.0628, "index": 1.1798472963295934}, {"id": "13075", "description": "Sitdown restaurants used past 30 days The Cheesecake Factory", "value": 0.0458, "index": 1.1628374950455072}, {"id": "13080", "description": "Types of restaurants used past 30 days Any Mexican restaurant", "value": 0.3694, "index": 1.1594829875389359}, {"id": "13079", "description": "Types of restaurants used past 30 days Any Italian restaurant", "value": 0.2052, "index": 1.1554119012841555}, {"id": "13042", "description": "Quick service restaurants used past 30 days White Castle", "value": 0.0224, "index": 1.149325747102699}, {"id": "13019", "description": "Quick service restaurants used past 30 days Dominos Pizza", "value": 0.1076, "index": 1.1447025928521273}, {"id": "13084", "description": "Types of restaurants used past 30 days Any pizza restaurant", "value": 0.3592, "index": 1.1301675527044763}, {"id": "13086", "description": "Types of restaurants used past 30 days Any sports bar", "value": 0.1263, "index": 1.1291828244079294}, {"id": "13005", "description": "No. of times used sitdown restaurant past 30 days 10 times or more", "value": 0.0633, "index": 1.1255676928488523}, {"id": "13033", "description": "Quick service restaurants used past 30 days Popeyes", "value": 0.0984, "index": 1.1231324749952005}, {"id": "13020", "description": "Quick service restaurants used past 30 days Dunkin Donuts", "value": 0.1494, "index": 1.1216949319986569}, {"id": "13021", "description": "Quick service restaurants used past 30 days Five Guys", "value": 0.0662, "index": 1.1118293334261096}, {"id": "13078", "description": "Types of restaurants used past 30 days Any Chinese restaurant", "value": 0.3588, "index": 1.100359295473453}, {"id": "13007", "description": "Quick service rest used for dinner past 30 days Any quick service rest", "value": 0.6447, "index": 1.0784199716672807}, {"id": "13017", "description": "Quick service restaurants used past 30 days Cold Stone Creamery", "value": 0.0192, "index": 1.0779311865143557}, {"id": "13006", "description": "Quick service rest used for breakfast past 30 days Any quick service rest", "value": 0.3939, "index": 1.0697413792343633}, {"id": "13085", "description": "Types of restaurants used past 30 days Any seafood restaurant", "value": 0.1054, "index": 1.0558467242214964}]}, {"category": "retail shopping", "segments": [{"id": "14071", "description": "Major/department stores:Stores shopped online past 3 months Nordstrom Rack", "value": 0.049, "index": 1.6383364437320014}, {"id": "14041", "description": "Major/department stores:Stores shopped in-store past 3 mths Nordstrom Rack", "value": 0.1321, "index": 1.6261725287851603}, {"id": "14070", "description": "Major/department stores:Stores shopped online past 3 months Nordstrom", "value": 0.061, "index": 1.5637973733684576}, {"id": "14040", "description": "Major/department stores:Stores shopped in-store past 3 mths Nordstrom", "value": 0.0998, "index": 1.5131112775659465}, {"id": "14018", "description": "Items bought past 12 months Womens business clothing", "value": 0.1569, "index": 1.3259856462380188}, {"id": "14042", "description": "Major/department stores:Stores shopped in-store past 3 mths Ross DressForLess", "value": 0.1432, "index": 1.2810752146321054}, {"id": "14002", "description": "Day spas:Stores shopped/used services past 12 months Any day spa", "value": 0.1135, "index": 1.2703544271002207}, {"id": "14043", "description": "Major/department stores:Stores shopped in-store past 3 mths Saks 5th Avenue", "value": 0.0228, "index": 1.2459792885758498}, {"id": "14075", "description": "Major/department stores:Stores shopped online past 3 months Target", "value": 0.1866, "index": 1.2438547851104562}, {"id": "14067", "description": "Major/department stores:Stores shopped online past 3 months Macys", "value": 0.0972, "index": 1.222024801861244}, {"id": "14037", "description": "Major/department stores:Stores shopped in-store past 3 mths Macys", "value": 0.237, "index": 1.198483506963656}, {"id": "14026", "description": "Major/department stores:Stores shopped in-store past 3 mths Bloomingdales", "value": 0.0308, "index": 1.1979039746465763}, {"id": "14005", "description": "Items bought past 12 months Athletic clothing", "value": 0.3728, "index": 1.1887830729591486}, {"id": "14053", "description": "Major/department stores:Stores shopped online past 3 months Babies R Us", "value": 0.0309, "index": 1.178124988575946}, {"id": "14013", "description": "Items bought past 12 months Mens business clothing", "value": 0.1812, "index": 1.1656889661152576}, {"id": "14074", "description": "Major/department stores:Stores shopped online past 3 months TJ Maxx", "value": 0.0181, "index": 1.1413347121397164}, {"id": "14050", "description": "Major/department stores:Stores shopped online past 3 months Amazon", "value": 0.7429, "index": 1.1399088101979424}, {"id": "14016", "description": "Items bought past 12 months Skin care items", "value": 0.5287, "index": 1.1349669358090542}, {"id": "14038", "description": "Major/department stores:Stores shopped in-store past 3 mths Marshalls", "value": 0.2052, "index": 1.1222519068531471}, {"id": "14061", "description": "Major/department stores:Stores shopped online past 3 months Dollar Tree", "value": 0.0145, "index": 1.116027222870208}, {"id": "14008", "description": "Items bought past 12 months Cosmetics/perfumes", "value": 0.4281, "index": 1.1155754808369949}, {"id": "14010", "description": "Items bought past 12 months Fine jewelry", "value": 0.1177, "index": 1.1140504045557496}, {"id": "14056", "description": "Major/department stores:Stores shopped online past 3 months Bloomingdales", "value": 0.021, "index": 1.1139445418433127}, {"id": "14051", "description": "Major/department stores:Stores shopped online past 3 months Any store", "value": 0.8244, "index": 1.109237136987502}, {"id": "14048", "description": "Major/department stores:Stores shopped in-store past 3 mths Target", "value": 0.5656, "index": 1.0915385615661477}, {"id": "14054", "description": "Major/department stores:Stores shopped online past 3 months Best Buy", "value": 0.1028, "index": 1.0873355501351754}, {"id": "14047", "description": "Major/department stores:Stores shopped in-store past 3 mths TJ Maxx", "value": 0.1992, "index": 1.076145528491241}, {"id": "14015", "description": "Items bought past 12 months Mens shoes", "value": 0.3592, "index": 1.0676240009286333}, {"id": "14078", "description": "Malls shopped/visited past 3 months Any mall/shopping center past 3 months", "value": 0.8032, "index": 1.0661002865183486}, {"id": "14020", "description": "Items bought past 12 months Womens shoes", "value": 0.3334, "index": 1.0636253466165952}, {"id": "14006", "description": "Items bought past 12 months Athletic shoes", "value": 0.4529, "index": 1.0585582339853619}]}, {"category": "sports and leisure", "segments": [{"id": "15075", "description": "Lifestyle change/event personally plan to do next 12 mo Move/change address", "value": 0.1969, "index": 1.927434820279875}, {"id": "15044", "description": "Currently enrolled/attending classes at a college/university Yes", "value": 0.1699, "index": 1.7535828993939588}, {"id": "15080", "description": "Lifestyle changes/events personally plan to do next 12 mths Look for new job", "value": 0.2509, "index": 1.631399370513976}, {"id": "15060", "description": "Events attended past 12 months (net) National Basketball Association (NBA)", "value": 0.0994, "index": 1.593101382551379}, {"id": "15068", "description": "Events attended/places visited past 12 months Job fair/recruitment fair", "value": 0.0652, "index": 1.5700300640439806}, {"id": "15076", "description": "Lifestyle changes/events personally plan to do next 12 mo Go back to school", "value": 0.117, "index": 1.5672748042613853}, {"id": "15025", "description": "Activities past 12 months Yoga - pilates", "value": 0.2261, "index": 1.5053428773463209}, {"id": "15019", "description": "Activities past 12 months Snow skiing - snowboarding", "value": 0.0937, "index": 1.48072574553585}, {"id": "15023", "description": "Activities past 12 months Tennis", "value": 0.0863, "index": 1.4573714510660758}, {"id": "15030", "description": "Current level of interest in European soccer Very", "value": 0.0517, "index": 1.4409398182690158}, {"id": "15015", "description": "Activities past 12 months Jogging - running", "value": 0.3733, "index": 1.4370055622267481}, {"id": "15062", "description": "Events attended past 12 months (net) National Hockey League (NHL)", "value": 0.0809, "index": 1.3558993426181032}, {"id": "15063", "description": "Events attended/places visited past 12 months Any paid ticket music concert", "value": 0.2698, "index": 1.3543591928164405}, {"id": "15012", "description": "Activities past 12 months Group fitness class", "value": 0.2461, "index": 1.3298477980844146}, {"id": "15079", "description": "Lifestyle changes/events personally plan to do next 12 mths Birth of a child", "value": 0.0396, "index": 1.3252357958640404}, {"id": "15013", "description": "Activities past 12 months Hiking - backpacking", "value": 0.3443, "index": 1.3175118771833392}, {"id": "15058", "description": "Events attended past 12 months (net) Major League Baseball (MLB)", "value": 0.226, "index": 1.3002637325187423}, {"id": "15091", "description": "Movies when usually seen at a theater past 12 months Opening weekend", "value": 0.1021, "index": 1.2916618145848606}, {"id": "15005", "description": "Activities past 12 months Bowling", "value": 0.2612, "index": 1.2671429099088074}, {"id": "15071", "description": "Events attended/places visited past 12 months Symphony concert, opera, etc.", "value": 0.1046, "index": 1.2535842035410771}, {"id": "15020", "description": "Activities past 12 months Soccer", "value": 0.0802, "index": 1.2412216016853395}, {"id": "15073", "description": "Lifestyle change/event personally plan to do next 12 mo Attnd adult ed class", "value": 0.0828, "index": 1.2155772840112213}, {"id": "15066", "description": "Events attended/places visited past 12 months Dance or ballet performance", "value": 0.086, "index": 1.2138551384887393}, {"id": "15001", "description": "Activities past 12 months Adult continuing education", "value": 0.1425, "index": 1.2092519006417206}, {"id": "15069", "description": "Events attended/places visited past 12 months Live theater", "value": 0.2771, "index": 1.196660148468952}, {"id": "15059", "description": "Events attended past 12 months (net) Major League Soccer (MLS)", "value": 0.0393, "index": 1.1964898515198559}, {"id": "15031", "description": "Current level of interest in Extreme/action sports Very", "value": 0.0179, "index": 1.1818693176512596}, {"id": "15002", "description": "Activities past 12 months Basketball", "value": 0.1565, "index": 1.1662838241730273}, {"id": "15003", "description": "Activities past 12 months Bicycling", "value": 0.3615, "index": 1.157308996776874}, {"id": "15041", "description": "Current level of interest in Nat'l Basketball Assoc (NBA) Very", "value": 0.1077, "index": 1.1489817215017153}, {"id": "15017", "description": "Activities past 12 months Photography", "value": 0.1975, "index": 1.148444220430562}, {"id": "15081", "description": "Lifestyle characteristics Belong to health/fitness club or gym", "value": 0.2887, "index": 1.1457345141444673}, {"id": "15070", "description": "Events attended/places visited past 12 months Rock concert", "value": 0.2239, "index": 1.1409834270362165}, {"id": "15022", "description": "Activities past 12 months Swimming", "value": 0.3909, "index": 1.1353761096644843}, {"id": "15065", "description": "Events attended/places visited past 12 months Any theme park", "value": 0.3162, "index": 1.0863601962617522}, {"id": "15064", "description": "Events attended/places visited past 12 months Any professional sports event", "value": 0.4208, "index": 1.0863316310458413}, {"id": "15036", "description": "Current level of interest in Major League Soccer (MLS) Very", "value": 0.0287, "index": 1.0826693672942174}, {"id": "15024", "description": "Activities past 12 months Volunteer work", "value": 0.2952, "index": 1.0738931268997003}, {"id": "15072", "description": "Events attended/places visited past 12 months Zoo", "value": 0.2798, "index": 1.062837179728797}, {"id": "15006", "description": "Activities past 12 months Camping", "value": 0.1993, "index": 1.0620363722793713}]}, {"category": "telecommunications", "segments": [{"id": "16018", "description": "Internet sites visited/apps used past 30 days Spotify", "value": 0.1817, "index": 1.8373209320165194}, {"id": "16017", "description": "Internet sites visited/apps used past 30 days Snapchat", "value": 0.2559, "index": 1.7528094966775494}, {"id": "16056", "description": "Ways used Internet/apps in past 30 days on any device Dating/personal ads", "value": 0.1087, "index": 1.7346911794136315}, {"id": "16020", "description": "Internet sites visited/apps used past 30 days Yelp", "value": 0.2016, "index": 1.69103791825912}, {"id": "16046", "description": "Items shopped for on the Internet past 12 months Wine", "value": 0.1133, "index": 1.6627034814116557}, {"id": "16011", "description": "Internet sites visited/apps used past 30 days Hulu", "value": 0.1458, "index": 1.6149739805395356}, {"id": "16114", "description": "Ways used Internet/apps in past 30 days: Take online classes", "value": 0.1876, "index": 1.5568811269321343}, {"id": "16076", "description": "Ways used Internet/apps in past 30 days on any device Podcasts", "value": 0.275, "index": 1.5297638179201611}, {"id": "16012", "description": "Internet sites visited/apps used past 30 days Instagram", "value": 0.3841, "index": 1.4789504650428322}, {"id": "16031", "description": "Items shopped for on the Internet past 12 months Cultural event tickets", "value": 0.1697, "index": 1.4575030881076858}, {"id": "16115", "description": "Ways used Internet/apps in past 30 days: Travel research/planning (business)", "value": 0.125, "index": 1.4526296296624177}, {"id": "16052", "description": "Ways used Internet/apps in past 30 days on any device Blogs", "value": 0.3687, "index": 1.4518409152808718}, {"id": "16062", "description": "Ways used Internet/apps in past 30 days on any device Job/employment search", "value": 0.2753, "index": 1.4504741145716158}, {"id": "16098", "description": "Ways used Internet/apps in past 30 days: Fantasy sports", "value": 0.0807, "index": 1.4415596276024467}, {"id": "16036", "description": "Items shopped for on the Internet past 12 months Insurance", "value": 0.1685, "index": 1.440717807333969}, {"id": "16013", "description": "Internet sites visited/apps used past 30 days LinkedIn", "value": 0.2201, "index": 1.4339443560666927}, {"id": "16095", "description": "Ways used Internet/apps in past 30 days, Streaming: TV Show - live broadcast", "value": 0.1093, "index": 1.42508042004199}, {"id": "16084", "description": "Ways used Internet/apps in past 30 days on any device Take college courses", "value": 0.0787, "index": 1.419004019904743}, {"id": "16049", "description": "Type of TV service household subscribes to No service", "value": 0.5158, "index": 1.4076202153673223}, {"id": "16023", "description": "Items shopped for on the Internet past 12 mo Groceries, or other food items", "value": 0.2755, "index": 1.4006230272207598}, {"id": "16092", "description": "Ways used Internet/apps in past 30 days, Streaming: Audio Podcast", "value": 0.1966, "index": 1.3995043640494504}, {"id": "16019", "description": "Internet sites visited/apps used past 30 days Twitter", "value": 0.2125, "index": 1.3972398111424964}, {"id": "16014", "description": "Internet sites visited/apps used past 30 days Netflix", "value": 0.5176, "index": 1.3926171217045606}, {"id": "16006", "description": "Internet sites visited/apps used past 30 days CNN", "value": 0.2583, "index": 1.3666991302997777}, {"id": "16089", "description": "Ways used Internet/apps in past 30 days on any device Watch free TV programs", "value": 0.3193, "index": 1.3665906728328818}, {"id": "16072", "description": "Ways used Internet/apps in past 30 days on any device Movies(watch/download)", "value": 0.5068, "index": 1.366068976527977}, {"id": "16106", "description": "Ways used Internet/apps in past 30 days: News - technology", "value": 0.3126, "index": 1.3523949825988728}, {"id": "16039", "description": "Items shopped for on the Internet past 12 months Movie tickets", "value": 0.3827, "index": 1.3355845729482534}, {"id": "16094", "description": "Ways used Internet/apps in past 30 days, Streaming: Movies or Movie Clips", "value": 0.2832, "index": 1.3274757128395058}, {"id": "16125", "description": "Wireless/cell phone carriers currently use T-Mobile", "value": 0.181, "index": 1.326469657740295}, {"id": "16030", "description": "Items shopped for on the Internet past 12 months Consumer electronics", "value": 0.2369, "index": 1.3224503047091045}, {"id": "16029", "description": "Items shopped for on the Internet past 12 months Computer hardware/software", "value": 0.1991, "index": 1.319139673682563}, {"id": "16101", "description": "Ways used Internet/apps in past 30 days: Job/employment search", "value": 0.2247, "index": 1.298909750602341}, {"id": "16038", "description": "Items shopped for on the Internet past 12 months Mobile device apps", "value": 0.2458, "index": 1.289327257796977}, {"id": "16090", "description": "Ways used Internet/apps in past 30 days on any device Watch live sports", "value": 0.2137, "index": 1.2760520048145887}, {"id": "16057", "description": "Ways used Internet/apps in past 30 days on any device Download media apps", "value": 0.1802, "index": 1.275894413283878}, {"id": "16021", "description": "Internet sites visited/apps used past 30 days YouTube", "value": 0.6262, "index": 1.2754673091034079}, {"id": "16102", "description": "Ways used Internet/apps in past 30 days: Legal advice/information", "value": 0.0742, "index": 1.2753841741970533}, {"id": "16053", "description": "Ways used Internet/apps in past 30 days on any device Cable TV network site", "value": 0.1855, "index": 1.2713897629323303}, {"id": "16034", "description": "Items shopped for on the Internet past 12 months Health and beauty items", "value": 0.313, "index": 1.2636354343261762}, {"id": "16025", "description": "Items shopped for on the Internet past 12 months Airline tickets", "value": 0.4758, "index": 1.2616033380399603}, {"id": "16065", "description": "Ways used Internet/apps in past 30 days on any device Listen to online music", "value": 0.5774, "index": 1.2612262091515847}, {"id": "16035", "description": "Items shopped for on the Internet past 12 months Home accessories", "value": 0.339, "index": 1.2520300991590114}, {"id": "16110", "description": "Ways used Internet/apps in past 30 days: Real estate listings", "value": 0.204, "index": 1.2502555093277754}, {"id": "16088", "description": "Ways used Internet/apps in past 30 days on any device Watch TV using subscrpt", "value": 0.6177, "index": 1.247561090450228}, {"id": "16033", "description": "Items shopped for on the Internet past 12 months Furniture/home furnishings", "value": 0.2703, "index": 1.2435348375788142}, {"id": "16055", "description": "Ways used Internet/apps in past 30 days on any device Daily deals", "value": 0.3101, "index": 1.2413834740691567}, {"id": "16043", "description": "Items shopped for on the Internet past 12 months Sporting event tickets", "value": 0.1848, "index": 1.2377403212693034}, {"id": "16015", "description": "Internet sites visited/apps used past 30 days Pandora", "value": 0.3455, "index": 1.2364942432814001}, {"id": "16041", "description": "Items shopped for on the Internet past 12 months Office supplies", "value": 0.1941, "index": 1.2300665145642407}, {"id": "16073", "description": "Ways used Internet/apps in past 30 days on any device Music", "value": 0.3409, "index": 1.2260141176957011}, {"id": "16096", "description": "Ways used Internet/apps in past 30 days, Streaming: TV Show - pre-recorded", "value": 0.1942, "index": 1.2206394574868837}, {"id": "16109", "description": "Ways used Internet/apps in past 30 days: Politics - candidate research", "value": 0.2311, "index": 1.2188307395488518}, {"id": "16054", "description": "Ways used Internet/apps in past 30 days on any device Consumer reviews", "value": 0.3589, "index": 1.216182788430693}, {"id": "16032", "description": "Items shopped for on the Internet past 12 months Flowers", "value": 0.1109, "index": 1.2094630140520384}, {"id": "16068", "description": "Ways used Internet/apps in past 30 days on any device Local/community events", "value": 0.1712, "index": 1.2083711076982093}, {"id": "16087", "description": "Ways used Internet/apps in past 30 days on any device Video clips", "value": 0.6087, "index": 1.2017939919462477}, {"id": "16079", "description": "Ways used Internet/apps in past 30 days on any device Scan QR code", "value": 0.1953, "index": 1.2008568133064408}, {"id": "16071", "description": "Ways used Internet/apps in past 30 days on any device Movie listings", "value": 0.3517, "index": 1.1999210622761503}, {"id": "16058", "description": "Ways used Internet/apps in past 30 days on any device Fantasy sports", "value": 0.0856, "index": 1.1970780021939025}, {"id": "16085", "description": "Ways used Internet/apps in past 30 days on any device Traffic", "value": 0.3213, "index": 1.1953051052027996}, {"id": "16037", "description": "Items shopped for on the Internet past 12 months Medicine/prescriptions", "value": 0.1454, "index": 1.1943982748953783}, {"id": "16111", "description": "Ways used Internet/apps in past 30 days: Restaurant reviews/information", "value": 0.38, "index": 1.1936823636180576}, {"id": "16026", "description": "Items shopped for on the Internet past 12 months Books", "value": 0.4479, "index": 1.187405863126323}, {"id": "16116", "description": "Ways used Internet/apps in past 30 days: Travel research/planning (personal)", "value": 0.3577, "index": 1.1861134864842693}, {"id": "16078", "description": "Ways used Internet/apps in past 30 days on any device Restaurant information", "value": 0.4994, "index": 1.1842749135923019}, {"id": "16059", "description": "Ways used Internet/apps in past 30 days on any device Financial information", "value": 0.3031, "index": 1.183253877272259}, {"id": "16086", "description": "Ways used Internet/apps in past 30 days on any device Travel reservations", "value": 0.4013, "index": 1.1645477780469522}, {"id": "16061", "description": "Ways used Internet/apps in past 30 days on any device Instant messaging", "value": 0.6771, "index": 1.1630409327021314}, {"id": "16113", "description": "Ways used Internet/apps in past 30 days: Sports scores/news", "value": 0.3664, "index": 1.1576235902309508}, {"id": "16040", "description": "Items shopped for on the Internet past 12 months Music downloads", "value": 0.1707, "index": 1.1567667609751346}, {"id": "16103", "description": "Ways used Internet/apps in past 30 days: Movie listings/reviews", "value": 0.4062, "index": 1.1542470603576338}, {"id": "16121", "description": "Wireless/cell phone carriers currently use Metro by T-Mobile (MetroPCS)", "value": 0.0482, "index": 1.1532511637097016}, {"id": "16028", "description": "Items shopped for on the Internet past 12 months Clothing or accessories", "value": 0.6134, "index": 1.1502383413767823}, {"id": "16064", "description": "Ways used Internet/apps in past 30 days on any device Listen to local radio", "value": 0.1968, "index": 1.1497569524316402}, {"id": "16104", "description": "Ways used Internet/apps in past 30 days: News - business/financial", "value": 0.3044, "index": 1.1482458833774993}, {"id": "16075", "description": "Ways used Internet/apps in past 30 days on any device Photo processing/sharng", "value": 0.2331, "index": 1.1377971853615867}, {"id": "16008", "description": "Internet sites visited/apps used past 30 days ESPN", "value": 0.1941, "index": 1.1352307947642355}, {"id": "16074", "description": "Ways used Internet/apps in past 30 days on any device National news", "value": 0.4348, "index": 1.1310332501833524}, {"id": "16060", "description": "Ways used Internet/apps in past 30 days on any device Games (play/download)", "value": 0.3716, "index": 1.1236852346316097}, {"id": "16122", "description": "Wireless/cell phone carriers currently use MetroPCS", "value": 0.0483, "index": 1.123609820146926}, {"id": "16051", "description": "Ways used Internet/apps in past 30 days on any device Banking", "value": 0.6246, "index": 1.1206649439221308}, {"id": "16069", "description": "Ways used Internet/apps in past 30 days on any device Maps/GPS", "value": 0.6485, "index": 1.1079254116468285}, {"id": "16093", "description": "Ways used Internet/apps in past 30 days, Streaming: Listen to Music", "value": 0.4337, "index": 1.1052540630277488}, {"id": "16066", "description": "Ways used Internet/apps in past 30 days on any device Listen to radio", "value": 0.3212, "index": 1.1038166451179725}, {"id": "16082", "description": "Ways used Internet/apps in past 30 days on any device Social networking", "value": 0.828, "index": 1.1017165965080908}, {"id": "16022", "description": "Internet sites visited/apps used past 30 days eBay", "value": 0.2439, "index": 1.1008081289981604}, {"id": "16099", "description": "Ways used Internet/apps in past 30 days: Financial/insurance/investment", "value": 0.2665, "index": 1.0998602281656475}, {"id": "16083", "description": "Ways used Internet/apps in past 30 days on any device Sports scores/updates", "value": 0.2466, "index": 1.097028158693682}, {"id": "16081", "description": "Ways used Internet/apps in past 30 days on any device Shopping", "value": 0.7085, "index": 1.0933973323481847}, {"id": "16067", "description": "Ways used Internet/apps in past 30 days on any device Local news", "value": 0.3755, "index": 1.0922165991976838}, {"id": "16080", "description": "Ways used Internet/apps in past 30 days on any device Search", "value": 0.8561, "index": 1.0881837791942266}, {"id": "16070", "description": "Ways used Internet/apps in past 30 days on any device Medical services", "value": 0.2177, "index": 1.0841056235789859}, {"id": "16045", "description": "Items shopped for on the Internet past 12 months Toys or games", "value": 0.2288, "index": 1.0776567551029235}, {"id": "16091", "description": "Ways used Internet/apps in past 30 days on any device Weather", "value": 0.6747, "index": 1.0775795466457825}, {"id": "16042", "description": "Items shopped for on the Internet past 12 months Pet supplies", "value": 0.179, "index": 1.0775197234129243}, {"id": "16112", "description": "Ways used Internet/apps in past 30 days: Social networking", "value": 0.8086, "index": 1.0746519183261494}, {"id": "16117", "description": "Wireless/cell phone carrier plan to switch next 12 months Yes", "value": 0.0863, "index": 1.068465472675516}, {"id": "16100", "description": "Ways used Internet/apps in past 30 days: Find a business address or phone", "value": 0.1198, "index": 1.067996536696034}, {"id": "16108", "description": "Ways used Internet/apps in past 30 days: Online banking/credit cards", "value": 0.603, "index": 1.0677163689738494}, {"id": "16123", "description": "Wireless/cell phone carriers currently use Sprint", "value": 0.0842, "index": 1.0625808972332533}, {"id": "16047", "description": "Smartphone - currently use Yes", "value": 0.8908, "index": 1.0589977745834487}, {"id": "16063", "description": "Ways used Internet/apps in past 30 days on any device Listen to Internet rdio", "value": 0.2436, "index": 1.0587306334906712}]}, {"category": "travel", "segments": [{"id": "17022", "description": "Types of vacations plan to take next 12 months Spa vacation", "value": 0.0417, "index": 1.6079481446616959}, {"id": "17012", "description": "Types of vacations plan to take next 12 months Adventure vacation (hiking)", "value": 0.1655, "index": 1.5755721480662708}, {"id": "17006", "description": "Hotel/motels past 12 months Any short-term rental (Airbnb, HomeAway, etc.)", "value": 0.2469, "index": 1.5156621308929876}, {"id": "17021", "description": "Types of vacations plan to take next 12 months Ski vacation", "value": 0.0738, "index": 1.4614756352080005}, {"id": "17008", "description": "No. domestic air round trips past 12 mo (primarily business) Any", "value": 0.2642, "index": 1.2889850033750496}, {"id": "17004", "description": "Hotel/motels past 12 months Any bed & breakfast", "value": 0.0565, "index": 1.2691317284420094}, {"id": "17009", "description": "No. domestic air round trips past 12 mo (primarily personal) Any", "value": 0.5834, "index": 1.213680105927187}, {"id": "17011", "description": "No. of trips outside continental U.S. past 3 years Any foreign trip", "value": 0.4893, "index": 1.202028007216888}, {"id": "17001", "description": "Airlines used for domestic/foreign travel past 12 months Any airline flown", "value": 0.6807, "index": 1.1971978245149715}, {"id": "17010", "description": "No. of domestic air round trips past 12 months Any domestic air round trip", "value": 0.6244, "index": 1.1925995403087262}, {"id": "17020", "description": "Types of vacations plan to take next 12 months Mountain vacation", "value": 0.1731, "index": 1.166616643064583}, {"id": "17007", "description": "Hotel/motels past 12 months Any upscale hotel", "value": 0.1134, "index": 1.1204689845961437}, {"id": "17013", "description": "Types of vacations plan to take next 12 months All-inclusive resort", "value": 0.1249, "index": 1.0987664399344936}, {"id": "17018", "description": "Types of vacations plan to take next 12 months Gambling/casino trip", "value": 0.0974, "index": 1.095563487942664}, {"id": "17002", "description": "Car rental companies used past 12 months Any car rental", "value": 0.4179, "index": 1.0711244217697022}, {"id": "17005", "description": "Hotel/motels past 12 months Any hotel/motel", "value": 0.741, "index": 1.0556077497340854}]}, {"category": "voting", "segments": [{"id": "18012", "description": "Political party affiliation Independent, but feel closer to Democrat", "value": 0.1571, "index": 1.3406800008836404}, {"id": "18005", "description": "How often usually vote in presidential elections Never", "value": 0.1762, "index": 1.3336664059600798}, {"id": "18002", "description": "How often usually vote in local elections Never", "value": 0.2835, "index": 1.2978973494998451}, {"id": "18010", "description": "Political party affiliation Democrat", "value": 0.3569, "index": 1.2835990149464236}, {"id": "18008", "description": "How often usually vote in statewide elections Never", "value": 0.2441, "index": 1.2757609292928542}, {"id": "18006", "description": "How often usually vote in presidential elections Sometimes", "value": 0.1009, "index": 1.2397169056496975}, {"id": "18014", "description": "Political party affiliation None of these", "value": 0.1497, "index": 1.1558192133015706}, {"id": "18009", "description": "How often usually vote in statewide elections Sometimes", "value": 0.2776, "index": 1.1162576491616636}, {"id": "18003", "description": "How often usually vote in local elections Sometimes", "value": 0.354, "index": 1.0641398307001644}, {"id": "18011", "description": "Political party affiliation Independent", "value": 0.0906, "index": 0.9635377853887428}]}]}, "home": {"state_province": [{"id": "51", "alias": "VA", "description": "Virginia", "value": 0.648}, {"id": "24", "alias": "MD", "description": "Maryland", "value": 0.1941}, {"id": "11", "alias": "DC", "description": "District of Columbia", "value": 0.0684}, {"id": "54", "alias": "WV", "description": "West Virginia", "value": 0.0336}, {"id": "15", "alias": "HI", "description": "Hawaii", "value": 0.0059}, {"id": "18", "alias": "IN", "description": "Indiana", "value": 0.0055}, {"id": "29", "alias": "MO", "description": "Missouri", "value": 0.0053}, {"id": "34", "alias": "NJ", "description": "New Jersey", "value": 0.0049}, {"id": "48", "alias": "TX", "description": "Texas", "value": 0.0048}, {"id": "12", "alias": "FL", "description": "Florida", "value": 0.004}, {"id": "09", "alias": "CT", "description": "Connecticut", "value": 0.004}, {"id": "06", "alias": "CA", "description": "California", "value": 0.0024}, {"id": "39", "alias": "OH", "description": "Ohio", "value": 0.0022}, {"id": "37", "alias": "NC", "description": "North Carolina", "value": 0.002}, {"id": "01", "alias": "AL", "description": "Alabama", "value": 0.0019}, {"id": "53", "alias": "WA", "description": "Washington", "value": 0.0018}, {"id": "42", "alias": "PA", "description": "Pennsylvania", "value": 0.0015}, {"id": "02", "alias": "AK", "description": "Alaska", "value": 0.0014}, {"id": "17", "alias": "IL", "description": "Illinois", "value": 0.001}, {"id": "47", "alias": "TN", "description": "Tennessee", "value": 0.0009}, {"id": "27", "alias": "MN", "description": "Minnesota", "value": 0.0009}, {"id": "10", "alias": "DE", "description": "Delaware", "value": 0.0006}, {"id": "45", "alias": "SC", "description": "South Carolina", "value": 0.0006}, {"id": "08", "alias": "CO", "description": "Colorado", "value": 0.0006}, {"id": "13", "alias": "GA", "description": "Georgia", "value": 0.0006}, {"id": "55", "alias": "WI", "description": "Wisconsin", "value": 0.0005}, {"id": "32", "alias": "NV", "description": "Nevada", "value": 0.0005}, {"id": "25", "alias": "MA", "description": "Massachusetts", "value": 0.0004}, {"id": "40", "alias": "OK", "description": "Oklahoma", "value": 0.0003}, {"id": "44", "alias": "RI", "description": "Rhode Island", "value": 0.0003}, {"id": "36", "alias": "NY", "description": "New York", "value": 0.0003}, {"id": "26", "alias": "MI", "description": "Michigan", "value": 0.0003}, {"id": "41", "alias": "OR", "description": "Oregon", "value": 0.0002}, {"id": "31", "alias": "NE", "description": "Nebraska", "value": 0.0001}, {"id": "22", "alias": "LA", "description": "Louisiana", "value": 0.0001}, {"id": "19", "alias": "IA", "description": "Iowa", "value": 0.0001}, {"id": "38", "alias": "ND", "description": "North Dakota", "value": 0.0001}, {"id": "05", "alias": "AR", "description": "Arkansas", "value": 0.0}, {"id": "33", "alias": "NH", "description": "New Hampshire", "value": 0.0}, {"id": "04", "alias": "AZ", "description": "Arizona", "value": 0.0}, {"id": "21", "alias": "KY", "description": "Kentucky", "value": 0.0}, {"id": "28", "alias": "MS", "description": "Mississippi", "value": 0.0}, {"id": "49", "alias": "UT", "description": "Utah", "value": 0.0}, {"id": "20", "alias": "KS", "description": "Kansas", "value": 0.0}, {"id": "23", "alias": "ME", "description": "Maine", "value": 0.0}], "dma": [{"id": "511", "description": "Washington, DC (Hagerstown, MD)", "value": 0.9102}, {"id": "512", "description": "Baltimore, MD", "value": 0.0166}, {"id": "584", "description": "Charlottesville, VA", "value": 0.0096}, {"id": "501", "description": "New York, NY", "value": 0.0072}, {"id": "744", "description": "Honolulu, HI", "value": 0.0059}, {"id": "619", "description": "Springfield, MO", "value": 0.0053}, {"id": "556", "description": "Richmond-Petersburg, VA", "value": 0.0046}, {"id": "515", "description": "Cincinnati, OH", "value": 0.0029}, {"id": "504", "description": "Philadelphia, PA", "value": 0.0028}, {"id": "618", "description": "Houston, TX", "value": 0.0024}, {"id": "544", "description": "Norfolk-Portsmouth-Newport News, VA", "value": 0.0022}, {"id": "527", "description": "Indianapolis, IN", "value": 0.0019}, {"id": "819", "description": "Seattle-Tacoma, WA", "value": 0.0018}, {"id": "866", "description": "Fresno-Visalia, CA", "value": 0.0018}, {"id": "517", "description": "Charlotte, NC", "value": 0.0016}, {"id": "743", "description": "Anchorage, AK", "value": 0.0014}, {"id": "686", "description": "Mobile-Pensacola (Ft. Walton Beach), AL-FL", "value": 0.0013}, {"id": "635", "description": "Austin, TX", "value": 0.0012}, {"id": "554", "description": "Wheeling-Steubenville, WV-OH", "value": 0.001}, {"id": "581", "description": "Terre Haute, IN", "value": 0.001}, {"id": "698", "description": "Montgomery-Selma, AL", "value": 0.001}, {"id": "613", "description": "Minneapolis-St. Paul, MN", "value": 0.0009}, {"id": "623", "description": "Dallas-Ft. Worth, TX", "value": 0.0008}, {"id": "534", "description": "Orlando-Daytona Beach-Melbourne, FL", "value": 0.0007}, {"id": "602", "description": "Chicago, IL", "value": 0.0007}, {"id": "561", "description": "Jacksonville, FL", "value": 0.0007}, {"id": "566", "description": "Harrisburg-Lancaster-Lebanon-York, PA", "value": 0.0007}, {"id": "569", "description": "Harrisonburg, VA", "value": 0.0006}, {"id": "630", "description": "Birmingham (Anniston and Tuscaloosa), AL", "value": 0.0006}, {"id": "751", "description": "Denver, CO", "value": 0.0006}, {"id": "524", "description": "Atlanta, GA", "value": 0.0006}, {"id": "542", "description": "Dayton, OH", "value": 0.0005}, {"id": "539", "description": "Tampa-St.Petersburg (Sarasota), FL", "value": 0.0005}, {"id": "825", "description": "San Diego, CA", "value": 0.0005}, {"id": "506", "description": "Boston (Manchester), MA-NH", "value": 0.0004}, {"id": "557", "description": "Knoxville, TN", "value": 0.0004}, {"id": "528", "description": "Miami-Ft. Lauderdale, FL", "value": 0.0004}, {"id": "545", "description": "Greenville-New Bern-Washington, NC", "value": 0.0004}, {"id": "659", "description": "Nashville, TN", "value": 0.0004}, {"id": "669", "description": "Madison, WI", "value": 0.0003}, {"id": "577", "description": "Wilkes Barre-Scranton-Hazleton, PA", "value": 0.0003}, {"id": "609", "description": "St. Louis, MO", "value": 0.0003}, {"id": "535", "description": "Columbus, OH", "value": 0.0003}, {"id": "560", "description": "Raleigh-Durham (Fayetteville), NC", "value": 0.0003}, {"id": "521", "description": "Providence-New Bedford, RI-MA", "value": 0.0003}, {"id": "514", "description": "Buffalo, NY", "value": 0.0003}, {"id": "691", "description": "Huntsville-Decatur (Florence), AL", "value": 0.0003}, {"id": "811", "description": "Reno, NV", "value": 0.0003}, {"id": "650", "description": "Oklahoma City, OK", "value": 0.0003}, {"id": "548", "description": "West Palm Beach-Ft. Pierce, FL", "value": 0.0002}, {"id": "820", "description": "Portland, OR", "value": 0.0002}, {"id": "617", "description": "Milwaukee, WI", "value": 0.0002}, {"id": "839", "description": "Las Vegas, NV", "value": 0.0002}, {"id": "612", "description": "Shreveport, LA", "value": 0.0002}, {"id": "530", "description": "Tallahassee-Thomasville, FL-GA", "value": 0.0002}, {"id": "640", "description": "Memphis, TN", "value": 0.0002}, {"id": "567", "description": "Greenville-Spartanburg-Asheville-Anderson, SC-NC", "value": 0.0002}, {"id": "513", "description": "Flint-Saginaw-Bay City, MI", "value": 0.0002}, {"id": "722", "description": "Lincoln & Hastings-Kearny, NE", "value": 0.0001}, {"id": "518", "description": "Greensboro-High Point-Winston Salem, NC", "value": 0.0001}, {"id": "716", "description": "Baton Rouge, LA", "value": 0.0001}, {"id": "682", "description": "Davenport-Rock Island-Moline, IA-IL", "value": 0.0001}, {"id": "641", "description": "San Antonio, TX", "value": 0.0001}, {"id": "505", "description": "Detroit, MI", "value": 0.0001}, {"id": "803", "description": "Los Angeles, CA", "value": 0.0001}, {"id": "627", "description": "Wichita Falls & Lawton, TX-OK", "value": 0.0001}, {"id": "671", "description": "Tulsa, OK", "value": 0.0001}, {"id": "559", "description": "Bluefield-Beckley-Oak Hill, WV", "value": 0.0001}, {"id": "687", "description": "Minot-Bismarck-Dickinson (Williston), ND", "value": 0.0001}, {"id": "576", "description": "Salisbury, MD", "value": 0.0001}, {"id": "519", "description": "Charleston, SC", "value": 0.0001}, {"id": "746", "description": "Biloxi-Gulfport, MS", "value": 0.0}, {"id": "605", "description": "Topeka, KS", "value": 0.0}, {"id": "679", "description": "Des Moines-Ames, IA", "value": 0.0}, {"id": "652", "description": "Omaha, NE", "value": 0.0}, {"id": "547", "description": "Toledo, OH", "value": 0.0}, {"id": "555", "description": "Syracuse, NY", "value": 0.0}, {"id": "541", "description": "Lexington, KY", "value": 0.0}, {"id": "604", "description": "Columbia-Jefferson City, MO", "value": 0.0}, {"id": "600", "description": "Corpus Christi, TX", "value": 0.0}, {"id": "574", "description": "Johnstown-Altoona-State College, PA", "value": 0.0}, {"id": "531", "description": "Tri-Cities, TN-VA", "value": 0.0}, {"id": "770", "description": "Salt Lake City, UT", "value": 0.0}, {"id": "639", "description": "Jackson, TN", "value": 0.0}, {"id": "503", "description": "Macon, GA", "value": 0.0}, {"id": "724", "description": "Fargo-Valley City, ND", "value": 0.0}, {"id": "638", "description": "St. Joseph, MO", "value": 0.0}, {"id": "662", "description": "Abilene-Sweetwater, TX", "value": 0.0}, {"id": "507", "description": "Savannah, GA", "value": 0.0}, {"id": "693", "description": "Little Rock-Pine Bluff, AR", "value": 0.0}, {"id": "500", "description": "Portland-Auburn, ME", "value": 0.0}, {"id": "789", "description": "Tucson (Sierra Vista), AZ", "value": 0.0}, {"id": "807", "description": "San Francisco-Oakland-San Jose, CA", "value": 0.0}, {"id": "642", "description": "Lafayette, LA", "value": 0.0}, {"id": "510", "description": "Cleveland-Akron (Canton), OH", "value": 0.0}, {"id": "624", "description": "Sioux City, IA", "value": 0.0}, {"id": "678", "description": "Wichita-Hutchinson Plus, KS", "value": 0.0}], "metro_area": [{"id": "47900", "description": "Washington-Arlington-Alexandria, DC-VA-MD-WV", "value": 0.8909}, {"id": "12580", "description": "Baltimore-Columbia-Towson, MD", "value": 0.0166}, {"id": "54", "description": "Rural West Virginia", "value": 0.0135}, {"id": "16820", "description": "Charlottesville, VA", "value": 0.0093}, {"id": "46520", "description": "Urban Honolulu, HI", "value": 0.0059}, {"id": "15680", "description": "California-Lexington Park, MD", "value": 0.0057}, {"id": "44180", "description": "Springfield, MO", "value": 0.0053}, {"id": "40060", "description": "Richmond, VA", "value": 0.0046}, {"id": "14860", "description": "Bridgeport-Stamford-Norwalk, CT", "value": 0.004}, {"id": "35620", "description": "New York-Newark-Jersey City, NY-NJ-PA", "value": 0.0033}], "county": [{"id": "51013", "description": "Arlington, VA", "value": 0.5269}, {"id": "24033", "description": "Prince George's, MD", "value": 0.1219}, {"id": "51059", "description": "Fairfax, VA", "value": 0.0801}, {"id": "11001", "description": "District of Columbia, DC", "value": 0.0684}, {"id": "24009", "description": "Calvert, MD", "value": 0.026}, {"id": "24031", "description": "Montgomery, MD", "value": 0.0239}, {"id": "54037", "description": "Jefferson, WV", "value": 0.0201}, {"id": "54065", "description": "Morgan, WV", "value": 0.0135}, {"id": "51510", "description": "Alexandria, VA", "value": 0.0132}, {"id": "51003", "description": "Albemarle, VA", "value": 0.0093}], "postal_code": [{"id": "22202", "value": 0.4389}, {"id": "20720", "value": 0.0689}, {"id": "22306", "value": 0.0595}, {"id": "20743", "value": 0.0587}, {"id": "20001", "value": 0.0517}, {"id": "22150", "value": 0.0265}, {"id": "20032", "value": 0.0259}, {"id": "20657", "value": 0.025}, {"id": "20903", "value": 0.0153}, {"id": "22204", "value": 0.0113}], "census_neighborhood": [{"id": "510131035031", "value": 0.4732}, {"id": "240338004091", "value": 0.0577}, {"id": "240338028042", "value": 0.0524}, {"id": "510594214003", "value": 0.0486}, {"id": "110010035001", "value": 0.0411}, {"id": "510131035021", "value": 0.0335}, {"id": "110010098071", "value": 0.0209}, {"id": "510594316001", "value": 0.0204}, {"id": "240098610033", "value": 0.0136}, {"id": "240317016021", "value": 0.0113}]}}} ;

  loading: boolean = false
  errorOccurred: boolean = false
  placeId:any 
  contentWidth: number = 800
  sidebarWidth: number = 800
  tableData: any 

  tableColumns: IMXTableColumnElement[] = [
    { displayName: 'Year', name: 'year', sort: true, width: '92px' },
    { displayName: 'Weeks', name: 'weeks', width: '58px', },
    { displayName: 'Total Visits (Selected Period)', name: 'visits', sort: true },
    { displayName: 'Visits', name: 'averageVisits', sort: true },
    { displayName: 'Annual Visits', name: 'annualVisitsAvg', sort: true},
    { displayName: 'Index vs Annual Avg', name: 'visitIndex'}
  ]  
  defaultTableSort = {
    active: "year",
    direction: "desc"
  } as any;
  maxNumWeeks: number = 52
  private _allTicks: number[] = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]
  weekSliderOptions: Partial<any> = {
    floor: 1,
    ceil: 52, 
    step: 1,
    ticksArray: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52],
    animate: false
  }
  private _numWeeks = 52
  get numWeeks (): any {
    return this._numWeeks
  }
  set numWeeks (newValue: any) {
    this._numWeeks = newValue
    if (this.details) {
      this.updateChartData()     
    }
  }
  sliderValues: IMXSliderValues = { minValue: 52 };
  private _dailyGrouping: boolean = false
  get useDailyGrouping (): boolean {
    return this._dailyGrouping
  }
  set useDailyGrouping (newValue: boolean) {
    this._dailyGrouping = newValue
    if (this.details) {
      this.updateChartData()   
    }
  }

  validWeekStart (d: any): any {
    return d && d.getDay() === 1
  }

  minStartingDate = toDate(new Date('2018-12-24'))
  maxStartingDate = toDate(new Date('2021-12-27'))
  private _startDate = toDate(new Date('2021-01-04'))
  get weekStart (): any {
    return this._startDate
  }  
  set weekStart (newValue:any) {
    this._startDate = newValue
    const week = getWeek(new Date(format(newValue,'yyyy-MM-dd')), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4
      }); 
    let maxWeekCalc = 53 // 1 + number of weeks allowed (may change if dates do not fulfill a whole year)
    const lastWeekOfYear =  toDate(new Date(newValue)) // copy this, then set it to the last week
    lastWeekOfYear.setDate(lastWeekOfYear.getDate() + (52 - week) * 7)
    if (lastWeekOfYear > this.maxStartingDate) {
      maxWeekCalc =  getWeek(new Date(this.maxStartingDate), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4
      }) + 1
    }  
    this.maxNumWeeks = maxWeekCalc - week // inclusive for this week. so week 1 yields 52 weeks left
    this.weekSliderOptions = {
      floor: 1,
      ceil: this.maxNumWeeks, 
      step: 1,
      showTicks: true,
      ticksArray: this._allTicks.filter(val => val <= this.maxNumWeeks),
      animate: false
    }  
    this._numWeeks = Math.min(this.maxNumWeeks, Math.max(this._numWeeks, 1))  
      if (this.details) {
          this.updateChartData()     
      }    
  }
  

  constructor( 
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) data:any
    ) {   
      this.placeData = [];
      this.placeId = data.id;
  }

  ngOnInit(): void {
    const computedColors = [           
      '#1E1F53',
      '#00935E',
      'F9CF47',
      '#ED6D23',
      '#D71784',
      '#732B90',
      '#0D5E97'
    ]
    // this.racePieOptions.colors = computedColors
    // this.donutOptions.colors = computedColors
    // this.stackedLineOptions.colors = computedColors    
  this.contentWidth = (window.innerWidth-50);  
  console.log(this.details)   
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.contentWidth = (window.innerWidth-50);
  }  
  ngAfterViewInit(): void{  
    setTimeout ((): void => this.resetDateSelection(), 200);
  }
  resetDateSelection (): void {
    this.weekStart = toDate(new Date('2021-01-04'))
    this.numWeeks = 52    
    this.sliderValues = { minValue:this.numWeeks}
    this.changeDetector.detectChanges()
  }

  fixDateRange (): void {
    if (this.details?.history?.week) {
      const weeks = this.details.history.week.sort((a:any,b:any) => toDate(new Date(a.week_start)).valueOf() - toDate(new Date(b.week_start)).valueOf())
      this.minStartingDate = toDate(new Date(weeks[0]?.week_start || '2018-12-24'))
      this.maxStartingDate = toDate(new Date(weeks[weeks.length - 1]?.week_start || '2021-12-27'))
    } else {
      this.minStartingDate = toDate(new Date('2018-12-24'))
      this.maxStartingDate = toDate(new Date('2021-12-27'))
    }
  }
  private updateDebounce: any = null
  private hasDoneFirstResize: boolean = false
  updateChartData (): void | null{
    if (!this.details || !this.details.history) {
      this.tableData = null
      this.visitsYearYearData = []
      this.visitsDayData = []
      this.visitsDayHourData = []
      this.alcoholConsumptionData = []
      this.automotiveData = []
      this.transportationData = []
      this.videoData = []
      this.environmentData = []
      this.financialData = []
      this.foodData = []
      this.healthData = []
      this.itemsInHomeData = []
      this.apparelData = []
      this.homeImprovementData = []
      this.psychographicsData = []
      this.restaurantData = []
      this.shoppingData = []
      this.sportsData = []
      this.travelData = []
      this.votingData = []
      this.dailyDwellPie = {}
      this.topAgePie = {}
      this.topEthnicityPie = {}
      this.genderPie = {}
      this.topIncomePie = {}
      this.topPrizmPie = {}
      this.nextPrizmPie = {}
      this.topRacePie = {}
      this.allVisitData = []
      return null as any
    }
    if (this.updateDebounce) {
      clearTimeout(this.updateDebounce)
    }
     // prevent ui blocking
     this.updateDebounce = setTimeout(() => {
      this.doChartUpdate()
      setTimeout(() => {
        this.changeDetector.detectChanges()
        // temporary fix for tooltips not showing up on first load...
        if (!this.hasDoneFirstResize) {
          setTimeout(() => {
            this.updateChartWidth()
            this.hasDoneFirstResize = true
          }, 100)
        }
      })
      this.updateDebounce = null
    }, 200)
  }
  private doChartUpdate (): void {
    const allWeeks = this.details.history.week
    const selectedStartWeek = getWeek(new Date(this.weekStart),{
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    })
    const selectedYear = this.weekStart.getFullYear()
    const weekSpan = this.numWeeks - 1
    const selectedEndWeek = selectedStartWeek + weekSpan
    const yearlyGrouping:any = { }
    const selectedYearlyGrouping: any = [ ] // only within range
    // calculate these in line for less looping
    const allVisitData: LineChartData[] = []
    allWeeks.forEach((weekData:any) => {
      const year = weekData.id.slice(0, 4) // they give us id's as YYYY-wkXX
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(weekData.week_start.slice(5, 7), 10) - 1]
      // const weekNum = DateUtils.weekOfYear(weekData.week_start)
      const weekNum = parseInt(weekData.id.slice(-2), 10)
      const row = {
        year,
        weekNum,
        monthName,
        activities: weekData.activities,
        observations: weekData.visit_observations,    //activity_observations
        visits: weekData.visits,
        dropoffs: weekData.dropoffs,
        passbys: weekData.passbys,
        weekStart: weekData.week_start,
        date: toDate(new Date(weekData.week_start)),
        dailyStats: this.details.percent_visits.day.map((dayData:any) => ({
          id: dayData.id,
          description: dayData.description,
          visits: dayData.value * weekData.visits,
          activities: dayData.value * weekData.activities,
          dropoffs: dayData.value * weekData.dropoffs,
          passbys: dayData.value * weekData.passbys,
          hourlyVisits: dayData.hourly.map((hv:any) => hv * dayData.value * weekData.visits),
          hourlyActivities: dayData.hourly.map((hv:any) => hv * dayData.value * weekData.activities),
          hourlyDropoffs: dayData.hourly.map((hv:any) => hv * dayData.value * weekData.dropoffs),
          hourlyPassbys: dayData.hourly.map((hv:any) => hv * dayData.value * weekData.passbys)
        }))
      }
      // if this is within the selection, add it to the selected grouping
      if (selectedStartWeek <= weekNum && weekNum <= selectedEndWeek) {
        selectedYearlyGrouping[year] = selectedYearlyGrouping[year] || []
        selectedYearlyGrouping[year].push(row)
      }
      // discard week 53 because other calculations aren't supporting it right now??
      if (weekNum <= 52) {
        // always add it to the yearly grouping
        yearlyGrouping[year] = yearlyGrouping[year] || []
        yearlyGrouping[year].push(row)
      }

      allVisitData.push({ name: row.weekStart, value: row.visits })
    })

    if (!Object.keys(selectedYearlyGrouping).length) {
      console.warn('no years can satisfy the dates requested')
    }


    const dateSort = (a:any, b:any) => toDate(new Date(a.name)).valueOf() - toDate(new Date(b.name)).valueOf()
    this.allVisitData = allVisitData.sort(dateSort)

    this.getTableData(selectedYearlyGrouping, yearlyGrouping)
    this.getYearYearData(selectedYearlyGrouping)
    this.getDemographicPieData()
    this.getDemographicBarChartData()
    this.getDayHourData()
    this.getTopTableData()
  }
  private getTableData (selectedYearlyGrouping:any, yearlyGrouping:any): void {   
    this.tableData = Object.keys(selectedYearlyGrouping).map(year => {
      const row = selectedYearlyGrouping[year].reduce((rowData:any, weekData:any) => {
        rowData.visits += weekData.visits
        rowData.activities += weekData.activities
        rowData.dropoffs += weekData.dropoffs
        rowData.passbys += weekData.passbys
        return rowData
      }, { year, weeks: selectedYearlyGrouping[year].length, visits: 0, activities: 0, dropoffs: 0, passbys: 0 })
      const numWeeks = selectedYearlyGrouping[year].length
      const dailyCalc = this.useDailyGrouping ? 7 : 1 // divide by this to get grouping type
      const avgType = this.useDailyGrouping ? '(daily avg)' : '(weekly avg)'
      row.averageVisits = Math.round(row.visits / numWeeks / dailyCalc)
      row.averageActivities = Math.round(row.activities / numWeeks / dailyCalc)
      row.averageDropoffs = Math.round(row.dropoffs / numWeeks / dailyCalc)
      row.averagePassbys = Math.round(row.passbys / numWeeks / dailyCalc)
      if (yearlyGrouping[year]) {
        row.annualVisits = yearlyGrouping[year].reduce((sum:any, weekData:any) => sum + weekData.visits, 0)
        row.annualVisitsAvg = row.annualVisits / yearlyGrouping[year].length
        if (this.useDailyGrouping) {
          row.annualVisitsAvg /= 7
        }
        row.visitIndex = Math.round(row.averageVisits / row.annualVisitsAvg * 100)
        row.visits = numeral(row.visits).format('0,0f')
        row.averageVisits = numeral(row.averageVisits).format('0,0f')
        row.annualVisitsAvg = numeral(row.annualVisitsAvg).format('0,0f')
        row.visitIndex = row.visitIndex +' %'
      }
      this.tableColumns.forEach(column => {
        if (column.name === 'annualVisitsAvg') {
          column.displayName = `Annual Avg ${this.useDailyGrouping ? 'Daily' : 'Weekly'} Visits`
        } else if (column.name.includes('average')) {
          column.displayName = `${column.name.replace('average', '')} ${avgType}`
        }
      })
      return row
    })
     let sort = this.defaultTableSort;
     this.tableData = this.tableData.sort((a:any, b:any) => {
      if (sort.direction == 'asc') {
          return a[sort.active] < b[sort.active] ? -1 : b[sort.active] < a[sort.active] ? 1 : 0
      } else {
          return a[sort.active] > b[sort.active] ? -1 : b[sort.active] > a[sort.active] ? 1 : 0
      }
    });  
  }

  private getYearYearData (selectedYearlyGrouping:any): void {
    const visitData: StackedLineChartData[] = []

    Object.keys(selectedYearlyGrouping).forEach(year => {
      selectedYearlyGrouping[year].forEach((weekData: { weekNum: any; visits: any; }) => {
        const baseData = { name: weekData.weekNum, group: year }
        visitData.push({ ...baseData, value: weekData.visits })
      })
    })
    const sortFn = (a:any, b:any) => parseInt(a.name) - parseInt(b.name)
    this.visitsYearYearData = visitData.sort(sortFn)
  }
  private convertPieDemographics (segments: { description: string, value: number }[], replaceString?: string, replaceWith: string = ''): DonutChartData {
    if (segments && segments.length) {
      return segments.reduce((pieData:any, segment) => {
        let description:any = segment.description
        if (replaceString) {
          description = description.replace(replaceString, replaceWith)
        }
        pieData[description] = parseFloat((segment.value * 100).toFixed(2))
        return pieData
      }, { })
    } else {
      return {}
    }
  }

  private getDemographicPieData (): void {
    this.dailyDwellPie = this.convertPieDemographics(this.details.percent_visits.daily_dwell_bins)

    const incomeData:any = this.details.percent_visits.segment.basic_demographics.find(d => d.category === 'hh_income')
    this.topIncomePie = this.convertPieDemographics(incomeData?.segments, 'Households, Household Income', 'HHI')

    const ethnicityData:any = this.details.percent_visits.segment.basic_demographics.find(d => d.category === 'ethnicity')
    this.topEthnicityPie = this.convertPieDemographics(ethnicityData?.segments,'Population, ')

    const raceData:any = this.details.percent_visits.segment.basic_demographics.find((d:any) => d.category === 'race')
    this.topRacePie = this.convertPieDemographics(raceData?.segments, 'Population, ')

    const genderData:any = this.details.percent_visits.segment.basic_demographics.find((d:any) => d.category === 'gender')
    this.genderPie = this.convertPieDemographics(genderData?.segments, 'Population, ')

    const ageData:any = this.details.percent_visits.segment.basic_demographics.find((d:any) => d.category === 'age')
    this.topAgePie = this.convertPieDemographics(ageData?.segments, 'Population, ')

    let prizmData = this.details.percent_visits.segment.basic_demographics.find((d:any) => d.category === 'prizm')?.segments || []
    prizmData = prizmData.sort((a:any, b:any) => b.value - a.value) // top 10
    this.topPrizmPie = this.convertPieDemographics(prizmData.slice(0, 10))
    this.nextPrizmPie = this.convertPieDemographics(prizmData.slice(10, 20))

    const localityTotal = this.details.local_radius.visits[0] + this.details.local_radius.visits[1]
    this.localNonlocalPie = {
      'Local visitors': parseFloat((this.details.local_radius.visits[0] / localityTotal * 100).toFixed(2)),
      'Nonlocal visitors': parseFloat((this.details.local_radius.visits[1] / localityTotal * 100).toFixed(2))
    }
  }

  private convertBarDemographics (segments: { description: string, value: number }[], sort?: boolean, replaceString?: string, replaceWith: string = ''): BarChartData[] {
    if (segments && segments.length) {
      const names = new Set()
      let data:any[] = segments.reduce((barData, segment) => {
        let name = segment.description // may be shortened
        let group = segment.description
        if (replaceString) {
          name = name.replace(replaceString, '')
          group = group.replace(replaceString, replaceWith)
        }
        let cutLength = 25
        if (name.length > cutLength && cutLength <= group.length) {
          const cut = (n:any) => n.slice(0, cutLength / 2 - 1) + '...' + n.slice(-1 * cutLength / 2 - 1)
          name = cut(name)
          // prevent overlapping shortened names...
          while (names.has(name)) {
            cutLength += 1
            name = cut(name)
          }
          names.add(name)
        }
        // barData.push({
        //   name,
        //   group,
        //   value: parseFloat((segment.value * 100).toFixed(2))
        // })
        return barData
      }, [])
      if (sort) {
        data = data.sort((a, b) => b - a)
      }
      return data
    } else {
      return []
    }
  }

  private getDemographicBarChartData (): void {
    const alcoholData = this.details.percent_visits.segment.consumer.find((d:any) => d.category === 'alcohol')?.segments || []
    this.alcoholConsumptionData = this.convertBarDemographics(alcoholData, true)

    const automotiveData = this.details.percent_visits.segment.consumer.find(d => d.category === 'automotive')?.segments || []
    this.automotiveData = this.convertBarDemographics(automotiveData, true)

    const transportationData = this.details.percent_visits.segment.consumer.find(d => d.category === 'commuting and transportation')?.segments || []
    this.transportationData = this.convertBarDemographics(transportationData, true)

    const videoData = this.details.percent_visits.segment.consumer.find(d => d.category === 'digital video displays')?.segments || []
    this.videoData = this.convertBarDemographics(videoData, true, 'Places ', 'Visitors ')

    const environmentData = this.details.percent_visits.segment.consumer.find(d => d.category === 'environment')?.segments || []
    this.environmentData = this.convertBarDemographics(environmentData, true)

    const financialData = this.details.percent_visits.segment.consumer.find(d => d.category === 'financial')?.segments || []
    this.financialData = this.convertBarDemographics(financialData, true)

    const foodData = this.details.percent_visits.segment.consumer.find(d => d.category === 'food and beverages')?.segments || []
    this.foodData = this.convertBarDemographics(foodData, true)

    const healthData = this.details.percent_visits.segment.consumer.find(d => d.category === 'health')?.segments || []
    this.healthData = this.convertBarDemographics(healthData, true)

    const itemsData = this.details.percent_visits.segment.consumer.find(d => d.category === 'items in the home')?.segments || []
    this.itemsInHomeData = this.convertBarDemographics(itemsData, true)

    const apparelData = this.details.percent_visits.segment.consumer.find(d => d.category === 'mri apparel & jewelry')?.segments || []
    this.apparelData = this.convertBarDemographics(apparelData, true)

    const homeImprovementData = this.details.percent_visits.segment.consumer.find(d => d.category === 'mri home improvements')?.segments || []
    this.homeImprovementData = this.convertBarDemographics(homeImprovementData, true)

    const psychData = this.details.percent_visits.segment.consumer.find(d => d.category === 'mri psychographics')?.segments || []
    this.psychographicsData = this.convertBarDemographics(psychData, true)

    const restaurantData = this.details.percent_visits.segment.consumer.find(d => d.category === 'restaurants')?.segments || []
    this.restaurantData = this.convertBarDemographics(restaurantData, true)

    const shoppingData = this.details.percent_visits.segment.consumer.find(d => d.category === 'retail shopping')?.segments || []
    this.shoppingData = this.convertBarDemographics(shoppingData, true)

    const sportsData = this.details.percent_visits.segment.consumer.find(d => d.category === 'sports and leisure')?.segments || []
    this.sportsData = this.convertBarDemographics(sportsData, true)

    const travelData = this.details.percent_visits.segment.consumer.find(d => d.category === 'travel')?.segments || []
    this.travelData = this.convertBarDemographics(travelData, true)

    const votingData = this.details.percent_visits.segment.consumer.find(d => d.category === 'voting')?.segments || []
    this.votingData = this.convertBarDemographics(votingData, true)
  }

  private getDayHourData (): void {
    const visitDayData: BarChartData[] = []
    const visitHourData: StackedLineChartData[] = []

    this.details.percent_visits.day.forEach((dayData, index) => {
      // I like 3 letter names more than 2...
      const name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
      visitDayData.push({
        name,
        value: Math.round(this.details.visits * dayData.value)
      })
      dayData.hourly.forEach((hourVal, hour) => {
        visitHourData.push({
          name: hour,
          group: name,
          value: Math.round(this.details.visits * dayData.value * hourVal)
        })
      })
    })
    this.visitsDayData = visitDayData
    this.visitsDayHourData = visitHourData
  }

  private getTopTableData (): void {
    const convertData = (row: { id: string, value: number, description?: string }) => ({
      name: row.id,
      description: row.description,
      visits: Math.round(row.value * this.details.visits),
      visitsWeekly: Math.round(row.value * this.details.visits * 7)
    })

    const topZips:any[] = this.details.percent_visits.home.postal_code.sort((a, b) => b.value - a.value).slice(0, 10)
    this.zipData = topZips.reduce((data, zip) => {
      data.push(convertData(zip))
      return data
    }, [])

    const topStates:any[] = this.details.percent_visits.home.state_province.sort((a, b) => b.value - a.value).slice(0, 10)
    this.stateData = topStates.reduce((data, state) => {
      data.push(convertData(state))
      return data
    }, [])

    const topDmas:any[] = this.details.percent_visits.home.dma.sort((a, b) => b.value - a.value).slice(0, 10)
    this.dmaData = topDmas.reduce((data, dma) => {
      data.push(convertData(dma))
      return data
    }, [])

    const topCounties:any[] = this.details.percent_visits.home.county.sort((a, b) => b.value - a.value).slice(0, 10)
    this.countyData = topCounties.reduce((data, county) => {
      data.push(convertData(county))
      return data
    }, [])
  }

  setChartWidth (width:any): void {
    const fixWidth = (optionName: any)  => {
      [optionName] = Object.assign({ }, [optionName], {width})
    }
    const optionNames = ['stackedLineOptions', 'dayBarOptions', 'demographicBarOptions', 'allDataOptions']
    optionNames.forEach(fixWidth)
    this.changeDetector.detectChanges()
  }
  updateChartWidth (): void {
    const newWidth = Math.max(this.contentWidth - 140, 200) // min 200px
    this.setChartWidth(newWidth)
  }
  // stacked line charts
  visitsYearYearData: StackedLineChartData[] = []
  stackedLineOptions: StackedLineChartOptions = {
    width: 660,
    height: 250,
    margin: { left: 64, top: 30, right: 10, bottom: 30 },
    legend: true,
    legendSide: 'top',
    colors: ['#00538B', '#2E6429', '#FF8256', '#05D08C'],
    hideDots: true,
    legendRows: 8
  }

  // hour/day data
  visitsDayData: BarChartData[] = []
  visitsDayHourData: StackedLineChartData[] = []
  dayBarOptions: BarChartOptions = {
    width: 660,
    height: 250,
    margin: { left: 64, top: 10, right: 10, bottom: 30 },
    xAxis: true,
    yAxis: true
  }


  // demographic bar charts
  alcoholConsumptionData: BarChartData[] = []
  automotiveData: BarChartData[] = []
  transportationData: BarChartData[] = []
  videoData: BarChartData[] = []
  environmentData: BarChartData[] = []
  financialData: BarChartData[] = []
  foodData: BarChartData[] = []
  healthData: BarChartData[] = []
  itemsInHomeData: BarChartData[] = []
  apparelData: BarChartData[] = []
  homeImprovementData: BarChartData[] = []
  psychographicsData: BarChartData[] = []
  restaurantData: BarChartData[] = []
  shoppingData: BarChartData[] = []
  sportsData: BarChartData[] = []
  travelData: BarChartData[] = []
  votingData: BarChartData[] = []
  demographicBarOptions: BarChartOptions = {
    width: 660,
    height: 250,
    margin: { left: 64, top: 10, right: 10, bottom: 150 },
    xAxis: true,
    yAxis: true,
    xAxisTilt: true,
    yAxisTitle: 'Percent',
    tooltip: '##GROUP## <br> ##VALUE##%'
  }

  // demographic pie charts
  dailyDwellPie: DonutChartData = {}
  localNonlocalPie: DonutChartData = {}
  topAgePie: DonutChartData = {}
  topEthnicityPie: DonutChartData = {}
  genderPie: DonutChartData = {}
  topIncomePie: DonutChartData = {}
  topPrizmPie: DonutChartData = {}
  nextPrizmPie: DonutChartData = {}
  topRacePie: DonutChartData = {}
  racePieOptions: DonutChartOptions = {
    width: 300,
    height: 300,
    margin: { left: 32, right: 320, top: 10, bottom: 10 },
    legend: true,
    legendSide: 'right',
    colors: ['#00538B', '#2E6429', '#FF8256', '#05D08C'],
    useRaw: true,
    arcFormat: (d) => d + '%'
  }
  donutOptions: DonutChartOptions = {
    width: 300,
    height: 300,
    margin: { left: 32, right: 250, top: 10, bottom: 10 },
    legend: true,
    legendSide: 'right',
    colors: ['#00538B', '#2E6429', '#FF8256', '#05D08C'],
    useRaw: true,
    arcFormat: (d) => d + '%'
  }

  allVisitData: LineChartData[] = []
  allDataOptions: LineChartOptions = {
    width: 660,
    height: 250,
    margin: { top: 10, left: 64, right: 10, bottom: 40 },
    xAxisTilt: true,
    xAxisTicks: 20,
    hideDots: true,
    xAxisFormat: (d, i) => new Date(d).toLocaleDateString('EN-US', { year: '2-digit', month: 'short' }),
    average: {
      show: true,
      withValue: true,
      position: 'middle'
    }
  }

  // top 10 tables
  zipData: any

  zipTableColumns: IMXTableColumnElement[] = [
    { displayName: 'ZIP', name: 'name',},
    { displayName: 'Visits (avg weekly)', name: 'visitsWeekly' },
    { displayName: 'Visits (avg daily)', name: 'visits'},
  ]
  stateData: any
  stateTableColumns: IMXTableColumnElement[] = [
    { displayName: 'State', name: 'description' },
    { displayName: 'Visits (avg weekly)', name: 'visitsWeekly'},
    { displayName: 'Visits (avg daily)', name: 'visits'},
  ]
  dmaData: any
  dmaTableColumns: IMXTableColumnElement[] = [
    { displayName: 'Name', name: 'description'},
    { displayName: 'Visits (avg weekly)', name: 'visitsWeekly'},
    { displayName: 'Visits (avg daily)', name: 'visits'},
  ]
  countyData: any
  countyTableColumns: IMXTableColumnElement[] = [
    { displayName: 'County', name: 'description'},
    { displayName: 'Visits (avg weekly)', name: 'visitsWeekly'},
    { displayName: 'Visits (avg daily)', name: 'visits'},
  ]

  scrollReport (id: string): void {
    this.renderer.selectRootElement(`#${id}`, true)?.scrollIntoView({ behavior: 'smooth' })
  }

  setReportWidth (newWidth: any): void {
    this.sidebarWidth = Math.max(newWidth, 800)
  }

  public openPrint (): void {
    // for some reason using the OOH logic here doesn't work... so we'll do our best
    // we must use a fixed chart width for printing...
    this.setChartWidth(1360) // appears to be my print landscape width
    window.print()
    // when we close print dialogue we need to fix the charts to be the right size again
    window.onfocus = () => {
      setTimeout(() => {
        // reset to desired value
        this.updateChartWidth()
      })
    }
  } 

  public printElem(elem:any)
  {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600');

      this.setChartWidth(1360)
      mywindow!.document.write('<html><head><title>' + document.title  + '</title>');
      mywindow!.document.write("<style> @import './test.component.less' </style>");
      mywindow!.document.write('</head><body >');
      mywindow!.document.write('<h1>' + document.title  + '</h1>');
      mywindow!.document.write(document.getElementById(elem)!.innerHTML);
      mywindow!.document.write('</body></html>');

      mywindow!.document.close(); // necessary for IE >= 10
      
      mywindow!.focus(); // necessary for IE >= 10*/
      this.updateChartWidth()
      mywindow!.print();
      mywindow!.close();

      return true;
  }  

  sorting(sort: any) {   
    this.defaultTableSort = sort   
    this.updateChartData();
  }

}
