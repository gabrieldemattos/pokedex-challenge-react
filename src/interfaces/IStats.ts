interface Stat {
    name: string;
    hp: string;
}

export interface IStats {
    base_stat: number;
    effort: number;
    stat: Stat;
}