import { ITest } from './test';

export interface ITestPackage {
    name: string;
    tests: ITest[];
}