# Content and image sources

The existing Atrium Offices website was reviewed on October 12, 2026. This is a static modernization of the owner's existing site. Business details and photographs come from that site; no new inventory, testimonials, opening hours, or amenities have been invented.

## Business details

Source: <https://atriumbismarck.com/>.

- Fully furnished private office rentals in Bismarck, North Dakota, with short-term and long-term options.
- Address: 4521 Ottawa Street, Bismarck, ND 58503.
- Email: admin@atriumbismarck.com.
- Facebook: <https://www.facebook.com/atriumbismarck>.
- Conference room booking, plus the free Atrium Offices mobile app.
- The original gallery caption for the coffee-bar photograph says “Free coffee bar! Free internet.” Those two amenities are carried forward.
- The original real estate license and ownership-interest disclosure is retained. It identifies Hunt Boustead (#8264), Nicole Boustead (#9148), and Lucas Boustead (#11629), The Boustead Group, with Trademark Realty of Bismarck.

## Published rates

Source: <https://atriumbismarck.com/blank>, also served at <https://atriumbismarck.com/hidden>, retrieved October 12, 2026.

| Offering | Published price |
| --- | --- |
| One-hour private office | $20 |
| One-hour conference room | $30 |
| Private office day pass | $80 |
| One-month office lease | $1,250 |
| One-year office lease | $13,800 |

The original day-pass copy includes an unlimited allowance for conference room booking. The leasing copy includes an unlimited conference room allowance and a private network. The modernization describes the conference room benefit as a booking allowance and makes clear that reservations depend on availability. The annual-price description on the old site also claimed “save 10% per month,” which does not match the two posted prices, so that percentage claim has been omitted. Contact the owner to confirm current pricing and precise allowances before changing these terms.

To update pricing, edit the rate cards, leasing section, and relevant answers in `index.html`. There is no application database or pricing API behind this website.

## Existing booking and app workflows

The live site's embedded booking widget loads <https://atriumoffices.optixapp.com/web-plugin/optix.v1.js> with `optix-venue="atriumoffices"`. The widget's implementation constructs <https://atriumoffices.optixapp.com/book/> for bookings. That endpoint returned HTTP 200 on October 12, 2026. The redesigned website links directly to this existing service rather than duplicating reservations, login, or payment processing.

- Browser booking: <https://atriumoffices.optixapp.com/book/>.
- Apple App Store: <https://apps.apple.com/us/app/atrium-offices/id6504642166>.
- Google Play: <https://play.google.com/store/apps/details?id=sharedesk.net.optixapp.nicoleboustead&pcampaignid=web_share>.

These are the actual destinations from the original site's embedded HTML. Update their links in `index.html` if the owner changes booking vendors or app listings. Email links open the visitor's email program; the site has no contact-form backend.

## Photograph and logo provenance

The photographs and original logo are downloaded from the owner's existing GoDaddy-hosted website and served locally. The original photo set and captions were confirmed in the existing gallery configuration at:

<https://img1.wsimg.com/blobby/go/dc204b50-1529-4690-986d-8292d6ff7e35/gpub/b4a39b1244fa481/script.js>.

All image paths below were retrieved under:

`https://img1.wsimg.com/isteam/ip/dc204b50-1529-4690-986d-8292d6ff7e35/`

| Local asset | Original asset | Subject |
| --- | --- | --- |
| `assets/atrium-interior.jpg` | `32-4521%20(11).jpg` | Main interior lounge, private offices, waterfall, and sky ceiling |
| `assets/atrium-exterior.jpg` | `38-4521%20(17).jpg` | Building and surroundings on Ottawa Street |
| `assets/office-202.jpg` | `22-202%20(2).jpg` | Bookable or rentable furnished private office |
| `assets/lounge-suite.jpg` | `10-208%20(2).jpg` | Lounge suite |
| `assets/common-area.jpg` | `7-4521%20(7).jpg` | Coffee bar |
| `assets/atrium-waterfall.jpg` | `8-4521%20(8).jpg` | Sky ceiling and waterfall |
| `assets/entrance.jpg` | `2-4521%20(2).jpg` | Entryway and waiting area |
| `assets/original-logo.png` | `Secondary%20Gradient%20on%20Light.png` | Original Atrium Offices logo |

The lowercase “a” mark used in navigation and as the favicon is a simple typographic treatment created for this redesign. The original logo remains in the app section. No stock photographs, synthetic property photographs, or third-party listing inventory are used.

## Fonts

DM Sans and DM Serif Display are self-hosted Google Fonts. Their SIL Open Font License files are included under `assets/fonts/`. The Latin WOFF2 assets were downloaded from `fonts.gstatic.com`; the licenses were retrieved from the official `google/fonts` repository.

## Owner review before launch

Confirm current rates, lease terms, conference room allowances, ownership disclosure, and the two app listings. The original website's contact link pointed to a hidden page that currently renders rates; the redesign restores a direct email contact path. Domain and DNS changes are separate from this frontend code. The new site contains no GoDaddy analytics, tracking scripts, or cookie banner.
