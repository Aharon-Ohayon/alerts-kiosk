// {
//   "id": "133944039820000000",
//   "cat": "10",
//   "title": "שהייה בסמיכות למרחב מוגן",
//   "data": ["ברחבי הארץ"],
//   "desc": "על תושבי האזורים הבאים לשהות בסמיכות למרחב המוגן.\nיש לצמצם תנועות במרחב ולהימנע מהתקהלויות.\n בעת קבלת התרעה יש להיכנס למרחב מוגן ולשהות בו עד לקבלת הודעה חדשה."
// }

export const orefAlertCategory = {
    1: 'ירי רקטות וטילים',
    2: 'חדירת כלי טיס עוין',
    13: 'עדכון',
    14: 'מבזק'
};

export type OrefAlertCategory = keyof typeof orefAlertCategory;

export interface OrefAlert {
    id: string;
    cat: OrefAlertCategory;
    title: string;
    data: string[];
    desc: string;
}
