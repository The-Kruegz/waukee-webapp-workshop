export interface ITreeNode {
    label: string;
    selected: boolean;
    children: ITreeNode[];
}