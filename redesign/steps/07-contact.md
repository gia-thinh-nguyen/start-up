# Step 07: contact page

Use the `impeccable` skill. Build `/contact` from scratch inside the world, following the line about it in the surface brief. Read `.claude/skills/impeccable/reference/craft-floor.md` before editing.

Files: `src/app/contact/page.tsx` and `src/components/contact/`, except `Turnstile.tsx` and `actions.ts`, which stay as they are.

The page must still contain, with all content from `site.ts`: phone, email, service area, the Instagram link, the enquiry form, and a route to booking for people who are ready.

`EnquiryForm.tsx` can look completely different, but these behaviours must survive:

- `useActionState` with `sendEnquiry`, and the field names and limits from `src/lib/enquiry.ts`
- the honeypot field, hidden from people and screen readers
- the `Turnstile` widget and its `resetSignal`
- moving focus to the result or the first invalid field after submitting
- `aria-invalid`, `aria-describedby` and visible error text for each field
- the pending state on the button, the sent state, the `noscript` note, and the privacy policy link

Style all of these states, not only the empty form. To see the error state, read the code paths rather than sending real messages: there's no email key in development.

Done when: the form is clearly usable on a phone, with visible labels, comfortable fields and clear focus, and every state above belongs to the world.
