export type TotalTax = {
    percentage: number;
    additionalAmount: number;
};
export declare const getTotal: (totalTax: TotalTax, amountPaid: number) => number;
