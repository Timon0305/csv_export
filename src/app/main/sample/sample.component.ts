import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import {SampleService} from '../sample.service';
import {Csv} from '../interfaces/csv.interface';
import {Csv2} from '../interfaces/csv2.interface';
import * as FileSaver from 'file-saver';
import {catchError} from 'rxjs/operators';
import {error} from 'selenium-webdriver';


const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{
    csv: Csv[];
    csv2: Csv2[];
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param sampleService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private sampleService : SampleService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit(): void {
        this.csv = [
            {
                patientLastName: 'test1',
                patientFirstName: 'test11',
                patientDateOfBirth: '1946-07-06',
                gapsTotal: 9,
                gapsSDO: 9,
                gapsRefused: 0,
                gapsNotDone: 0,
                gapsTested: 0,
                gapsPending: 0
            },
            {
                patientLastName: 'test2',
                patientFirstName: 'test121',
                patientDateOfBirth: '1972-07-08',
                gapsTotal: 9,
                gapsSDO: 9,
                gapsRefused: 0,
                gapsNotDone: 0,
                gapsTested: 0,
                gapsPending: 0
            },
            {
                patientLastName: 'test3',
                patientFirstName: 'test31',
                patientDateOfBirth: '1934-09-01',
                gapsTotal: 10,
                gapsSDO: 10,
                gapsRefused: 0,
                gapsNotDone: 0,
                gapsTested: 0,
                gapsPending: 0
            },
            {
                patientLastName: 'test4',
                patientFirstName: 'test41',
                patientDateOfBirth: '1952-08-24',
                gapsTotal: 8,
                gapsSDO: 8,
                gapsRefused: 0,
                gapsNotDone: 0,
                gapsTested: 0,
                gapsPending: 0
            },
            {
                patientLastName: 'test5',
                patientFirstName: 'test51',
                patientDateOfBirth: '1951-09-04',
                gapsTotal: 9,
                gapsSDO: 9,
                gapsRefused: 0,
                gapsNotDone: 0,
                gapsTested: 0,
                gapsPending: 0
            }
            ];

        this.csv2 = [
            {
                eventDate: '2017-06-01',
                title: 'APM-17053509',
                groupName: 'test1',
                eventType: 'Screening and Diabetic',
                status: 'CANCELLED',
                providers: 'one',
                role: 2
            },
            {
                eventDate: '2017-06-02',
                title: 'APM-17053510',
                groupName: 'test2',
                eventType: 'Screening and Diabetic',
                status: 'CANCELLED',
                providers: 'two',
                role: 2
            },
            {
                eventDate: '2017-06-09',
                title: 'APM-17053511',
                groupName: 'test3',
                eventType: 'Screening and Diabetic',
                status: 'CANCELLED',
                providers: 'three',
                role: 2
            },
            {
                eventDate: '2017-06-01',
                title: 'APM-17053512',
                groupName: 'test4',
                eventType: 'Screening and Diabetic',
                status: 'CANCELLED',
                providers: 'four',
                role: 3
            },
            {
                eventDate: '2017-06-16',
                title: 'APM-17053513',
                groupName: 'test5',
                eventType: 'Screening and Diabetic',
                status: 'CANCELLED',
                providers: 'five',
                role: 2
            }
        ]
    }

    exportToCsv1 = () => {
        this.sampleService.actionPlaResource().subscribe(() => {
            this.exportToCsv(this.csv, 'user_data',
                ['patientLastName', 'patientFirstName', 'patientDateOfBirth', 'gapsTotal', 'gapsSDO', 'gapsRefused', 'gapsNotDone', 'gapsTested', 'gapsPending'])
        });
    };

    exportToCsv2 = () => {
        this.exportToCsv(this.csv2, 'user_data_2',
            ['eventDate', 'title', 'groupName', 'eventType', 'status', 'providers', 'role'])
    };

    exportToCsv(rows: object[], fileName: string, columns?: string[]): string {
        if (!rows || !rows.length) {
            return;
        }
        const separator = ',';
        const keys = Object.keys(rows[0]).filter(k => {
            if (columns?.length) {
                return columns.includes(k);
            } else {
                return true;
            }
        });
        const csvContent =
            keys.join(separator) +
            '\n' +
            rows.map(row => {
                return keys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join('\n');
        this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
    }


    private saveAsFile(buffer: any, fileName: string, fileType: string): void {
        const data: Blob = new Blob([buffer], { type: fileType });
        FileSaver.saveAs(data, fileName);
    }
}
