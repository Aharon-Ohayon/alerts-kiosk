// {
//   "id": "133944039820000000",
//   "cat": "10",
//   "title": "שהייה בסמיכות למרחב מוגן",
//   "data": ["ברחבי הארץ"],
//   "desc": "על תושבי האזורים הבאים לשהות בסמיכות למרחב המוגן.\nיש לצמצם תנועות במרחב ולהימנע מהתקהלויות.\n בעת קבלת התרעה יש להיכנס למרחב מוגן ולשהות בו עד לקבלת הודעה חדשה."
// }

export type OrefAlertSeverity = 'danger' | 'warning' | 'info';

export const orefAlertCategory = {
    1: {
        title: 'ירי רקטות וטילים',
        severity: 'danger'
    },

    2: {
        title: 'חדירת כלי טיס עוין',
        severity: 'danger'
    },
    13: {
        title: 'עדכון',
        severity: 'warning'
    },
    14: {
        title: 'מבזק',
        severity: 'info'
    }
} satisfies {
    [key: number]: { title: string; severity: OrefAlertSeverity };
};

export type OrefAlertCategory = keyof typeof orefAlertCategory;

export interface OrefAlert {
    id: string;
    cat: OrefAlertCategory;
    title: string;
    data: string[];
    desc: string;
    firstDetectedAt: Date;
}
