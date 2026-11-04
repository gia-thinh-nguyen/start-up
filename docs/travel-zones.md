# Travel zones

How a booking's travel fee is decided, and what the owner needs to check.

## The rule

Driving distance from Keysborough (owner, 5 November 2026):

| Distance | Fee | What happens after booking |
|---|---|---|
| Up to 25 km | None | Nothing more: the booking stands |
| 25 to 40 km | $15 | Stripe payment page; cancelled if unpaid after 30 minutes |
| Over 40 km, or a postcode not on the list | Quote | Booking cancelled, customer pointed to `/contact` |

The postcode is the answer to the Postcode question in the Cal.com booking form.

The numbers are `freeKm`, `maxKm` and `feeAud` in `src/content/site.ts`. Change them there; every page follows.

## Where the distances come from

`src/content/travel-distances.ts` holds a driving distance for each postcode within 45 km. Each one is measured from the centre of postcode 3173 to the centre of the other postcode, so a postcode that spreads across a boundary gets one answer for all of it.

To measure from your own street instead, run this with your latitude and longitude:

```text
node scripts/travel-distances.mjs --from -38.0000,145.1700
```

The data is from the Australian Bureau of Statistics (CC BY 4.0) and OpenStreetMap (ODbL). Both licences allow commercial use with credit, and the credit is in the data file. If the site ever shows a map or a list of distances, credit both on the page as well.

## Check these postcodes

Distances in km. A postcode in the wrong zone only needs its number moved past the boundary in the data file.

- **Free, just under 25:** 3807 (22.1), 3161 (23.1), 3185 (23.3), 3155 (23.4), 3131 (23.5), 3910 (23.5), 3147 (23.6), 3184 (23.8), 3183 (24.3), 3977 (24.3), 3125 (24.4), 3143 (24.9), 3132 (25)
- **$15, just over 25:** 3160 (25.3), 3182 (25.3), 3130 (25.4), 3135 (25.4), 3153 (25.4), 3158 (25.7), 3911 (25.7), 3154 (26.3), 3146 (26.5), 3181 (26.5), 3128 (27.1), 3134 (27.5), 3809 (27.6), 3124 (27.8), 3206 (27.9), 3930 (27.9)
- **$15, just under 40:** 3079 (37.2), 3000 (37.4), 3766 (37.7), 3066 (37.9), 3793 (37.9), 3067 (38), 3116 (38), 3053 (38.1), 3065 (38.2), 3105 (38.2), 3915 (38.7), 3008 (39.1), 3796 (39.2), 3068 (39.9)
- **Quote, just over 40:** 3140 (40.2), 3051 (40.3), 3207 (40.7), 3812 (40.7), 3934 (41), 3070 (41.1), 3071 (41.1), 3093 (41.1), 3052 (41.2), 3054 (41.4), 3084 (41.6), 3795 (41.8), 3094 (42.1), 3781 (42.2), 3003 (42.3), 3056 (42.6), 3057 (42.7)

## Known gaps

- The visitor's postcode isn't checked against the address they type into Cal.com. Read the address on each booking.
- PO box postcodes have no area, so those bookings are cancelled with the quote message.
