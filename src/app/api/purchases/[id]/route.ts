import { NextResponse } from "next/server";
import { SERVER_ENDPOINTS } from "@/lib/config";
import { httpBackend } from "@/lib/api/http-backend";
import { handleApiError } from "@/lib/api/route-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { PurchaseDTO } from "@/app/dashboard/suppliers/types";

type Ctx = { params: Promise<{ id: string }> };

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

export async function PUT(req: Request, context: Ctx) {
    try {
        await checkAdmin();
        const { id } = await context.params;
        const body = await req.text();
        const updated = await httpBackend<PurchaseDTO>(
            SERVER_ENDPOINTS.purchases,
            `/edit-purchase?purchaseId=${id}`,
            { method: "PUT", body, headers: { "Content-Type": "application/json" } }
        );
        return NextResponse.json(updated, { status: 200 });
    } catch (e: any) {
        console.error("PUT /api/purchases error:", e?.message, e?.status);
        return handleApiError(e);
    }
}

export async function DELETE(_req: Request, context: Ctx) {
    try {
        await checkAdmin();
        const { id } = await context.params;
        await httpBackend<void>(
            SERVER_ENDPOINTS.purchases,
            `/delete-purchase?purchaseId=${id}`,
            { method: "DELETE" }
        );
        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
        console.error("DELETE /api/purchases error:", e?.message, e?.status);
        return handleApiError(e);
    }
}