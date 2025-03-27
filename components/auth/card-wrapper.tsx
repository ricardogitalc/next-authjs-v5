"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showRegister?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showRegister,
}: CardWrapperProps) => {
  return (
    <div className="w-full max-w-[400px] gap-4 flex flex-col">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <>
          <div className="my-2 mx-6 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              OU
            </span>
          </div>
          <CardFooter className="flex flex-col">
            <Social />
            {showRegister && (
              <p className="text-xs text-center text-text-foreground pt-3">
                Ao continuar, você concorda com os{" "}
                <Link
                  href="/termos"
                  className="text-primary hover:text-primary/70"
                >
                  Termos de Serviço
                </Link>{" "}
                e as{" "}
                <Link
                  href="/privacidade"
                  className="text-primary hover:text-primary/70"
                >
                  Políticas de Privacidade.
                </Link>
              </p>
            )}
          </CardFooter>
        </>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </div>
  );
};
