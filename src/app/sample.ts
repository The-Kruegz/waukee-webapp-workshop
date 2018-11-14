export interface ISample {
    id: number;
    name: string;
    description: string;
    packages: <ITestPackage[]>;
    tests: <ITest[]>;
}