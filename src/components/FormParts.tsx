/** Shared by the enquiry form on /contact and the postcode check on /book. Fields sit on chalk. */

export const fieldClass =
  "block w-full bg-transparent focus-visible:outline-offset-1 autofill:shadow-[inset_0_0_0_100vmax_var(--color-paper)] autofill:[-webkit-text-fill-color:var(--color-navy)]";

export const inputClass = `${fieldClass} min-h-11 border-b-2 border-navy pt-1 pb-1.5 aria-[invalid=true]:border-b-4 aria-[invalid=true]:border-lantern`;

/** The notched navy button that sends a form. Booking buttons are lantern instead. */
export const sendButtonClass =
  "notched px-7 py-4 text-lede font-semibold text-paper before:bg-navy hover:before:bg-timber active:before:bg-timber";

/** A notch-shaped mark, so an error stands out by shape as well as colour. */
export function NotchMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className={`size-3.5 shrink-0 ${className}`}>
      <path d="M0 0H14L7 14Z" />
    </svg>
  );
}

export function ErrorText({ children, className = "", ...props }: React.ComponentProps<"p">) {
  return (
    <p {...props} className={`flex gap-2 font-medium text-lantern outline-none ${className}`}>
      <NotchMark className="mt-1 fill-lantern" />
      <span>{children}</span>
    </p>
  );
}
