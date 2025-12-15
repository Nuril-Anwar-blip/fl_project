/**
 * Dokumentasi: Komponen Form (Shim)
 * Fungsi: Membungkus elemen `<form>` dan mengintegrasikan navigasi dengan Inertia melalui `router.visit`.
 * Penggunaan: `<Form {...route.form()}>{({ processing, errors }) => (...)}</Form>`
 * Catatan: Komponen ini tidak terhubung ke backend. State `processing/errors` bersifat lokal.
 */
import * as React from 'react';
import { router } from '@inertiajs/react';
import type { RouteFormDefinition } from '@/wayfinder';

type FormState = {
  processing: boolean;
  recentlySuccessful: boolean;
  errors: Record<string, string>;
  clearErrors: () => void;
};

type FormProps = RouteFormDefinition<string> & {
  options?: {
    preserveScroll?: boolean;
  };
  resetOnError?: string[] | boolean;
  resetOnSuccess?: boolean | string[];
  onError?: (errors: Record<string, string>) => void;
  onSuccess?: () => void;
  onFinish?: () => void;
  transform?: (data: Record<string, any>) => Record<string, any>;
  className?: string;
  children: (state: FormState) => React.ReactNode;
};

export function Form({
  action,
  method,
  options,
  resetOnError,
  resetOnSuccess,
  onError,
  onSuccess,
  onFinish,
  transform,
  className,
  children,
}: FormProps) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [innerState, setInnerState] = React.useState({
    processing: false,
    recentlySuccessful: false,
    errors: {} as Record<string, string>,
  });

  const clearErrors = React.useCallback(() => {
    setInnerState((s) => ({ ...s, errors: {} }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInnerState((s) => ({ ...s, processing: true, recentlySuccessful: false }));
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const payload: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = value;
    }
    const data = transform ? transform(payload) : payload;

    router.visit(action, {
      method: method as any,
      data,
      preserveScroll: options?.preserveScroll,
      onSuccess: () => {
        setInnerState((s) => ({
          ...s,
          processing: false,
          recentlySuccessful: true,
          errors: {},
        }));
        if (resetOnSuccess) {
          if (resetOnSuccess === true) {
            formEl.reset();
          } else if (Array.isArray(resetOnSuccess)) {
            resetOnSuccess.forEach((name) => {
              const input = formEl.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${name}"]`);
              if (input) {
                if ("value" in input) (input as any).value = "";
              }
            });
          }
        }
        onSuccess?.();
      },
      onError: (errs: any) => {
        const normalized = (errs ?? {}) as Record<string, string>;
        onError?.(normalized);
        setInnerState((s) => ({ ...s, processing: false, errors: normalized }));
        if (resetOnError) {
          if (resetOnError === true) {
            formEl.reset();
          } else if (Array.isArray(resetOnError)) {
            resetOnError.forEach((name) => {
              const input = formEl.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${name}"]`);
              if (input) {
                if ("value" in input) (input as any).value = "";
              }
            });
          }
        }
      },
      onFinish: () => {
        setInnerState((s) => ({ ...s, processing: false }));
        onFinish?.();
      },
    });
  };

  return (
    <form ref={formRef} action={action} method={method} className={className} onSubmit={handleSubmit}>
      {children({
        processing: innerState.processing,
        recentlySuccessful: innerState.recentlySuccessful,
        errors: innerState.errors,
        clearErrors,
      })}
    </form>
  );
}
