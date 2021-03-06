export default class Activity {
    ID: number = 0;
    title: string = '';
    link: string = '';
    category: Array<string> = [];
    description: string = '';
}

export const errors = { errTitle: '', errCategory: '', errDescription: '' };