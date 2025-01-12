export function validateDate(dateStr: string): [string | null, Date | undefined] {
    
    const dateRegex = /^(\d{2})[/-](\d{2})[/-](\d{4})$/;
    const match = dateStr.match(dateRegex);
    
    if (!match) {
        return ["Invalid date format. Must be dd/mm/YYYY or dd-mm-YYYY", undefined];
    }
    
    const [, day, month, year] = match;
    
    // Convertir a números
    const d = parseInt(day, 10);
    const m = parseInt(month, 10) - 1; 
    const y = parseInt(year, 10);
    
    
    const date = new Date(y, m, d);
    
    
    if (
        date.getDate() !== d ||
        date.getMonth() !== m ||
        date.getFullYear() !== y ||
        y < 1900 || y > 2100 
    ) {
        return ["Invalid date. Please check day, month and year values", undefined];
    }
    
    return [null, date];
}

export class CreateRepairDTO {
    constructor(
        public readonly userId: string,
        public readonly date: Date
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { userId, date } = object;

        if (!userId) return ["Missing id User", undefined];
        if (userId.length != 36) return ["Invalid user ID format.", undefined];
        if (!date) return ["Missing date repair", undefined];
        
        const [dateError, validatedDate] = validateDate(date);
        if (dateError) return [dateError, undefined];        
        
        const parsedDate = validatedDate!;

        
        const today = new Date();
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(today.getFullYear() - 2);

        if (parsedDate > today) return ["Date cannot be in the future", undefined];
        if (parsedDate < twoYearsAgo) return ["Date cannot be older than two years", undefined];

        return [undefined, new CreateRepairDTO(userId, parsedDate)];
    }
}
 