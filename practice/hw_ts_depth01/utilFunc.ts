namespace Utility {

    export namespace Fees {
        export function CalcFee(days: number): number {
            return days * .25;
        }
    }

    export function MaxBook(age: number): number {
        if (age < 12) {
            return 3;
        } else {
            return 10;
        }
    }

    function privateFunc(): void {
        console.log("This is private...");
    }
}