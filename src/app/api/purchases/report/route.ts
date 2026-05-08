import { NextResponse } from "next/server";
import { SERVER_ENDPOINTS } from "@/lib/config";
import { httpBackend } from "@/lib/api/http-backend";
import { handleApiError } from "@/lib/api/route-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { PurchaseReportDTO } from "@/app/dashboard/suppliers/types";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session) {
        const err: any = new Error("No autenticado");
        err.status = 401;
        throw err;
    }
    const role = (session.user as any)?.role;
    if (role !== "ADMIN") {
        const err: any = new Error("No autorizado");
        err.status = 403;
        throw err;
    }
}

export async function GET(req: Request) {
    try {
        await checkAdmin();
        const url = new URL(req.url);
        const supplierId = url.searchParams.get("supplierId");
        const startDate = url.searchParams.get("start");
        const endDate = url.searchParams.get("end");

        if (!supplierId || !startDate || !endDate) {
            return NextResponse.json(
                { message: "supplierId, start y end son requeridos" },
                { status: 400 }
            );
        }

        const data = await httpBackend<PurchaseReportDTO>(
            SERVER_ENDPOINTS.purchases,
            `/report?supplierId=${supplierId}&startDate=${startDate}&endDate=${endDate}`,
            { method: "GET" }
        );
        return NextResponse.json(data, { status: 200 });
    } catch (e: any) {
        console.error("GET /api/purchases/report error:", e?.message, e?.status);
        return handleApiError(e);
    }
}