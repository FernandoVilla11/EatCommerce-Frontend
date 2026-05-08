import { NextResponse } from "next/server";
import { ENDPOINTS, SERVER_ENDPOINTS } from "@/lib/config";
import { ensureRole } from "@/lib/auth/rbac";
import { handleApiError } from "@/lib/api/route-utils";
import { getServerAuthSession } from "@/lib/auth/auth";
import { httpBackend } from "@/lib/api/http-backend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "No autenticado" }, { status: 401 });
        }

        const list = await httpBackend<any[]>(
            SERVER_ENDPOINTS.products,
            "/get-all-products",
            { method: "GET" }
        );
        return NextResponse.json(list, { status: 200 });
    } catch (e: any) {
        console.error("GET /api/products error:", e?.message);
        return handleApiError(e);
    }
}

export async function POST(req: Request) {
    try {
        await ensureRole(["ADMIN", "WORKER"]);

        const session = await getServerAuthSession();
        if (!session?.accessToken) {
            const err: any = new Error("No autenticado");
            err.status = 401;
            throw err;
        }

        const form = await req.formData();

        const backendRes = await fetch(`${ENDPOINTS.products}/create-product`, {
            method: "POST",
            body: form,
            headers: { Authorization: `Bearer ${session.accessToken}` },
            cache: "no-store",
        });

        const data = await backendRes.json().catch(() => ({}));
        if (!backendRes.ok) {
            const err: any = new Error(
                (data as any)?.message || `HTTP ${backendRes.status}`
            );
            err.status = backendRes.status;
            throw err;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (e) {
        return handleApiError(e);
    }
}