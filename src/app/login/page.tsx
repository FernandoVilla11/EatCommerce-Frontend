"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { LoginSchema } from "@/app/login/schema/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    IconArrowNarrowLeft,
    IconUser,
    IconLock,
    IconEye,
    IconEyeOff,
    IconMail,
} from "@tabler/icons-react";
import Image from "next/image";

type FormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = React.useState<string | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showCredentialsForm, setShowCredentialsForm] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { userName: "", password: "" },
        mode: "onSubmit",
    });

    const onSubmit = async (values: FormValues) => {
        setError(null);
        const callbackUrl = searchParams.get("from") || "/dashboard";

        const res = await signIn("credentials", {
            redirect: false,
            userName: values.userName,
            password: values.password,
            callbackUrl,
        });

        if (res?.error) {
            setError("Credenciales inválidas");
            return;
        }

        if (res?.ok) {
            router.replace(res.url ?? callbackUrl);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4"
            style={{
                backgroundColor: "#a6aebf",
                backgroundImage: `

        `,
                backgroundSize: "60px 60px",
            }}
        >
            <Card className="w-full max-w-sm rounded-3xl shadow-xl border-0 bg-white">
                <CardHeader className="flex flex-col items-center gap-3 pt-8 pb-2">
                    {/* Logos */}
                    <div className="flex items-center justify-between w-full px-2 mb-2">
                        <Image
                            src="/logo.png"
                            alt="Logo EatCommerce"
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <div className="flex-1 flex justify-center">
                            <Image
                                src="/logo.png"
                                alt="Restaurante"
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="w-12" />
                    </div>

                    {/* Banner EatCommerce */}
                    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-center shadow-sm">
                        <p className="text-xs text-gray-400 tracking-widest uppercase">EatCommerce</p>
                        <p className="text-[10px] text-gray-300 tracking-widest">ONLINE SHOPPING · FAST DELIVERY</p>
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-800 mt-2">
                        Acceso
                    </CardTitle>
                    <CardDescription className="text-center text-sm text-gray-500">
                        Inicie sesión en su cuenta
                    </CardDescription>

                    {/* Botón volver */}
                    <button
                        type="button"
                        onClick={() => {
                            if (showCredentialsForm) {
                                setShowCredentialsForm(false);
                                setError(null);
                            } else {
                                router.push("/");
                            }
                        }}
                        className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        <IconArrowNarrowLeft className="h-4 w-4" />
                    </button>
                </CardHeader>

                <CardContent className="px-6 pb-4">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Vista inicial: dos botones */}
                    {!showCredentialsForm && (
                        <div className="space-y-3 mt-2">
                            {/* Botón Google */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 rounded-full border-gray-300 font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Iniciar sesión con Google
                            </Button>

                            {/* Separador */}
                            <div className="relative my-1">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white px-3 text-gray-400">o</span>
                                </div>
                            </div>

                            {/* Botón Usuario */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 rounded-full border-gray-300 font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowCredentialsForm(true)}
                            >
                                <IconMail className="w-5 h-5 mr-3 text-gray-500" />
                                Iniciar sesión con usuario
                            </Button>
                        </div>
                    )}

                    {/* Formulario de credenciales */}
                    {showCredentialsForm && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                                Usuario
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                                        <IconUser className="h-4 w-4" />
                                                    </span>
                                                    <Input
                                                        placeholder="Ingresa tu nombre de usuario"
                                                        autoComplete="username"
                                                        className="pl-9 h-11 rounded-lg border-gray-200"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                                Contraseña
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                                        <IconLock className="h-4 w-4" />
                                                    </span>
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Ingresa tu contraseña"
                                                        autoComplete="current-password"
                                                        className="pl-9 pr-10 h-11 rounded-lg border-gray-200"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? (
                                                            <IconEyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <IconEye className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-11 rounded-full bg-gradient-to-r from-[#FF9800] to-[#FF6D00] hover:from-[#FB8C00] hover:to-[#F4511E] text-white font-semibold shadow-md border-0"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>

                <CardFooter className="flex justify-center pt-0 pb-6">
                    <p className="text-[11px] text-center text-muted-foreground">
                        Al continuar aceptas nuestras políticas de uso.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
