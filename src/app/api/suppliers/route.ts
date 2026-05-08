import { NextResponse } from "next/server";
import { SERVER_ENDPOINTS } from "@/lib/config";
import { httpBackend } from "@/lib/api/http-backend";
import { handleApiError } from "@/lib/api/route-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { SupplierDTO } from "@/app/dashboard/suppliers/types";

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

export async function GET() {
    try {
        await checkAdmin();
        const list = await httpBackend<SupplierDTO[]>(
            SERVER_ENDPOINTS.suppliers,
            "/get-all-suppliers",
            { method: "GET" }
        );
        return NextResponse.json(list, { status: 200 });
    } catch (e: any) {
        console.error("GET /api/suppliers error:", e?.message, e?.status);
        return handleApiError(e);
    }
}

export async function POST(req: Request) {
    try {
        await checkAdmin();
        const body = await req.text();
        const created = await httpBackend<SupplierDTO>(
            SERVER_ENDPOINTS.suppliers,
            "/create-supplier",
            { method: "POST", body, headers: { "Content-Type": "application/json" } }
        );
        return NextResponse.json(created, { status: 201 });
    } catch (e: any) {
        console.error("POST /api/suppliers error:", e?.message, e?.status);
        return handleApiError(e);
    }
}