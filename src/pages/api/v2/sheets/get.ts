import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpreadSheetValue } from '../../../../backend';

type Data = {
    status?: boolean;
    data?: any;
    message?: string;
    serverError?: string;
    actualErrorCode?: number;
};

export default async function api(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method === 'GET') {
        const { sheetId } = req.query;
        const data = await getSpreadSheetValue({ sheetId });
        return res.status(200).json(data)
    } else {
        return res.status(500).json({
            message: "Method not allowed"
        })
    }
}
