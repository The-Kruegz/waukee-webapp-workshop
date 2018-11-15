import { ITestPackage } from './testPackage';
import { ITest } from './test';


export interface ISample {
    name: string;
    description: string;
    packages: ITestPackage[];
    tests: ITest[];
}